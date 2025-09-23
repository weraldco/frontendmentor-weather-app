import { useEffect, useState } from 'react';
import { getWeatherIcon } from '../utils/functions';

type HourlyT = {
	temperature_2m: number[];
	time: string[];
	weather_code: number[];
};

type HourlyTS = {
	time: string;
	temp: number;
	weather_code: number;
};

type HourlyForecastT = {
	day: string;
	data: HourlyT[];
};
const HourlyForecast = ({ day, data, setDay }: HourlyForecastT) => {
	const [isOption, setIsOption] = useState(false);
	const [hourlyData, setHourlyData] = useState<HourlyTS[]>([]);
	useEffect(() => {
		if (!data || !day) return;

		const filtered = data?.time.reduce((acc, d, i) => {
			const week = new Date(d).toLocaleDateString('en-US', { weekday: 'long' });
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
		<section>
			<div className="flex flex-col p-6 bg-[var(--neutral-700)] rounded-xl overflow-x-scroll scrollbar-hide gap-4">
				<div className="flex flex-row justify-between w-full items-center">
					<h2 className="text-lg font-bold">Hourly forecast</h2>
					<div className="flex gap-4 flex-col relative">
						<button
							type="button"
							className="flex flex-row gap-4 bg-[var(--neutral-600)] py-2 px-4 rounded-xl cursor-pointer"
							onClick={() => setIsOption((prev) => !prev)}
						>
							<p>{day}</p>
							<img src="/images/icon-dropdown.svg" alt="Dropdown" />
						</button>
						{isOption && (
							<div className="p-2 bg-[var(--neutral-200)] rounded-xl absolute top-12">
								<ul>
									{days.map((d) => (
										<li
											key={d}
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
				<div className="flex flex-col gap-4">
					{hourlyData?.map((h) => (
						<HourForecastItem
							icon={getWeatherIcon(h.weather_code)}
							time={new Date(h.time).toLocaleTimeString('en-EN', {
								hour: 'numeric',
							})}
							temp={h.temp}
						/>
					))}
				</div>
			</div>
		</section>
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
		<section className="px-2 rounded-xl bg-[var(--neutral-600)] flex flex-row items-center justify-between w-full">
			<figure className="flex flex-row items-center gap-4">
				<div className="h-14 w-14">
					<img src={icon} alt="Icon" className="h-full" />
				</div>
				<figcaption>{time}</figcaption>
			</figure>
			<div>{temp} °</div>
		</section>
	);
};
