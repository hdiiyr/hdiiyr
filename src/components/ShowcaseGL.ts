import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";

/**
 * WebGL layer for the desktop showcase: draws each cover as a plane that bends with the
 * scroll velocity and fades to grey when inactive. The DOM <img> elements stay in place
 * (layout, accessibility, fallback); planes copy their on-screen rectangles every frame.
 */

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec2 uv;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uBend;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    // Centre of the plane lags behind the edges, like a sheet moving through air.
    p.y += cos(p.x * 3.14159265) * uBend;
    p.x += sin(p.y * 3.14159265) * uBend * 0.12;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform sampler2D tMap;
  uniform float uGray;
  uniform float uAlpha;
  uniform float uZoom;
  uniform vec2 uRes;
  uniform vec2 uFade;
  varying vec2 vUv;
  void main() {
    vec2 uv = (vUv - 0.5) / uZoom + 0.5;
    vec4 color = texture2D(tMap, uv);
    float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    vec3 grey = mix(vec3(luma), vec3(luma) * 0.92 + 0.04, 0.5);
    // Dissolve into the page near the top (under the header) and bottom edges.
    float edge = smoothstep(0.0, uFade.x, uRes.y - gl_FragCoord.y) * smoothstep(0.0, uFade.y, gl_FragCoord.y);
    gl_FragColor = vec4(mix(color.rgb, grey, uGray), uAlpha * edge);
  }
`;

type Entry = { el: HTMLElement; img: HTMLImageElement; mesh: Mesh; program: Program; ready: boolean };

export function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export class ShowcaseGL {
  private renderer: Renderer;
  private camera: Camera;
  private scene = new Transform();
  private entries: Entry[] = [];
  private width = 0;
  private height = 0;
  private origin = { x: 0, y: 0 };
  private dpr = 1;
  private disposed = false;

  constructor(private canvas: HTMLCanvasElement, items: HTMLElement[], private onReady: (i: number) => void) {
    this.renderer = new Renderer({ canvas, alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = this.renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    this.camera = new Camera(gl, { left: -1, right: 1, top: 1, bottom: -1, near: 1, far: 100 });
    this.camera.position.z = 10;
    const geometry = new Plane(gl, { widthSegments: 32, heightSegments: 20 });

    items.forEach((el, i) => {
      const img = el.querySelector("img");
      if (!img) return;
      const texture = new Texture(gl, { generateMipmaps: false, minFilter: gl.LINEAR, magFilter: gl.LINEAR });
      const program = new Program(gl, {
        vertex,
        fragment,
        transparent: true,
        uniforms: {
          tMap: { value: texture },
          uBend: { value: 0 },
          uGray: { value: 1 },
          uAlpha: { value: 0 },
          uZoom: { value: 1 },
          uRes: { value: [1, 1] },
          uFade: { value: [1, 1] },
        },
      });
      const mesh = new Mesh(gl, { geometry, program });
      mesh.setParent(this.scene);
      const entry: Entry = { el, img, mesh, program, ready: false };
      this.entries.push(entry);

      const upload = () => {
        if (this.disposed || entry.ready) return;
        texture.image = img;
        entry.ready = true;
        this.onReady(i);
      };
      if (img.complete && img.naturalWidth) img.decode().then(upload, upload);
      else img.addEventListener("load", () => img.decode().then(upload, upload), { once: true });
    });

    this.resize();
  }

  resize() {
    // Measure the container: OGL writes inline pixel sizes onto the canvas itself.
    const rect = (this.canvas.parentElement ?? this.canvas).getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.origin = { x: rect.left, y: rect.top };
    this.dpr = this.renderer.dpr;
    this.renderer.setSize(this.width, this.height);
    this.camera.orthographic({
      left: -this.width / 2,
      right: this.width / 2,
      top: this.height / 2,
      bottom: -this.height / 2,
    });
  }

  /** gray[i] in 0..1, bend in plane-height units, zoom per item (1 = none). */
  render(gray: number[], bend: number, zoom: number[], alpha: number) {
    if (this.disposed) return;
    this.entries.forEach((entry, i) => {
      const r = entry.el.getBoundingClientRect();
      const u = entry.program.uniforms;
      entry.mesh.visible = entry.ready && r.bottom > -r.height && r.top < this.height + r.height;
      entry.mesh.scale.set(r.width, r.height, 1);
      entry.mesh.position.set(
        r.left - this.origin.x + r.width / 2 - this.width / 2,
        this.height / 2 - (r.top - this.origin.y + r.height / 2),
        0,
      );
      u.uGray.value = gray[i] ?? 1;
      u.uBend.value = bend;
      u.uZoom.value = zoom[i] ?? 1;
      u.uRes.value = [this.width * this.dpr, this.height * this.dpr];
      u.uFade.value = [150 * this.dpr, 90 * this.dpr];
      // Fade each plane in once, then follow the global alpha.
      u.uAlpha.value = entry.ready ? Math.min(1, u.uAlpha.value + 0.08) * alpha : 0;
    });
    this.renderer.render({ scene: this.scene, camera: this.camera });
  }

  destroy() {
    // The canvas (and its context) is reused if the layer is created again, so the
    // context is cleared rather than lost.
    this.disposed = true;
    const gl = this.renderer.gl;
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
}
