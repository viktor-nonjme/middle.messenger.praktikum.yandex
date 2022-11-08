/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Options = {
  method: METHOD
  data?: Record<string, any>
  headers?: Record<string, string>
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<XMLHttpRequest>

class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => {
    if (options.data) {
      url = `${url}${this.queryStringify(options.data)}`;
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

      xhr.open(method, url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      // eslint-disable-next-line func-names
      xhr.onload = function () {
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

export default HTTPTransport;
