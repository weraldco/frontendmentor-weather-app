import { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hook';
import HourlyForecast from './components/ HourlyForecast';
import DailyForecast from './components/DailyForecast';
import Header from './components/Header';
import Hero from './components/Hero';
import ResultBanner from './components/ResultBanner';
import Search from './components/Search';
import WeatherDetails from './components/WeatherDetails';
import {
	fetchWeatherByCity,
	selectAllWeather,
} from './features/weather/weatherSlice';

function App() {
	const status = useAppSelector((s) => s.weather.status);
	const weather = useAppSelector(selectAllWeather);
	const dispatch = useAppDispatch();
	const [city, setCity] = useState('');
	const [day, setDay] = useState('Tuesday');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (status == 'idle') dispatch(fetchWeatherByCity('Berlin'));
	}, [city, dispatch, status]);
	const cityName = weather?.city;
	const country = weather?.country;
	const time = weather?.forecast?.current?.time;
	const temp = weather?.forecast?.current?.temperature_2m;
	const weatherCode = weather?.forecast?.current?.weather_code;
	const feelsLike = weather?.forecast?.current?.apparent_temperature;
	const humidity = weather?.forecast?.current?.relative_humidity_2m;
	const wind = weather?.forecast?.current?.wind_speed_10m;
	const precipitation = weather?.forecast?.current?.precipitation;

	const handleSearch = () => {
		if (!city) setError('All fields are required!');
		dispatch(fetchWeatherByCity(city));
		setCity('');
	};
	console.log(weather);
	console.log(city);
	return (
		<main className=" w-full flex flex-col items-center justify-center">
			<section className="w-full max-w-[1280px] items-center justify-center flex flex-col gap-12">
				<Header />

				<section className="flex w-full flex-col items-center justify-center gap-12">
					<Hero />
					<Search
						city={city}
						setCity={setCity}
						handleSearch={handleSearch}
						error={error}
					/>
				</section>
				<section className="flex flex-row gap-8">
					<div className="flex flex-col gap-8">
						<ResultBanner
							city={cityName}
							country={country}
							time={time}
							temp={temp}
							weatherCode={weatherCode}
						/>
						<WeatherDetails
							feelsLike={feelsLike}
							humidity={humidity}
							wind={wind}
							precipitation={precipitation}
						/>
						<DailyForecast data={weather?.forecast?.daily} />
					</div>

					<div className="w-full flex-1">
						<HourlyForecast
							day={day}
							data={weather?.forecast?.hourly}
							setDay={setDay}
						/>
					</div>
				</section>

				<div className="attribution">
					Challenge by
					<a href="https://www.frontendmentor.io?ref=challenge">
						Frontend Mentor
					</a>
					. Coded by <a href="#">Your Name Here</a>.
				</div>
			</section>
		</main>
	);
}

export default App;
