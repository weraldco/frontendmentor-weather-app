import { memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hook';
import {
	fetchWeatherByCity,
	fetchWeatherData,
	selectAllWeather,
} from '../features/weather/weatherSlice';

const WeatherData = memo(() => {
	const weather = useAppSelector(selectAllWeather);
	console.log('WeatherList Rendered');
	console.log(weather);

	return <div>Test</div>;
});

const Weather = () => {
	const status = useAppSelector((s) => s.weather.status);
	const dispatch = useAppDispatch();
	const [city, setCity] = useState<string>('');

	// Use memo this to prevent rerender
	useEffect(() => {
		if (status == 'idle') dispatch(fetchWeatherData());
	}, [status, dispatch]);

	if (status === 'loading') return <p>Loading..</p>;
	if (status === 'failed') return <p>Failed to load data</p>;
	// console.log(weather);

	const handleClick = (city: string) => {
		if (city.trim()) {
			dispatch(fetchWeatherByCity(city));
		}
	};

	return (
		<section>
			<div className="flex flex-row items-center gap-4">
				<label htmlFor="city">City: </label>
				<input
					type="text"
					id="city"
					value={city}
					className="border-2 border-white rounded-lg py-2 px-4"
					placeholder="City name.."
					onChange={(e) => setCity(e.target.value)}
				/>
				<button
					className="bg-blue-500 rounded-lg hover:bg-blue-400 duration-200 py-2 px-4"
					onClick={() => handleClick(city)}
				>
					Search
				</button>

				<WeatherData />
			</div>
		</section>
	);
};

export default Weather;
