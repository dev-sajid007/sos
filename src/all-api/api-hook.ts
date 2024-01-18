import { alertError } from '@/components/ui/alert';
import { removeCookie } from '@/hooks';
import { BASE_URL } from '@/lib/env';
import axios from 'axios';
import { signOut } from 'next-auth/react';

export const logout = async () => {
	try {
		const response = await axios.post(BASE_URL + `/api/logout`, {
			headers: {
				withCredentials: true,
			},
		});
		if (response.data.status === 200) {
			await signOut({
				redirect: false,
			});
			removeCookie('userInfo');
		}
	} catch (error) {
		alertError('Error!', 'Please Try Again');
	}
};
