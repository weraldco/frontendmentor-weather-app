/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface Weather {
	weatherResult: [];
}

interface WeatherState {
	data: [] | null;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

const initialState: WeatherState = {
	data: null,
	status: 'idle',
	error: null,
};

export const fetchWeatherData = createAsyncThunk<
	Weather[],
	void,
	{ rejectValue: string }
>('weather/fetchWeatherData', async (_, thunkAPI) => {
	try {
		const res = await fetch(
			'https://api.open-meteo.com/v1/forecast?latitude=51.5&longitude=10.5&daily=weather_code,sunset,sunrise,wind_speed_10m_max,wind_gusts_10m_max,temperature_2m_min,temperature_2m_max&hourly=temperature_2m&current=temperature_2m,is_day,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation'
		);
		if (!res.ok) return thunkAPI.rejectWithValue('Network response was not ok');

		const data = (await res.json()) as Weather[];
		return data;
	} catch (err) {
		return thunkAPI.rejectWithValue('Fetch failed');
	}
});

export const fetchWeatherByCity = createAsyncThunk(
	'weather/fetchByCity',
	async (
		{
			city,
			units,
		}: {
			city: string;
			units: { temperature: string; wind: string; precipitation: string };
		},

		thunkAPI
	) => {
		try {
			const geoRes = await fetch(
				`https://geocoding-api.open-meteo.com/v1/search?name=${city}`
			);
			const geoData = await geoRes.json();
			if (!geoData) return thunkAPI.rejectWithValue('City not found');
			const place = geoData.results[0];

			const { temperature, wind, precipitation } = units;

			const weatherRes = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&daily=weather_code,sunset,sunrise,temperature_2m_min,temperature_2m_max&hourly=temperature_2m,weather_code&current=temperature_2m,is_day,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,weather_code&temperature_unit=${temperature}&wind_speed_unit=${wind}&precipitation_unit=${precipitation}`
			);

			const weatherData = await weatherRes.json();
			return {
				city: place.name,
				country: place.country,
				forecast: weatherData,
			};
		} catch (error) {
			return thunkAPI.rejectWithValue('Fetch failed');
		}
	}
);

const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {
		clearWeatherData(state) {
			state.data = null;
			state.status = 'idle';
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWeatherData.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(
				fetchWeatherData.fulfilled,
				(state, action: PayloadAction<any>) => {
					(state.status = 'succeeded'), (state.data = action.payload);
				}
			)
			.addCase(fetchWeatherData.rejected, (state, action) => {
				(state.status = 'failed'),
					(state.error = action.payload ?? 'Unkown error');
			});

		builder
			.addCase(fetchWeatherByCity.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(
				fetchWeatherByCity.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.status = 'succeeded';
					state.data = action.payload;
				}
			)
			.addCase(fetchWeatherByCity.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			});
	},
});

export default weatherSlice.reducer;

//Optional selector
export const selectAllWeather = (state: RootState) => state.weather.data;

export const { clearWeatherData } = weatherSlice.actions;
