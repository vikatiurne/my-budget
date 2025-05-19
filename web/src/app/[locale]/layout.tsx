import "./globals.css";
import Header from "@/components/layout/Header";
import AuthProviderWrapper from "@/hoc/AuthProviderWrapper";
import ReactQueryProvider from "@/components/containers/ReactQueryProvider";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <ReactQueryProvider>
          <NextIntlClientProvider>
            <AuthProviderWrapper>
              <Header locale={locale} />

              {children}
            </AuthProviderWrapper>
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
