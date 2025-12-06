'use client';

import { useState } from 'react';
import { ArrowRightLeft, Loader2 } from 'lucide-react';

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

const countries = [
  { value: 'china', label: '中国 (CNY)' },
  { value: 'japan', label: '日本 (JPY)' },
  { value: 'uk', label: '英国 (GBP)' },
  { value: 'australia', label: '澳大利亚 (AUD)' },
  { value: 'canada', label: '加拿大 (CAD)' },
  { value: 'singapore', label: '新加坡 (SGD)' },
  { value: 'korea', label: '韩国 (KRW)' },
  { value: 'india', label: '印度 (INR)' },
  { value: 'thailand', label: '泰国 (THB)' },
  { value: 'vietnam', label: '越南 (VND)' },
];

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

  const handleConvert = async () => {
    if (!amount || !country) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, country }),
      });

      const data = await response.json();
      onResult(data);
    } catch (error) {
      console.error('[PPP] Conversion error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-0 bg-white/95 shadow-2xl backdrop-blur-xl overflow-hidden">
      <CardContent className="p-6 md:p-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="amount"
              className="text-foreground text-sm font-medium"
            >
              美元金额 (USD)
            </Label>
            <div className="relative">
              <span className="text-muted-foreground pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-medium">
                $
              </span>
              <Input
                id="amount"
                type="number"
                placeholder="100"
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
              目标国家
            </Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger
                id="country"
                className="h-14 border-2 text-lg transition-all focus:border-[#25D366]"
              >
                <SelectValue placeholder="选择国家" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
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
                计算中...
              </>
            ) : (
              <>
                <ArrowRightLeft className="mr-2 h-5 w-5" />
                开始换算
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

