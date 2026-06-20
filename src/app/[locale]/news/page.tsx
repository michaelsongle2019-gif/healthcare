import { redirect } from "next/navigation";
import { ensureLocale } from "@/lib/locales";

export default async function NewsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = ensureLocale(rawLocale);

  redirect(`/${locale}/products`);
}
