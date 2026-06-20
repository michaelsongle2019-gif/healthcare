function withHttps(host: string) {
  return `https://${host}`;
}

export function getSiteUrl() {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicitUrl) {
    return explicitUrl;
  }

  const productionHost =
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (productionHost) {
    return withHttps(productionHost);
  }

  const deploymentHost =
    process.env.NEXT_PUBLIC_VERCEL_URL?.trim() || process.env.VERCEL_URL?.trim();
  if (deploymentHost) {
    return withHttps(deploymentHost);
  }

  return "http://localhost:3000";
}
