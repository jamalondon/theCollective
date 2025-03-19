import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// You can add more reducers here as your app grows
const store = configureStore({
	reducer: {
		user: userReducer,
		// products: productsReducer,
		// cart: cartReducer,
		// etc.
	},
	// Optional middleware configuration if needed
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
