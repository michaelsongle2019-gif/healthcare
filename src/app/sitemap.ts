import type { MetadataRoute } from "next";
import { listProducts } from "@/lib/repository";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const staticRoutes = [
    "/en",
    "/en/products",
    "/en/documents",
    "/en/contact",
    "/zh",
    "/zh/products",
    "/zh/documents",
    "/zh/contact"
  ];

  const productRoutes = listProducts().flatMap((product) => [
    `/en/products/${String(product.slug)}`,
    `/zh/products/${String(product.slug)}`
  ]);
  return [...staticRoutes, ...productRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));
}
