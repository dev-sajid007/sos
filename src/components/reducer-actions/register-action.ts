export type ActionType =
	| { type: 'INPUT'; payload: any }
	| { type: 'PASSWORD_MATCH'; payload: any }
	| { type: 'API_ERROR'; payload: any }
	| { type: 'RESET'; payload: any };

export interface IInitialState {
	data: {
		password: null;
		name: null;
		email: null;
		number: null;
		c_password: null;
		role: string;
		agree: boolean;
	};
	error: {
		password: boolean;
		c_password: boolean;
		name: boolean;
		email: boolean;
		number: boolean;
		agree: boolean;
	};
	password_match: boolean;
	resError: {
		email: null;
		name: null;
		number: null;
	};
}
export const initialState: IInitialState = {
	data: {
		password: null,
		name: null,
		email: null,
		number: null,
		c_password: null,
		role: '4',
		agree: false,
	},
	error: {
		password: false,
		c_password: false,
		name: false,
		email: false,
		number: false,
		agree: true,
	},
	password_match: true,
	resError: {
		email: null,
		name: null,
		number: null,
	},
};

export const reducer = (state = initialState, action: ActionType) => {
	switch (action.type) {
		case 'INPUT':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.name]: action.payload.value,
				},
				error: {
					...state.error,
					[action.payload.name]:
						action.payload.value === null ||
						action.payload.value === '' ||
						action.payload.value === false
							? true
							: false,
				},
				password_match:
					action.payload.name === 'c_password' ||
					action.payload.name === 'password'
						? true
						: true,

				resError: {
					...state.resError,
					[action.payload.name]: null,
				},
			};

		case 'RESET':
			return initialState;
		case 'PASSWORD_MATCH':
			return {
				...state,
				password_match: false,
			};
		case 'API_ERROR':
			return {
				...state,
				resError: {
					...state.resError,
					...action.payload,
				},
			};

		default:
			return state;
	}
};
