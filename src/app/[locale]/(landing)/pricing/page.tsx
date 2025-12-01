import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getThemePage } from '@/core/theme';
import { getMetadata } from '@/shared/lib/seo';
import { getCurrentSubscription } from '@/shared/models/subscription';
import { getUserInfo } from '@/shared/models/user';
import {
  FAQ as FAQType,
  Testimonials as TestimonialsType,
} from '@/shared/types/blocks/landing';
import { Pricing as PricingType } from '@/shared/types/blocks/pricing';

export const generateMetadata = getMetadata({
  metadataKey: 'pricing.metadata',
  canonicalUrl: '/pricing',
});

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // load landing data
  const tl = await getTranslations('landing');
  // loading pricing data
  const t = await getTranslations('pricing');

  // get current subscription
  let currentSubscription;
  try {
    const user = await getUserInfo();
    if (user) {
      currentSubscription = await getCurrentSubscription(user.id);
    }
  } catch (error) {
    console.log('getting current subscription failed:', error);
  }

  // load page component
  const Page = await getThemePage('pricing');

  // build sections
  const pricing: PricingType = t.raw('pricing');
  const faq: FAQType = tl.raw('faq');
  const testimonials: TestimonialsType = tl.raw('testimonials');

  return (
    <Page
      locale={locale}
      pricing={pricing}
      currentSubscription={currentSubscription}
      faq={faq}
      testimonials={testimonials}
    />
  );
}
