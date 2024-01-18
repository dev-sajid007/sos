// Need to use the React-specific entry point to import createApi
import { BASE_URL } from '@/lib/env';
import {
	BaseQueryFn,
	createApi,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { HYDRATE } from 'next-redux-wrapper';

const axiosBaseQuery =
	(
		{ baseUrl }: { baseUrl: string } = { baseUrl: '' }
	): BaseQueryFn<
		{
			url: string;
			method: AxiosRequestConfig['method'];
			data?: AxiosRequestConfig['data'];
			params?: AxiosRequestConfig['params'];
			headers?: AxiosRequestConfig['headers'];
		},
		unknown,
		unknown
	> =>
	async ({ url, method, data, params, headers }) => {
		try {
			const result = await axios({
				url: baseUrl + url,
				method,
				data,
				params,
				headers,
			});
			return { data: result.data };
		} catch (axiosError) {
			const err = axiosError as AxiosError;
			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			};
		}
	};
// Define a service using a base URL and expected endpoints
export const api = createApi({
	reducerPath: 'pokemonApi',
	baseQuery: axiosBaseQuery({
		baseUrl: BASE_URL + '/api',
	}),

	// extractRehydrationInfo(action, { reducerPath }) {
	// 	if (action.type === HYDRATE) {
	// 		return action.payload[reducerPath];
	// 	}
	// },
	endpoints: () => ({}),
});
