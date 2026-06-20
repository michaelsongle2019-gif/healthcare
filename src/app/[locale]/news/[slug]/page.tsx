import { redirect } from "next/navigation";
import { ensureLocale } from "@/lib/locales";

export default async function NewsDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = ensureLocale(rawLocale);

  redirect(`/${locale}/products`);
}
