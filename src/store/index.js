import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import eventsReducer from './eventSlice';
import themeReducer from './themeSlice';

// You can add more reducers here as your app grows
const store = configureStore({
	reducer: {
		user: userReducer,
		events: eventsReducer,
		theme: themeReducer,
		// products: productsReducer,
		// cart: cartReducer,
		// etc.
	},
	// Optional middleware configuration if needed
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
