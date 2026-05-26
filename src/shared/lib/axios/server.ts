import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
// import { cookies } from 'next/headers';

class AxiosServer {
  private static instance: AxiosServer;
  private client: AxiosInstance;

  private constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): AxiosServer {
    if (!AxiosServer.instance) {
      AxiosServer.instance = new AxiosServer();
    }
    return AxiosServer.instance;
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        // Получаем токен из cookies на сервере
        // const cookieStore = cookies();
        // const token = cookieStore.get('access_token');

        // if (token?.value) {
        //   config.headers.Authorization = `Bearer ${token.value}`;
        // }

        // // Получаем язык из cookies
        // const locale = cookieStore.get('locale')?.value || 'ru';
        // config.headers['Accept-Language'] = locale;

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor для сервера
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Логирование ошибок на сервере
        console.error('[Server Axios Error]', {
          url: error.config?.url,
          status: error.response?.status,
          message: error.message,
        });

        // Обработка 401 на сервере
        if (error.response?.status === 401) {
          // Перенаправление на страницу логина
          const { redirect } = await import('next/navigation');
          redirect('/login');
        }

        return Promise.reject(error);
      }
    );
  }

  public getClient(): AxiosInstance {
    return this.client;
  }
}

export const axiosServer = AxiosServer.getInstance().getClient();