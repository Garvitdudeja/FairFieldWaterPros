import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 22, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function Droplet(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3s6.5 6.9 6.5 11a6.5 6.5 0 0 1-13 0C5.5 9.9 12 3 12 3z" />
    </Base>
  );
}

export function Funnel(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 5h18l-7 8v6.5l-4 2V13z" />
    </Base>
  );
}

export function Flask(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M10 3h4" />
      <path d="M11 3v6l-5.4 9a2 2 0 0 0 1.7 3h9.4a2 2 0 0 0 1.7-3L13 9V3" />
      <path d="M7.5 15h9" />
    </Base>
  );
}

export function Shield(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3l7 3v5.4c0 4.3-2.9 7.9-7 9.3-4.1-1.4-7-5-7-9.3V6z" />
      <path d="M12 9v4" />
      <path d="M12 16.2h.01" />
    </Base>
  );
}

export function House(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 21h18" />
      <path d="M5 21V8l7-4 7 4v13" />
      <path d="M10 21v-5h4v5" />
    </Base>
  );
}

export function Gauge(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="13" r="7" />
      <path d="M12 13V9" />
      <path d="M9.5 3h5" />
    </Base>
  );
}

export function Arrow(props: IconProps) {
  return (
    <Base size={14} strokeWidth={2} {...props}>
      <path d="M5 12h13" />
      <path d="M13 6l6 6-6 6" />
    </Base>
  );
}

export function Phone(props: IconProps) {
  return (
    <Base size={18} strokeWidth={1.7} {...props}>
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3z" />
    </Base>
  );
}

export function Mail(props: IconProps) {
  return (
    <Base size={18} strokeWidth={1.7} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6 8.5-6" />
    </Base>
  );
}

export function Clock(props: IconProps) {
  return (
    <Base size={18} strokeWidth={1.7} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </Base>
  );
}

export function Pin(props: IconProps) {
  return (
    <Base size={18} strokeWidth={1.7} {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </Base>
  );
}

export function Check(props: IconProps) {
  return (
    <Base size={20} strokeWidth={1.7} {...props}>
      <path d="M20 6L9 17l-5-5" />
    </Base>
  );
}

export const ICONS = {
  droplet: Droplet,
  funnel: Funnel,
  flask: Flask,
  shield: Shield,
  house: House,
  gauge: Gauge,
} as const;
