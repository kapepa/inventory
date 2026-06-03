'use client';

import { STORAGE_KEYS } from '@/shared/constants';
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
// import { getSession } from 'next-auth/react';

class AxiosClient {
  private static instance: AxiosClient;
  private client: AxiosInstance;

  private constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Для cookies
    });

    this.setupInterceptors();
  }

  public static getInstance(): AxiosClient {
    if (!AxiosClient.instance) {
      AxiosClient.instance = new AxiosClient();
    }
    return AxiosClient.instance;
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      async (config) => {
        const locale = localStorage.getItem(STORAGE_KEYS.LOCALE) || 'ru';
        config.headers['Accept-Language'] = locale;
        return config;
      }
    );
    // Request interceptor
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        // Добавляем токен авторизации
        // const session = await getSession();
        // if (session?.accessToken) {
        //   config.headers.Authorization = `Bearer ${session.accessToken}`;
        // }

        // Добавляем язык
        const locale = localStorage.getItem('locale') || 'ru';
        config.headers['Accept-Language'] = locale;

        // Логирование запросов (dev)
        if (process.env.NODE_ENV === 'development') {
          // console.log(`[Axios Request] ${config.method?.toUpperCase()} ${config.url}`, config.data);
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        // if (process.env.NODE_ENV === 'development') {
        //   console.log(`[Axios Response] ${response.config.url}`, response.data);
        // }
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        // 401
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Попытка обновить токен
            const { data } = await axios.post('/api/auth/refresh-token');
            // const session = await getSession();

            // if (session) {
            //   session.accessToken = data.accessToken;
            //   originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            //   return this.client(originalRequest);
            // }
          } catch (refreshError) {
            // Перенаправление на логин
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            return Promise.reject(refreshError);
          }
        }

        // Обработка ошибок валидации
        if (error.response?.status === 422) {
          const validationErrors = error.response.data as any;
          throw new ValidationError(validationErrors);
        }

        // Обработка ошибок сети - просто логируем и отклоняем
        if (!error.response && error.code !== 'ERR_CANCELED') {
          console.error('Network error:', error.message);
        }

        return Promise.reject(error);
      }
    );
  }

  public getClient(): AxiosInstance {
    return this.client;
  }
}

// Кастомная ошибка валидации
export class ValidationError extends Error {
  constructor(public errors: any) {
    super('Validation Error');
    this.name = 'ValidationError';
  }
}

export const axiosClient = AxiosClient.getInstance().getClient();