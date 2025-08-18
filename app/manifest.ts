import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Business",
    short_name: "Business",
    description: "An ecommerce application by wintercode for the people",
    theme_color: "#0a0a0a",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    icons: [
      {
        src: "/img/logo-16.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        src: "/img/logo-48.png",
        type: "image/png",
        sizes: "48x48",
      },
      {
        src: "/img/logo-64.png",
        type: "image/png",
        sizes: "64x64",
      },
      {
        src: "/img/logo-72.png",
        type: "image/png",
        sizes: "72x72",
      },
      {
        src: "/img/logo-96.png",
        type: "image/png",
        sizes: "96x96",
      },
      {
        src: "/img/logo-128.png",
        type: "image/png",
        sizes: "128x128",
      },
      {
        src: "/img/logo-144.png",
        type: "image/png",
        sizes: "144x144",
      },
      {
        src: "/img/logo-152.png",
        type: "image/png",
        sizes: "152x152",
      },
      {
        src: "/img/logo-180.png",
        type: "image/png",
        sizes: "180x180",
      },
      {
        src: "/img/logo-192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "/img/logo-256.png",
        type: "image/png",
        sizes: "256x256",
      },
      {
        src: "/img/logo-512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
  };
}
