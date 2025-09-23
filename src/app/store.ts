import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlicer';
import weatherReducer from '../features/weather/weatherSlice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		weather: weatherReducer,
	},
});

// Infer types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
