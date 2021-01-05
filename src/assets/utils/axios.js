import axios from 'axios';

// 创建axios
const service = axios.create({
	baseURL: 'http://192.168.2.116:4000/'
});

// 添加请求拦截器
service.interceptors.request.use(
	config => {
		// 在发送请求之前做些什么
		const url = config.url;
		config.url =
			url.indexOf('?') !== -1
				? `${url}&timestamp=${+new Date()}`
				: `${url}?timestamp=${+new Date()}`;
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
		const message = error.response.data.message;
		alert(message);
		return Promise.reject(error);
	}
);

export const $get = ({ url }) => {
	return service.request({ method: 'GET', url });
};
export const $post = ({ url, data }) => {
	return service.request({ method: 'POST', url, data });
};
