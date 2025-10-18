import { useEffect, useState } from 'react';
import type { HourlyT } from '../features/weather/weatherSlice';
import { getWeatherIcon } from '../utils/functions';

type HourlyTS = {
	time: string;
	temp: number;
	weather_code: number;
};

type HourlyForecastT = {
	day: string;
	data?: HourlyT;
	setDay: (d: string) => void;
};
const HourlyForecast = ({ day, data, setDay }: HourlyForecastT) => {
	const [isOption, setIsOption] = useState(false);
	const [hourlyData, setHourlyData] = useState<HourlyTS[]>(
		new Array(24).fill('')
	);
	useEffect(() => {
		if (!data || !day) return;

		const filtered = data?.time.reduce<HourlyTS[]>((acc, d, i) => {
			const week = new Date(d).toLocaleDateString('en-US', {
				weekday: 'long',
			});
			if (week === day) {
				acc.push({
					time: data.time[i],
					temp: data.temperature_2m[i],
					weather_code: data.weather_code[i],
				});
			}
			return acc;
		}, []);

		setHourlyData(filtered);
	}, [day, data]);

	const days = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	];
	return (
		<div className="flex flex-col rounded-xl gap-4 h-full">
			<div className="flex flex-row justify-between w-full items-center pt-6 px-6">
				<h2 className="text-lg font-bold">Hourly forecast</h2>
				<div className="flex gap-4 flex-col relative">
					<button
						type="button"
						className="flex flex-row gap-4 bg-[var(--neutral-600)] py-2 px-4 rounded-xl cursor-pointer"
						onClick={() => setIsOption((prev) => !prev)}
					>
						<p>{day !== 'Invalid Date' ? day : '—'}</p>
						<img src="/images/icon-dropdown.svg" alt="Dropdown" />
					</button>
					{isOption && day !== 'Invalid Date' && (
						<div className="p-2 bg-[var(--neutral-200)] rounded-xl absolute top-12">
							<ul>
								{days.map((d, i) => (
									<li
										key={i}
										onClick={() => {
											setDay(d);
											setIsOption(false);
										}}
									>
										{d}
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
			<div className="grid gap-4 h-[750px] p-6 pt-2 overflow-y-scroll scrollbar-custom ">
				{hourlyData.map((h, i) => (
					<HourForecastItem
						key={i}
						icon={getWeatherIcon(h.weather_code)}
						time={new Date(h.time).toLocaleTimeString('en-EN', {
							hour: 'numeric',
						})}
						temp={h.temp}
					/>
				))}
			</div>
		</div>
	);
};

export default HourlyForecast;

const HourForecastItem = ({
	icon,
	time,
	temp,
}: {
	icon: string;
	time: string;
	temp: number;
}) => {
	return (
		<section className="px-2 rounded-xl bg-[var(--neutral-600)] flex flex-row items-center justify-between w-full h-17">
			{icon && time && temp && (
				<>
					<figure className="flex flex-row items-center gap-4">
						<div className="h-14 w-14">
							<img src={icon} alt={`${icon} weather Icon`} className="h-full" />
						</div>
						<figcaption>{time}</figcaption>
					</figure>
					<div>{temp} °</div>
				</>
			)}
		</section>
	);
};
