export type ILoginType = {
	data: {
		email: null;
		password: null;
	};
	error: {
		email: boolean;
		password: boolean;
	};
};

export type LoginActionType =
	| { type: 'INPUT'; payload: any }
	| { type: 'RESET'; payload: any };
export const initialState: ILoginType = {
	data: {
		email: null,
		password: null,
	},
	error: {
		email: false,
		password: false,
	},
};

export const reducer = (state = initialState, action: LoginActionType) => {
	switch (action.type) {
		case 'INPUT':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.name]: action.payload.value
						? action.payload.value.trim()
						: null,
				},
				error: {
					...state.error,
					[action.payload.name]:
						action.payload.value === null || action.payload.value === ''
							? true
							: false,
				},
			};

		case 'RESET':
			return initialState;

		default:
			return state;
	}
};
