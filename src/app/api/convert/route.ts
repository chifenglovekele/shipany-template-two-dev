import { NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';

import { getAllConfigs } from '@/shared/models/config';

export async function POST(request: Request) {
  try {
    const { amount, country, locale = 'en' } = await request.json();

    // 获取OpenRouter API Key
    const configs = await getAllConfigs();
    const openrouterApiKey = configs.openrouter_api_key;
    if (!openrouterApiKey) {
      throw new Error('openrouter_api_key is not set');
    }

    // Get translations based on locale
    const t = await getTranslations({ locale, namespace: 'landing' });

    // Get country name from translations - use raw to avoid ICU parsing issues
    const converter = t.raw('converter') as {
      country_names: Record<string, string>;
      prompt: string;
    };
    const countryName = converter.country_names[country];

    // Get prompt template and manually replace placeholders
    const prompt = converter.prompt
      .replace('{amount}', amount)
      .replace('{country}', countryName);

    console.log('prompt', prompt);

    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${openrouterApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse the JSON response from AI
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return NextResponse.json({
        ...result,
        country: countryName,
      });
    }

    throw new Error('Invalid response format');
  } catch (error) {
    console.error('[PPP] API error:', error);
    return NextResponse.json({ error: 'Conversion failed' }, { status: 500 });
  }
}
