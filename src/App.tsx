import { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hook';
import HourlyForecast from './components/ HourlyForecast';
import APIErrorState from './components/APIErrorState';
import DailyForecast from './components/DailyForecast';
import Header from './components/Header';
import Hero from './components/Hero';
import ResultBanner from './components/ResultBanner';
import Search from './components/Search';
import WeatherDetails from './components/WeatherDetails';
import {
	clearWeatherData,
	fetchWeatherByCity,
	selectAllWeather,
} from './features/weather/weatherSlice';

function App() {
	const status = useAppSelector((s) => s.weather.status);
	const weather = useAppSelector(selectAllWeather);
	const dispatch = useAppDispatch();
	const [city, setCity] = useState('');
	const [day, setDay] = useState('-');
	const [error, setError] = useState('');
	const [temperatureUnit, setTemperatureUnit] = useState('celsius');
	const [windUnit, setWindUnit] = useState('kmh');
	const [precipitationUnit, setPrecipitationUnit] = useState('mm');
	useEffect(() => {
		const time = weather?.forecast?.current?.time;
		if (time) {
			setDay(new Date(time).toLocaleDateString('en-EN', { weekday: 'long' }));
		}
	}, [weather]);
	console.log(status);
	useEffect(() => {
		dispatch(
			fetchWeatherByCity({
				city: city || 'Berlin',
				units: {
					temperature: temperatureUnit,
					wind: windUnit,
					precipitation: precipitationUnit,
				},
			})
		);
	}, [city, dispatch, precipitationUnit, temperatureUnit, windUnit]);

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

	console.log('CN', cityName);
	const handleSearch = () => {
		clearWeatherData();
		console.log('clear', weather);
		if (!city) setError('All fields are required!');

		dispatch(fetchWeatherByCity(city));
		setCity('');
	};
	console.log('Weather', weather);

	const handleChangeUnit = () => {
		setTemperatureUnit(temperatureUnit == 'celsius' ? 'fahrenheit' : 'celsius');
		setWindUnit(windUnit == 'kmh' ? 'mph' : 'kmh');
		setPrecipitationUnit(precipitationUnit == 'mm' ? 'inch' : 'mm');
	};

	return (
		<div className=" h-screen w-full max-w-[1440px]  grid grid-rows-[auto_auto_3fr_50px] mx-auto font-sans gap-12 ">
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
					/>
				</section>
			)}
			{status !== 'failed' ? (
				<main className="grid grid-cols-[2fr_1fr] gap-8 ">
					<article className=" grid grid-rows-[auto_150px_300px] gap-8">
						<section className="bg-[var(--neutral-700)] rounded-2xl">
							<ResultBanner
								city={cityName}
								country={country}
								time={time}
								temp={temp}
								weatherCode={weatherCode}
							/>
						</section>
						<section className=" rounded-2xl">
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
			<footer className="attribution ">
				Challenge by
				<a href="https://www.frontendmentor.io?ref=challenge">
					Frontend Mentor
				</a>
				. Coded by <a href="#">Your Name Here</a>.
			</footer>
			{/* <section className="w-[1440px] grid gap-8 ">
				<Header />

				<section className=" bg-amber-400 ">
					<Hero />
					<Search
						city={city}
						setCity={setCity}
						handleSearch={handleSearch}
						error={error}
					/>
				</section>
				<section className="bg-amber-300">
					<div className=" bg-amber-500">
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

					<div className=" bg-amber-700">
						<HourlyForecast
							day={day}
							data={weather?.forecast?.hourly}
							setDay={setDay}
						/>
					</div>
				</section>

				<div className="attribution bg-amber-300">
					Challenge by
					<a href="https://www.frontendmentor.io?ref=challenge">
						Frontend Mentor
					</a>
					. Coded by <a href="#">Your Name Here</a>.
				</div>
			</section> */}
		</div>
	);
}

export default App;
