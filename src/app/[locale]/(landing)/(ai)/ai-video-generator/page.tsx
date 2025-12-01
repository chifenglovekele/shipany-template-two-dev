import { getTranslations } from 'next-intl/server';

import { Hero } from '@/themes/default/blocks/hero';

export default async function AiVideoGeneratorPage() {
  const t = await getTranslations('landing');
  const tt = await getTranslations('demo.ai-video-generator');

  return (
    <>
      <Hero
        hero={{
          title: tt.raw('title'),
          description: tt.raw('description'),
        }}
      />
    </>
  );
}
