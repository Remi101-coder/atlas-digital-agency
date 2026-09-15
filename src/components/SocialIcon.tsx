import type { SVGProps } from "react";

const paths = {
  Facebook: "M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.67.33-1 1-1Z",
  X: "M18.24 2H21l-6.03 6.9L22 22h-5.5l-4.31-5.64L7.26 22H4.5l6.45-7.38L4 2h5.64l3.9 5.15L18.24 2Zm-.97 17.8h1.53L8.82 4.08H7.18l10.09 15.72Z",
  TikTok: "M15 2h3.4c.25 1.72 1.27 3.07 3.1 3.6v3.45a8.36 8.36 0 0 1-3.1-.86V15a6 6 0 1 1-6-6c.35 0 .69.03 1 .09v3.56a2.63 2.63 0 1 0 1.6 2.35V2Z",
  Instagram: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 12 16a4.5 4.5 0 0 1 0-9Zm0 2A2.5 2.5 0 1 0 12 14.5 2.5 2.5 0 0 0 12 9.5ZM17.5 6A1.1 1.1 0 1 1 17.5 8.2 1.1 1.1 0 0 1 17.5 6Z",
  LinkedIn: "M5 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5ZM3 10h4v11H3V10Zm6 0h3.8v1.5h.05A4.16 4.16 0 0 1 16.6 10c4 0 4.4 2.63 4.4 6.05V21h-4v-4.39c0-1.05-.02-2.4-1.5-2.4s-1.7 1.17-1.7 2.32V21H9V10Z",
} as const;

export default function SocialIcon({ name, ...props }: { name: keyof typeof paths } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d={paths[name]} />
    </svg>
  );
}