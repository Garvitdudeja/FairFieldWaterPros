/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /* The only image on the site is the logo, rendered at 44–52px. Running it
     through Next's optimizer needs `sharp` installed on the host; where that
     is missing, /_next/image returns 500 and the logo disappears. Serving the
     static file directly removes that dependency entirely. */
  images: { unoptimized: true },
};

export default nextConfig;
