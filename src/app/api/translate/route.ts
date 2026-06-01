import { NextRequest, NextResponse } from 'next/server';
import { translate } from "@vitalets/google-translate-api";
import { AppLocale } from '@/shared';

interface TranslateRequest {
  text: string;
  targetLocale: AppLocale;
}

interface TranslateSuccessResponse {
  translatedText: string;
}

interface TranslateErrorResponse {
  error: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<TranslateSuccessResponse | TranslateErrorResponse>> {
  try {
    const { text, targetLocale }: TranslateRequest = await request.json();

    if (!text?.trim()) {
      return NextResponse.json({ translatedText: text });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await translate(text, {
        to: targetLocale === 'en' ? 'en' : 'ru'
      });

      clearTimeout(timeoutId);
      return NextResponse.json({ translatedText: res.text });
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  } catch (error) {
    console.error("Translation API error:", error);
    return NextResponse.json(
      { error: "Translation failed" },
      { status: 500 }
    );
  }
}