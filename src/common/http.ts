import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import Vue from 'vue';

enum StatusCode {
    Unauthorized = 401,
    Forbidden = 403,
    TooManyRequests = 429,
    InternalServerError = 500,
    BadRequest = 400,
}

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json;",
    "Access-Control-Allow-Credentials": '*',
    "Access-Control-Allow-Origin": '*',
}

const token = (config: AxiosRequestConfig): AxiosRequestConfig => {
    try {
        const token = localStorage.getItem('token');

        if (token != null) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;

    } catch (error) {
        throw new Error(error)
    }
}

class Http {
    private instance: AxiosInstance | null = null;

    private get http(): AxiosInstance {
        return this.instance != null ? this.instance : this.initHttp();
    }

    initHttp() {
        const http = axios.create({
            baseURL: "http://rating-app.test/api/",
            headers,
            withCredentials: true,
        });

        http.interceptors.request.use(token, (error => Promise.reject(error)));

        http.interceptors.response.use(
            (response) => response,
            error => {
                const { response } = error;
                return this.handleError(response);
            }
        );

        return http;
    }

    request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
        return this.http.request(config);
    }

    get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.http.get<T, R>(url, config);
    }

    post<T = any, R = AxiosResponse<T>>(
        url: string,
        data?: T,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.http.post<T, R>(url, data, config);
    }

    put<T = any, R = AxiosResponse<T>>(
        url: string,
        data?: T,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.http.put<T, R>(url, data, config);
    }

    delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.http.delete<T, R>(url, config);
    }


    private handleError(error: any) {
        const { status } = error;

        switch (status) {
            case StatusCode.InternalServerError: {
                Vue.notify({
                    type: 'error',
                    title: 'Internal Server Error.',
                    text: 'Please contact our support.'
                });
                break;
            }
            case StatusCode.Forbidden: {
                // Handle Forbidden
                break;
            }
            case StatusCode.Unauthorized: {
                Vue.notify({
                    type: 'warn',
                    title: 'Unauthorized.',
                    text: 'Please login.'
                });
                window.location.href = '/login';
                break;
            }
            case StatusCode.BadRequest: {
                alert(error.data.data['error']);
                break;
            }
            case StatusCode.TooManyRequests: {
                // Handle TooManyRequests
                break;
            }
        }

        return Promise.reject(error);
    }

}

export const http = new Http();