import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import * as Keychain from 'react-native-keychain';

const DEV_FALLBACK_TOKEN = 'temp-token';

interface ApiConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

interface BaseResponse<T = any> {
  data: T;
  success: boolean;
  message: string;
}
export interface ApiError {
  message: string;
  code?: string;
}

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(config: ApiConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const token = await this.getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        console.log('Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          data: config.data,
        });

        return config;
      },
      (error: AxiosError) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<BaseResponse>) => {
        console.log('Response:', {
          status: response.status,
          url: response.config.url,
          success: response.data.success,
          message: response.data.message,
          data: response.data.data,
        });

        if (!response.data.success) {
          console.warn('API returned success: false', {
            message: response.data.message,
            url: response.config.url,
          });
        }

        return response;
      },
      async (error: AxiosError<{ message: string }>) => {
        let message = 'Đã có lỗi xảy ra, vui lòng thử lại.';

        if (error.response) {
          message = error.response.data?.message || message;

          if (error.response.status === 401) {
            await this.handleLogout();
          }
        } else if (error.request) {
          message = 'Không thể kết nối đến máy chủ.';
        }
        return Promise.reject({ message } as ApiError);

      }
    );
  }

  private async getToken(): Promise<string | null> {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: 'accessToken',
      });

      if (credentials) {
        return credentials.password;
      }
      return DEV_FALLBACK_TOKEN;
    } catch (error) {
      console.error('Error getting token:', error);
      return DEV_FALLBACK_TOKEN;
    }
  }

  async saveTokens(accessToken: string, refreshToken?: string): Promise<void> {
    try {
      await Keychain.setGenericPassword('accessToken', accessToken, {
        service: 'accessToken',
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
      });

      if (refreshToken) {
        await Keychain.setGenericPassword('refreshToken', refreshToken, {
          service: 'refreshToken',
          accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
        });
      }
    } catch (error) {
      console.error('Error saving tokens:', error);
      throw error;
    }
  }

  private async handleLogout(): Promise<void> {
    try {
      await Keychain.resetGenericPassword({ service: 'accessToken' });
      await Keychain.resetGenericPassword({ service: 'refreshToken' });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  async clearTokens(): Promise<void> {
    await this.handleLogout();
  }

  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<BaseResponse<T>> {
    const response = await this.axiosInstance.get<BaseResponse<T>>(url, config);
    return response.data;
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<BaseResponse<T>> {
    const response = await this.axiosInstance.post<BaseResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<BaseResponse<T>> {
    const response = await this.axiosInstance.put<BaseResponse<T>>(url, data, config);
    return response.data;
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<BaseResponse<T>> {
    const response = await this.axiosInstance.patch<BaseResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<BaseResponse<T>> {
    const response = await this.axiosInstance.delete<BaseResponse<T>>(url, config);
    return response.data;
  }

  async uploadFile<T = any>(
    url: string,
    formData: FormData,
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<BaseResponse<T>> {
    const response = await this.axiosInstance.post<BaseResponse<T>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
    return response.data;
  }

  async postFormData<T = any>(
    url: string,
    data: FormData,
    config?: AxiosRequestConfig
  ): Promise<BaseResponse<T>> {
    const response = await this.axiosInstance.post<BaseResponse<T>>(url, data, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    });
    return response.data;
  }

  async putFormData<T = any>(
    url: string,
    data: FormData,
    config?: AxiosRequestConfig
  ): Promise<BaseResponse<T>> {
    const response = await this.axiosInstance.put<BaseResponse<T>>(url, data, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    });
    return response.data;
  }

  setHeader(key: string, value: string): void {
    this.axiosInstance.defaults.headers.common[key] = value;
  }

  removeHeader(key: string): void {
    delete this.axiosInstance.defaults.headers.common[key];
  }

  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

export const apiService = new ApiService({
  baseURL: 'http://192.168.60.100:5000',
  timeout: 30000,
});


export default apiService;