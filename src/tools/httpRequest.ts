/* eslint-disable @typescript-eslint/no-explicit-any */
// http.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosHeaders } from "axios";

class Http {
  private axiosInstance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    const instance: AxiosInstance = axios.create({
      ...config
    });

    instance.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    }, function (error) {
      // handle 401 globally here
      return Promise.reject(error);
    });

    this.axiosInstance = instance;
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.axiosInstance.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.axiosInstance.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.axiosInstance.put<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.axiosInstance.delete<T, R>(url, config);
  }

  setAuthToken(token: string) {
    sessionStorage.setItem('access_token', token);
    this.axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  invalidateAuthToken() {
    sessionStorage.removeItem('access_token');
    delete this.axiosInstance.defaults.headers['Authorization'];
  }

  setOrgHeader(orgId: string) {
    this.axiosInstance.defaults.headers['X-Org-Id'] = orgId;
  }

  invalidateOrgHeader() {
    delete this.axiosInstance.defaults.headers['X-Org-Id'];
  }
}

const fetchAuthHeaders = (): AxiosHeaders => {
  const h: AxiosHeaders = new AxiosHeaders({
    'Content-Type': 'application/json',
    'accept': 'application/json'
  })

  const token = sessionStorage.getItem('access_token');
  if (token) {
    h['Authorization'] = `Bearer ${token}`;
  }

  return h;
}

const http = new Http({
  baseURL: import.meta.env.VITE_APP_REDIRECT_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '1000000'),
  headers: fetchAuthHeaders()
});

export default http;