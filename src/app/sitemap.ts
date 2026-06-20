import type { MetadataRoute } from "next";
import { listProducts } from "@/lib/repository";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
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
