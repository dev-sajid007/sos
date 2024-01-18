import { BASE_URL } from '@/lib/env';
import axios from 'axios';
import { useSession } from 'next-auth/react';
const Http = axios.create({
	baseURL: BASE_URL,
	headers: { 'X-Requested-With': 'XMLHttpRequest' },
	withCredentials: true,
});
Http.interceptors.request.use(function (config) {
	const { data } = useSession();

	const token = '96|32nUrz0KJvjtcErtg7Yuuyg5LobIb02SCQe1hmiy';
	// const token = localStorage.getItemj('token');
	// config.headers.Authorization = token ? `Bearer ${token}` : null;
	config.headers.Authorization = data?.user.token
		? `Bearer ${data?.user.token}`
		: null;
	return config;
});
export const multipartConfig = {
	headers: {
		'content-type': 'multipart/form-data',
	},
};
export default Http;
