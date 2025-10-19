import React, { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hook';
import APIErrorState from './components/APIErrorState';
import Header from './components/Header';
import Hero from './components/Hero';
import ResultBanner from './components/ResultBanner';
import Search from './components/Search';
import WeatherDetails from './components/WeatherDetails';
import {
	clearWeatherData,
	fetachWeatherByCoords,
	fetchWeatherByCity,
	selectAllWeather,
} from './features/weather/weatherSlice';
const DailyForecast = React.lazy(() => import('./components/DailyForecast'));
const HourlyForecast = React.lazy(() => import('./components/ HourlyForecast'));

function App() {
	const status = useAppSelector((s) => s.weather.status);
	const loading = useAppSelector((s) => s.weather.loading);
	const weather = useAppSelector(selectAllWeather);
	const dispatch = useAppDispatch();
	const [city, setCity] = useState('');
	const [day, setDay] = useState('-');
	const [error, setError] = useState('');
	const [temperatureUnit, setTemperatureUnit] = useState('celsius');
	const [windUnit, setWindUnit] = useState('kmh');
	const [precipitationUnit, setPrecipitationUnit] = useState('mm');
	const [location, setLocation] = useState<{
		lat: number | null;
		lon: number | null;
	}>({ lat: null, lon: null });
	// const [loading, setLoading] = useState(false);

	useEffect(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					setLocation({
						lat: pos.coords.latitude,
						lon: pos.coords.longitude,
					});
				},
				(err) => {
					setError(err.message);
				}
			);
		} else {
			setError('Geolocation not supported');
		}
	}, []);
	useEffect(() => {
		const time = weather?.forecast?.current?.time;
		if (time) {
			setDay(new Date(time).toLocaleDateString('en-EN', { weekday: 'long' }));
		}
	}, [weather]);
	console.log(status);
	useEffect(() => {
		if (location.lat !== null && location.lon !== null) {
			dispatch(
				fetachWeatherByCoords({
					lat: location.lat,
					lon: location.lon,
					units: {
						temperature: temperatureUnit,
						wind: windUnit,
						precipitation: precipitationUnit,
					},
				})
			);
		}
	}, [
		dispatch,
		location.lat,
		location.lon,
		precipitationUnit,
		temperatureUnit,
		windUnit,
	]);

	const cityName = weather?.city;
	const country = weather?.country;
	const time = weather?.forecast?.current?.time;
	const temp = weather?.forecast?.current?.temperature_2m;
	const weatherCode = weather?.forecast?.current?.weather_code;
	const feelsLike = weather?.forecast?.current?.apparent_temperature;
	const humidity = weather?.forecast?.current?.relative_humidity_2m;
	const wind = weather?.forecast?.current?.wind_speed_10m;
	const windLabel = weather?.forecast?.current_units?.wind_speed_10m;
	const precipitation = weather?.forecast?.current?.precipitation;
	const precipitationLabel = weather?.forecast?.current_units?.precipitation;
	console.log('loading', loading);

	const handleSearch = async () => {
		clearWeatherData();
		setError('');

		if (!city) {
			setError('All fields are required!');
			return;
		}

		dispatch(
			fetchWeatherByCity({
				city: city,
				units: {
					temperature: temperatureUnit,
					wind: windUnit,
					precipitation: precipitationUnit,
				},
			})
		);
	};

	console.log('Weather', weather);

	const handleChangeUnit = () => {
		setTemperatureUnit(temperatureUnit == 'celsius' ? 'fahrenheit' : 'celsius');
		setWindUnit(windUnit == 'kmh' ? 'mph' : 'kmh');
		setPrecipitationUnit(precipitationUnit == 'mm' ? 'inch' : 'mm');
	};

	return (
		<div className=" h-screen w-full max-w-[1440px]  grid grid-rows-[auto_auto_3fr_50px] mx-auto font-sans gap-8 px-4">
			<Header
				temperature={temperatureUnit}
				setTemperature={setTemperatureUnit}
				wind={windUnit}
				setWind={setWindUnit}
				precipitation={precipitationUnit}
				setPrecipitation={setPrecipitationUnit}
				handleClick={handleChangeUnit}
			/>
			{status !== 'failed' && (
				<section className="flex flex-col justify-center gap-12 ">
					<Hero />
					<Search
						city={city}
						setCity={setCity}
						handleSearch={handleSearch}
						error={error}
						loading={loading}
					/>
				</section>
			)}
			{status !== 'failed' ? (
				<main className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 ">
					<article className=" grid grid-rows-[auto_auto_auto] gap-8">
						<section className="bg-[var(--neutral-700)] rounded-2xl">
							<ResultBanner
								city={cityName}
								country={country}
								time={time}
								temp={temp}
								weatherCode={weatherCode ?? 0}
								loading={loading}
							/>
						</section>
						<section className="rounded-2xl">
							<WeatherDetails
								feelsLike={feelsLike}
								humidity={humidity}
								wind={wind}
								precipitation={precipitation}
								windLabel={windLabel}
								precipitationLabel={precipitationLabel}
							/>
						</section>
						<section className=" rounded-2xl">
							<DailyForecast data={weather?.forecast?.daily} />
						</section>
					</article>
					<aside className="bg-[var(--neutral-700)] h-full grid  rounded-2xl ">
						<HourlyForecast
							day={day}
							data={weather?.forecast?.hourly}
							setDay={setDay}
						/>
					</aside>
				</main>
			) : (
				<APIErrorState />
			)}
			{/* <Test /> */}
			<footer className="flex w-full flex-col lg:flex-row justify-center items-center text-sm">
				<div>
					<span className="text-neutral-500">Challenge by </span>
					<a
						href="https://www.frontendmentor.io?ref=challenge"
						className="hover:text-amber-200 duration-200"
					>
						Frontend Mentor
					</a>
				</div>
				<div className="div">
					<span className="text-neutral-500">Coded by </span>
					<a
						href="https://github.com/weraldco"
						className="hover:text-amber-200 duration-200"
					>
						Werald Opolento
					</a>
					.
				</div>
			</footer>
		</div>
	);
}

export default App;
