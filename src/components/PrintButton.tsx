"use client";

export default function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" className="pill" onClick={() => window.print()}>
      {label}
    </button>
  );
}
