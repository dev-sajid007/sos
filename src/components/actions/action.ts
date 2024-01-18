import { BASE_URL, DASHBOARD_URL } from '@/lib/env';

// Desired format: 20-11-2020
export const convertDate = (e: string) => {
	var originalDate = new Date(e);
	// Desired format: 20-11-2020
	var day = originalDate.getDate().toString().padStart(2, '0');
	var month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
	var year = originalDate.getFullYear().toString();
	var formattedDate = day + '-' + month + '-' + year;
	return formattedDate;
};

// export const age = [];

// check 2 array is same or not
export function matchingArrayElements(arr1: string[], arr2: string[]) {
	const matchingElements = [];

	for (const element of arr1) {
		// Check if the element exists in the second array
		if (arr2.includes(element)) {
			matchingElements.push(element);
		}
	}

	return matchingElements;
}

export const getTokenFromCookie = () => {
	const cookies = document.cookie.split('; ');
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].split('=');
		if (cookie[0] === 'userInfo') {
			return JSON.parse(cookie[1]);
		}
	}
	return null;
};

export const userPath = (role: string) => {
	switch (role) {
		case '1':
			return `admin`;
		case '2':
			return `vendor`;
		case '3':
			return `affiliator`;
		case '4':
			return `user`;

		default:
			return undefined;
	}
};

export const fetchData = async (url: string) => {
	try {
		const res = await fetch(BASE_URL + url);
		const data = await res.json();
		return data;
	} catch (error) {}
};

export const timeToCovertCurrentTime = (e: Date) => {
	// Input date and time in ISO 8601 format
	const isoDateTime = e;

	// Parse the ISO date and time
	const parsedDateTime = new Date(isoDateTime);

	// Calculate the time difference in milliseconds
	const currentTime = new Date();
	const timeDifference = (currentTime as any) - (parsedDateTime as any);

	// Define time intervals
	const minute = 60 * 1000;
	const hour = 60 * minute;
	const day = 24 * hour;
	const month = 30 * day; // Approximate
	const year = 365 * day; // Approximate

	// Function to format the time difference
	function formatRelativeTime(timeDifference: any) {
		if (timeDifference < minute) {
			// return Math.floor(timeDifference / 1000) + ' sec ago';
			return 'just now';
		} else if (timeDifference < hour) {
			return Math.floor(timeDifference / minute) + ' min';
		} else if (timeDifference < day) {
			return Math.floor(timeDifference / hour) + ' hr';
		} else if (timeDifference < month) {
			return Math.floor(timeDifference / day) + ' days';
		} else if (timeDifference < year) {
			return Math.floor(timeDifference / month) + ' months';
		} else {
			return Math.floor(timeDifference / year) + ' years';
		}
	}

	// Format the relative time
	const relativeTime = formatRelativeTime(timeDifference);

	return relativeTime;
};

// type SetSearchFunction = (search: string) => void;
// type SetPageFunction = (page: number) => void;
// type SearchHandlerFunction = (e: string) => void;

// export const useDebounce = (
// 	setSearch: SetSearchFunction,
// 	setPage: SetPageFunction
// ) => {
// 	let getData: SearchHandlerFunction = (e) => {
// 		setSearch(e.trim());
// 		setPage(1);
// 	};

// 	const doDebounce = function (fn: SearchHandlerFunction, d: number) {
// 		let timer: NodeJS.Timeout;
// 		return function (...args: any) {
// 			clearTimeout(timer);
// 			timer = setTimeout(() => {
// 				fn(...args);
// 			}, d);
// 		};
// 	};

// 	const searchHandler: SearchHandlerFunction = doDebounce(getData, 700);

// 	return { searchHandler };
// };

export const useDebounce = (setSearch: any, setPage: any) => {
	let getData = (e: any) => {
		setSearch(e.trim());
		setPage(1);
	};
	const doDebounce = function (fn: any, d: any) {
		let timer: any;
		return function (...args: any) {
			clearTimeout(timer);
			timer = setTimeout(() => {
				fn(...args);
			}, d);
		};
	};
	const searchHandler = doDebounce(getData, 700);

	return { searchHandler };
};

export const checkValueIsOrNot = (array: string[], item: string) => {
	if (array?.includes(item)) {
		return array?.filter((e) => e !== item);
	}
	return [...array, item];
};
