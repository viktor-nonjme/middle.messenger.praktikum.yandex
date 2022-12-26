/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { TProps } from '../types';

const BASE_URL = 'https://ya-praktikum.tech/api/v2/';

enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Options = {
  method: METHOD;
  data?: TProps | XMLHttpRequestBodyInit;
  headers?: Record<string, string>;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<XMLHttpRequest>

class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => {
    const { data } = options;
    if (data) {
      url = `${url}${this.queryStringify(data as TProps)}`;
    }
    return this.request(url, { ...options, method: METHOD.GET });
  };

  post: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHOD.POST });

  put: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHOD.PUT });

  delete: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHOD.DELETE });

  private queryStringify(data: Record<string, any>) {
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
  }

  private request(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      url = BASE_URL + url;

      xhr.open(method, url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function cb() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data as XMLHttpRequestBodyInit);
      }
    });
  }
}

export default new HTTPTransport();
