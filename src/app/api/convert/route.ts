import { NextResponse } from 'next/server';

import { getAllConfigs } from '@/shared/models/config';

export async function POST(request: Request) {
  try {
    const { amount, country } = await request.json();

    // 获取OpenRouter API Key
    const configs = await getAllConfigs();
    const openrouterApiKey = configs.openrouter_api_key;
    if (!openrouterApiKey) {
      throw new Error('openrouter_api_key is not set');
    }

    const countryNames: Record<string, string> = {
      china: '中国',
      japan: '日本',
      uk: '英国',
      australia: '澳大利亚',
      canada: '加拿大',
      singapore: '新加坡',
      korea: '韩国',
      india: '印度',
      thailand: '泰国',
      vietnam: '越南',
    };

    const prompt = `作为一个购买力平价(PPP)专家，请将${amount}美元换算成${countryNames[country]}的本地货币。

重要：这是购买力平价换算，不是汇率换算。请基于真实的物价水平和生活成本来计算等价购买力。

例如：100美元在美国的购买力，可能相当于在中国300元人民币的购买力（而不是按汇率720元）。

请提供：
1. 基于购买力平价的等价金额（不是汇率换算）
2. 货币代码（例如：CNY, JPY等）
3. 5个具体的购买力对比示例，展示相同商品在两国的实际价格对比

请以JSON格式返回：
{
  "amount": "换算后的金额（纯数字）",
  "currency": "货币代码",
  "comparisons": ["示例1", "示例2", "示例3", "示例4", "示例5"]
}

注意：只返回JSON，不要任何其他文字`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
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
    });

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse the JSON response from AI
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return NextResponse.json({
        ...result,
        country: countryNames[country],
      });
    }

    throw new Error('Invalid response format');
  } catch (error) {
    console.error('[PPP] API error:', error);
    return NextResponse.json({ error: 'Conversion failed' }, { status: 500 });
  }
}

