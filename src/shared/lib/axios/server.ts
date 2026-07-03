import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

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
      async (config: InternalAxiosRequestConfig) => config,
      (error) => Promise.reject(error)
    );

    // Response interceptor for the server
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.error('[Server Axios Error]', {
          url: error.config?.url,
          status: error.response?.status,
          message: error.message,
        });

        return Promise.reject(error);
      }
    );
  }

  public getClient(): AxiosInstance {
    return this.client;
  }
}

export const axiosServer = AxiosServer.getInstance().getClient();