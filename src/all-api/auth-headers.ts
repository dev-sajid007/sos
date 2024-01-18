import { useSession } from 'next-auth/react';

// export const TOKEN = () => {
// 	const { data } = useSession();
// 	const token = data?.user.token;
// 	return token ? `Bearer ${token}` : null;
// };

// export const ROLE = () => {
// 	const { data } = useSession();
// 	const role = data?.user.role;
// 	return role ? role : null;
// };

// export const USERNAME = () => {
// 	const { data } = useSession();
// 	const role = data?.user.role;
// 	return role ? role : null;
// };

export const USER = () => {
	const { data } = useSession();
	const role = data?.user.role ? data.user.role : null;
	const username = data?.user.username ? data.user.username : null;
	const token = data?.user.token ? `Bearer ${data.user.token}` : null;
	return { role, username, token };
};
