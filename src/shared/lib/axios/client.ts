'use client';

import { STORAGE_KEYS } from '@/shared/constants';
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';

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
      withCredentials: true, // Important for sending cookies with auth_token
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
    // Request interceptor
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        // Load the language from localStorage
        const locale = localStorage.getItem(STORAGE_KEYS.LOCALE) || 'ru';
        config.headers['Accept-Language'] = locale;

        // Request logging (dev)
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Axios Request] ${config.method?.toUpperCase()} ${config.url}`);
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Axios Response] ${response.config.url}`, response.status);
        }
        return response;
      },
      async (error: AxiosError) => {
        // 401 - Unauthorized
        if (error.response?.status === 401) {
          // Redirect to the login page if not on the auth page
          if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth')) {
            const locale = localStorage.getItem(STORAGE_KEYS.LOCALE) || 'ru';
            window.location.href = `/${locale}/auth`;
          }
        }

        // Handling validation errors
        if (error.response?.status === 422) {
          const validationErrors = error.response.data as any;
          throw new ValidationError(validationErrors);
        }

        // Handling network errors
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

// Custom validation error
export class ValidationError extends Error {
  constructor(public errors: any) {
    super('Validation Error');
    this.name = 'ValidationError';
  }
}

export const axiosClient = AxiosClient.getInstance().getClient();