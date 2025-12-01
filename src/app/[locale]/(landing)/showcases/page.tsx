import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getThemePage } from '@/core/theme';
import { getMetadata } from '@/shared/lib/seo';
import {
  CTA as CTAType,
  Showcases as ShowcasesType,
} from '@/shared/types/blocks/landing';

export const generateMetadata = getMetadata({
  metadataKey: 'showcases.metadata',
  canonicalUrl: '/showcases',
});

export default async function ShowcasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // load landing data
  const tl = await getTranslations('landing');

  // load showcases data
  const t = await getTranslations('showcases');

  // load page component
  const Page = await getThemePage('showcases');

  // build sections
  const showcases: ShowcasesType = t.raw('showcases');
  const cta: CTAType = tl.raw('cta');

  return <Page locale={locale} showcases={showcases} cta={cta} />;
}
