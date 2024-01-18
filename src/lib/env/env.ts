import { alertError } from '@/components/ui/alert';
import { NextRouter } from 'next/router';

// https://sos.mdperves.com
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const DASHBOARD_URL =
	process.env.NODE_ENV === 'production'
		? process.env.NEXT_PUBLIC_DASHBOARD_URL
		: 'http://localhost:3001';

export const DOMAIN_URL =
	process.env.NODE_ENV === 'production'
		? process.env.NEXT_PUBLIC_DOMAIN_URL
		: 'localhost';

export const PROFILE_PAGE = (
	role: string,
	subscription: any,
	router: NextRouter
) => {
	switch (role) {
		case '1':
			return (window.location.href = DASHBOARD_URL + `/admin/profile`);
		case '2':
			if (subscription) {
				return (window.location.href =
					DASHBOARD_URL + `/vendors-dashboard/profile`);
			}
			alertError('Subscription', 'Please buy A Subscription').then((e) =>
				router.push('/pricing')
			);
			return;
		case '3':
			if (subscription) {
				return (window.location.href =
					DASHBOARD_URL + `/affiliates-dashboard/profile`);
			}
			alertError('Subscription', 'Please buy A Subscription').then((e) =>
				router.push('/pricing')
			);

			return;
		case '4':
			return (window.location.href =
				DASHBOARD_URL + `/users-dashboard/profile`);

		default:
			return (window.location.href = DASHBOARD_URL as string);
	}
};
// export const goToDashboard = (role: string, to: string, subscription?: any) => {
// 	switch (role) {
// 		case '1':

// 			return;

// 		default:
// 			break;
// 	}
// };
export const DASHBOARD_PAGE = (
	role: string,
	subscription?: any,
	router?: any,
	admin?: boolean
) => {
	switch (role) {
		case '1':
			if (admin) {
				return (window.location.href = DASHBOARD_URL + `/admin`);
			}
			return (window.location.href = DASHBOARD_URL as string);
		case '2':
			if (subscription) {
				return (window.location.href = DASHBOARD_URL + `/vendors-dashboard`);
			}
			alertError('Subscription', 'Please buy A Subscription').then((e) =>
				router.push('/pricing')
			);

			return;
		case '3':
			if (subscription) {
				return (window.location.href = DASHBOARD_URL + `/affiliates-dashboard`);
			}
			alertError('Subscription', 'Please buy A Subscription').then((e) =>
				router.push('/pricing')
			);

			return;

		case '4':
			return (window.location.href = DASHBOARD_URL + `/users-dashboard`);

		default:
			return (window.location.href = DASHBOARD_URL as string);
	}
};
