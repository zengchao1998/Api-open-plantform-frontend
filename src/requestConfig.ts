import type { RequestConfig } from '@umijs/max';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

/**
 * @name 请求统一处理
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {
  // 请求拦截器
  requestInterceptors: [
    (config: any) => {
      // 拦截请求配置，进行个性化处理
      let url = config.url;
      // 检查当前环境是否为"prod"（生产环境）
      if (process.env.NODE_ENV === 'production') {
        // 将基础URL替换为生产环境域名
        const baseUrl = 'http://47.120.9.159:8090';
        const path = url.startsWith('/') ? url.slice(1) : url;
        url = `${baseUrl}/${path}`;
      }
      return { ...config, url };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as ResponseStructure;
      if (data.code !== 0) {
        throw new Error('Error Detail: ' + data.message);
      }
      return response;
    },
  ],
};
