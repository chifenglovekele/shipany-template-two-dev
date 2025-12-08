'use client';

import { useState } from 'react';
import { Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Landing } from '@/shared/types/blocks/landing';
import {
  ConversionResult,
  CurrencyConverter,
  Subscribe,
} from '@/themes/default/blocks';

export default function LandingPage({
  locale,
  page,
}: {
  locale?: string;
  page: Landing;
}) {
  const [result, setResult] = useState<{
    amount: string;
    currency: string;
    country: string;
    comparisons: string[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('landing.converter');

  return (
    <>
      {/* PPP Converter Main Section */}
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#128C7E]/80 via-[#25D366]/70 to-[#5FE89D]/60 p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="animate-fade-in mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl border-2 border-white/40 bg-white/30 shadow-2xl backdrop-blur-xl">
                <Globe className="h-10 w-10 text-white drop-shadow-lg" />
              </div>
            </div>
            <h1 className="mb-3 text-4xl font-bold tracking-tight text-balance text-white md:text-5xl lg:text-6xl">
              {t('title')}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-pretty text-white/80 md:text-xl">
              {t('description')}
            </p>
          </div>

          {/* Main Content */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Input Section */}
            <div className="animate-slide-up">
              <CurrencyConverter
                onResult={setResult}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </div>

            {/* Result Section */}
            <div
              className="animate-slide-up"
              style={{ animationDelay: '100ms' }}
            >
              <ConversionResult result={result} isLoading={isLoading} />
            </div>
          </div>

          {/* Footer */}
          <div
            className="animate-fade-in mt-12 text-center"
            style={{ animationDelay: '200ms' }}
          >
            <p className="text-sm text-white/60">{t('footer_tip')}</p>
          </div>
        </div>
      </main>

      {/* Subscribe Section */}
      {page.subscribe && (
        <Subscribe subscribe={page.subscribe} className="bg-muted" />
      )}
    </>
  );
}
