'use client';

import { CheckCircle2, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

interface ConversionResultProps {
  result: {
    amount: string;
    currency: string;
    country: string;
    comparisons: string[];
  } | null;
  isLoading: boolean;
}

export function ConversionResult({ result, isLoading }: ConversionResultProps) {
  const t = useTranslations('landing.converter');

  if (isLoading) {
    return (
      <Card className="h-full border-0 bg-white/95 shadow-2xl backdrop-blur-xl">
        <CardContent className="flex min-h-[300px] items-center justify-center p-6 md:p-8">
          <div className="space-y-4 text-center">
            <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-[#25D366] border-t-transparent" />
            <p className="text-muted-foreground">{t('loading_text')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="h-full border-0 bg-white/95 shadow-2xl backdrop-blur-xl">
        <CardContent className="flex min-h-[300px] items-center justify-center p-6 md:p-8">
          <div className="space-y-3 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#075E54] to-[#25D366]">
              <ShoppingCart className="h-10 w-10 text-white" />
            </div>
            <p className="text-muted-foreground text-lg">{t('empty_text')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in h-full border-0 bg-white/95 shadow-2xl backdrop-blur-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <CheckCircle2 className="h-6 w-6 text-[#25D366]" />
          {t('result_title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6 pt-0 md:p-8">
        {/* Main Result */}
        <div className="rounded-2xl bg-gradient-to-br from-[#075E54] to-[#128C7E] p-6 text-white shadow-lg">
          <p className="mb-2 text-sm opacity-80">
            {t('result_prefix', { country: result.country })}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold tracking-tight md:text-5xl">
              {result.amount}
            </span>
            <span className="text-2xl font-medium opacity-90">
              {result.currency}
            </span>
          </div>
        </div>

        {/* Comparisons */}
        {result.comparisons && result.comparisons.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-foreground text-lg font-semibold">
              {t('comparison_title')}
            </h3>
            <div className="space-y-2">
              {result.comparisons.map((comparison, index) => (
                <div
                  key={index}
                  className="animate-slide-in border-border bg-muted/50 rounded-xl border p-4 transition-all hover:border-[#25D366]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <p className="text-foreground text-sm leading-relaxed">
                    {comparison}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
