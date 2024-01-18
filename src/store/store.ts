import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './feature/counter/counterSlice';
// ...

// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './feature/api/api';

export const store = configureStore({
	reducer: {
		counter: counterSlice,

		// Add the generated reducer as a specific top-level slice
		[api.reducerPath]: api.reducer,
	},
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
