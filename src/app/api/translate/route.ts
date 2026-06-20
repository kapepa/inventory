import { NextRequest, NextResponse } from 'next/server';
import { translate as translateGoogle } from "@vitalets/google-translate-api";
import translate from "translate";
import { AppLocale } from '@/shared';
import { apiHandler } from '@/shared/server';

const translationCache = new Map<string, { text: string; timestamp: number }>();
const CACHE_TTL = 60 * 60 * 1000;

function getCached(key: string): string | null {
  const cached = translationCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.text;
  }
  return null;
}

function setCache(key: string, text: string): void {
  translationCache.set(key, { text, timestamp: Date.now() });
}

export const POST = apiHandler(async (request: NextRequest) => {
  try {
    const { text, targetLocale } = await request.json() as {
      text: string;
      targetLocale: AppLocale
    };

    if (!text?.trim()) {
      return NextResponse.json({ translatedText: text });
    }

    const target = targetLocale;
    const cacheKey = `${text}_${target}`;

    const cached = getCached(cacheKey);
    if (cached) {
      return NextResponse.json({ translatedText: cached });
    }

    let translatedText: string;
    try {
      // 1. LibreTranslate
      translatedText = await translate(text, { to: targetLocale, from: targetLocale === 'ru' ? 'en' : 'ru' });
    } catch {
      try {
        // 2.Google Translate
        const res = await translateGoogle(text, { to: targetLocale });
        translatedText = res.text;
      } catch {
        console.error("All translation services failed");
        return NextResponse.json(
          { error: "Translation unavailable" },
          { status: 503 }
        );
      }
    }

    setCache(cacheKey, translatedText);
    return NextResponse.json({ translatedText });

  } catch (error) {
    console.error("Translation API error:", error);
    return NextResponse.json(
      { error: "Translation failed" },
      { status: 500 }
    );
  }
})