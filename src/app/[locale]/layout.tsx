import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "./dictionaries";
import { DictionaryProvider } from "./DictionaryProvider";
import { LocaleAttributes } from "./LocaleAttributes";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <DictionaryProvider dictionary={dictionary}>
      <LocaleAttributes locale={locale} />
      {children}
    </DictionaryProvider>
  );
}
