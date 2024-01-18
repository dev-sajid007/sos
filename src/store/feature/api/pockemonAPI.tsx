import { api } from './api';

export const pockemonAPI = api.injectEndpoints({
	endpoints: (builder) => ({
		// getPokemonByName: builder.query({
		// 	query: (name) => `pokemon`,
		// }),
	}),
});

// export const { useGetPokemonByNameQuery } = pockemonAPI;
