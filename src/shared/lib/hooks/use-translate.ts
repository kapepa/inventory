"use client"

import { useState } from 'react';
import { axiosInstance } from '../axios';

export const useTranslate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const translate = async (text: string, targetLocale: string): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/translate', {
        text,
        targetLocale,
      });

      return response.data.translatedText;
    } catch (err) {
      const errorMessage = 'Translation failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    translate,
    isLoading,
    error,
  };
};