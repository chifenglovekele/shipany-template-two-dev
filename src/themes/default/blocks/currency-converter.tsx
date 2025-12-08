'use client';

import { useState } from 'react';
import { ArrowRightLeft, Loader2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

const countryKeys = [
  'china',
  'japan',
  'uk',
  'australia',
  'canada',
  'singapore',
  'korea',
  'india',
  'thailand',
  'vietnam',
] as const;

interface CurrencyConverterProps {
  onResult: (result: {
    amount: string;
    currency: string;
    country: string;
    comparisons: string[];
  }) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function CurrencyConverter({
  onResult,
  isLoading,
  setIsLoading,
}: CurrencyConverterProps) {
  const [amount, setAmount] = useState('');
  const [country, setCountry] = useState('');
  const t = useTranslations('landing.converter');
  const locale = useLocale();

  const handleConvert = async () => {
    if (!amount || !country) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, country, locale }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error ||
            (locale === 'zh'
              ? '换算失败，请检查积分或稍后重试'
              : 'Conversion failed, please check credits or try again')
        );
      }

      onResult(data);
    } catch (error) {
      console.error('[PPP] Conversion error:', error);
      const message =
        error instanceof Error
          ? error.message
          : locale === 'zh'
            ? '换算失败，请稍后重试'
            : 'Conversion failed, please try again';
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden border-0 bg-white/95 shadow-2xl backdrop-blur-xl">
      <CardContent className="p-6 md:p-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="amount"
              className="text-foreground text-sm font-medium"
            >
              {t('amount_label')}
            </Label>
            <div className="relative">
              <span className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 font-medium">
                $
              </span>
              <Input
                id="amount"
                type="number"
                placeholder={t('amount_placeholder')}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-14 border-2 pl-8 text-lg transition-all focus:border-[#25D366]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="country"
              className="text-foreground text-sm font-medium"
            >
              {t('country_label')}
            </Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger
                id="country"
                className="h-14 border-2 text-lg transition-all focus:border-[#25D366]"
              >
                <SelectValue placeholder={t('country_placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {countryKeys.map((key) => (
                  <SelectItem key={key} value={key}>
                    {t(`countries.${key}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleConvert}
            disabled={!amount || !country || isLoading}
            className="h-14 w-full bg-[#25D366] text-lg font-medium text-white shadow-lg transition-all hover:bg-[#20BA5A] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t('button_loading')}
              </>
            ) : (
              <>
                <ArrowRightLeft className="mr-2 h-5 w-5" />
                {t('button_convert')}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
