/** Inline icons (decorative: always aria-hidden). Horizontal arrows flip in RTL via .icon-dir. */
type IconProps = { className?: string };

export function ArrowForward({ className = "" }: IconProps) {
  return (
    <svg className={`icon icon-dir ${className}`} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowBack({ className = "" }: IconProps) {
  return (
    <svg className={`icon icon-dir ${className}`} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M20 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowDown({ className = "" }: IconProps) {
  return (
    <svg className={`icon ${className}`} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M12 4v15M6 13l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Chevron({ className = "" }: IconProps) {
  return (
    <svg className={`icon ${className}`} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ListIcon({ className = "" }: IconProps) {
  return (
    <svg className={`icon ${className}`} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Close({ className = "" }: IconProps) {
  return (
    <svg className={`icon ${className}`} viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function External({ className = "" }: IconProps) {
  return (
    <svg className={`icon ${className}`} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M8 16L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
