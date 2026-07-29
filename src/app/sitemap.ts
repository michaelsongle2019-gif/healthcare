import type { MetadataRoute } from "next";
import { isDocumentCenterVisible } from "@/lib/public-features";
import { listProducts } from "@/lib/repository";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const staticRoutes = [
    "/en",
    "/en/products",
    "/en/contact",
    "/zh",
    "/zh/products",
    "/zh/contact"
  ];
  if (isDocumentCenterVisible()) {
    staticRoutes.push("/en/documents", "/zh/documents");
  }

  const productRoutes = listProducts().flatMap((product) => [
    `/en/products/${String(product.slug)}`,
    `/zh/products/${String(product.slug)}`
  ]);
  return [...staticRoutes, ...productRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));
}
