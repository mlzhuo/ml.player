import axios from 'axios';

// 创建axios
const service = axios.create({
  baseURL: 'http://localhost:3000/'
});

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response;
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export const $get = ({ url }) => {
  return service.request({ method: 'GET', url });
};
export const $post = ({ url, data }) => {
  return service.request({ method: 'POST', url, data });
};
