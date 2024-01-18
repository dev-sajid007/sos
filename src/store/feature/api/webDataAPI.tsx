import { getTokenFromCookie } from '@/components/actions/action';
import { api } from './api';

export const webDataAPI = api.injectEndpoints({
	endpoints(build) {
		return {
			profile: build.query({
				query: (api) => ({
					url: `/${api}/profile`,
					method: 'get',
					headers: {
						Authorization: `Bearer ${getTokenFromCookie().token}`,
						'X-Requested-With': 'XMLHttpRequest',
					},
				}),
			}),
		};
	},
});

export const { useProfileQuery } = webDataAPI;
