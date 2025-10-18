/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
export interface DailyT {
	sunrise: string[];
	sunset: string[];
	temperature_2m_max: number[];
	temperature_2m_min: number[];
	time: string[];
	weather_code: number[];
}

export interface HourlyT {
	temperature_2m: number[];
	time: string[];
	weather_code: number[];
}
export interface WeatherData {
	city: string;
	country: string;
	forecast: {
		current: {
			apparent_temperature: number;
			precipitation: number;
			relative_humidity_2m: number;
			temperature_2m: number;
			time: string;
			weather_code: number;
			wind_direction_10m: number;
			wind_gusts_10m: number;
			wind_speed_10m: number;
		};
		current_units: {
			apparent_temperature: string;
			interval: string;
			is_day: string;
			precipitation: string;
			relative_humidity_2m: string;
			temperature_2m: string;
			time: string;
			weather_code: string;
			wind_direction_10m: string;
			wind_gusts_10m: string;
			wind_speed_10m: string;
		};
		daily: DailyT;
		hourly: HourlyT;
	};
}

interface WeatherState {
	data: WeatherData | null;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
	loading: true | false;
}

const initialState: WeatherState = {
	data: null,
	status: 'idle',
	error: null,
	loading: false,
};

// export const fetchWeatherData = createAsyncThunk<
// 	WeatherData,
// 	void,
// 	{ rejectValue: string }
// >('weather/fetchWeatherData', async (_, thunkAPI) => {
// 	try {
// 		const res = await fetch(
// 			'https://api.open-meteo.com/v1/forecast?latitude=51.5&longitude=10.5&daily=weather_code,sunset,sunrise,wind_speed_10m_max,wind_gusts_10m_max,temperature_2m_min,temperature_2m_max&hourly=temperature_2m&current=temperature_2m,is_day,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation'
// 		);
// 		if (!res.ok) return thunkAPI.rejectWithValue('Network response was not ok');

// 		const data = (await res.json()) as WeatherData;
// 		return data;
// 	} catch (err) {
// 		return thunkAPI.rejectWithValue('Fetch failed');
// 	}
// });

export const fetachWeatherByCoords = createAsyncThunk(
	'weather/fetchByCoords',
	async (
		{
			lat,
			lon,
			units,
		}: {
			lat: number;
			lon: number;
			units: { temperature: string; wind: string; precipitation: string };
		},
		thunkAPI
	) => {
		try {
			const { temperature, wind, precipitation } = units;
			const locResult = await fetch(
				`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
			);

			const locData = await locResult.json();
			console.log('locData', locData);
			const res = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,sunset,sunrise,temperature_2m_min,temperature_2m_max&hourly=temperature_2m,weather_code&current=temperature_2m,is_day,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,weather_code&temperature_unit=${temperature}&wind_speed_unit=${wind}&precipitation_unit=${precipitation}`
			);
			if (!res.ok)
				return thunkAPI.rejectWithValue('Network response was not ok');

			const data = (await res.json()) as WeatherData;
			return {
				city: locData.city,
				country: locData.countryName.replace(/\s*\(the\)/i, '').trim(),
				forecast: data,
			};
		} catch (error) {
			return thunkAPI.rejectWithValue('Fetch failed');
		}
	}
);

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
			state.loading = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetachWeatherByCoords.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(
				fetachWeatherByCoords.fulfilled,
				(state, action: PayloadAction<any>) => {
					(state.status = 'succeeded'), (state.data = action.payload);
				}
			)
			.addCase(fetachWeatherByCoords.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			});

		builder
			.addCase(fetchWeatherByCity.pending, (state) => {
				state.status = 'loading';
				state.error = null;
				state.loading = true;
			})
			.addCase(
				fetchWeatherByCity.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.status = 'succeeded';
					state.data = action.payload;
					state.loading = false;
				}
			)
			.addCase(fetchWeatherByCity.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
				state.loading = false;
			});
	},
});

export default weatherSlice.reducer;

//Optional selector
export const selectAllWeather = (state: RootState) => state.weather.data;

export const { clearWeatherData } = weatherSlice.actions;
