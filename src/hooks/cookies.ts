import { DOMAIN_URL } from '@/lib/env';

export function setCookie(name: string, value: any, daysToExpire: number) {
	const date = new Date();
	date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
	const expires = 'expires=' + date.toUTCString();

	return (document.cookie =
		name + '=' + value + ';' + expires + ';path=/;domain=' + DOMAIN_URL);
}

// for 1 minute
// export function setCookie(name: string, value: any, daysToExpire: number) {
// 	const date = new Date();
// 	date.setTime(date.getTime() + 60 * 1000);
// 	const expires = 'expires=' + date.toUTCString();

// 	return (document.cookie =
// 		name + '=' + value + ';' + expires + ';path=/;domain=' + DOMAIN_URL);
// }

export function removeCookie(name: string) {
	const pastDate = new Date(0);
	const expires = 'expires=' + pastDate.toUTCString();
	document.cookie = name + '=;' + expires + ';path=/;domain=' + DOMAIN_URL;
}

export function setCookie2(
	name: string,
	value: any,
	daysToExpire: number,
	domain: string = 'localhost',
	httpOnly: boolean = true,
	sameSite: 'Strict' | 'lax' | 'None' = 'lax'
) {
	const date = new Date();
	date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
	const expires = 'expires=' + date.toUTCString();

	// Construct the cookie string with HTTP-only and SameSite attributes
	let cookieString = `${name}=${value}; ${expires}; path=/; domain=${domain}`;
	if (httpOnly) {
		cookieString += '; HttpOnly';
	}
	cookieString += `; SameSite=${sameSite}`;

	document.cookie = cookieString;
}
