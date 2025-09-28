import type { DailyT } from '../features/weather/weatherSlice';
import { getWeatherIcon } from '../utils/functions';

type DailyForecast = {
	data?: DailyT;
};
const DailyForecast = ({ data }: DailyForecast) => {
	return (
		<section className="w-full h-full flex flex-col gap-4 ">
			<h1 className="text-xl font-semibold">Daily forecast</h1>
			<div className="flex flex-row gap-4 items-center justify-between   h-full ">
				{(data?.time ? data.time : new Array(7).fill('')).map((d, i) => (
					<DayForecast
						day={new Date(d).toLocaleDateString('en-EN', { weekday: 'short' })}
						icon={getWeatherIcon(data?.weather_code[i] ?? -1)}
						maxTemp={data?.temperature_2m_max[i] ?? -1}
						minTemp={data?.temperature_2m_min[i] ?? -1}
					></DayForecast>
				))}
			</div>
		</section>
	);
};

export default DailyForecast;

const DayForecast = ({
	day,
	icon,
	maxTemp,
	minTemp,
}: {
	day: string;
	icon: string;
	maxTemp: number;
	minTemp: number;
}) => {
	return (
		<div className="w-full bg-[var(--neutral-700)] rounded-xl p-2 h-full justify-between items-center flex flex-col">
			{day && icon && maxTemp && minTemp ? (
				<>
					<h2 className="text-center">{day}</h2>
					<div className=" flex items-center justify-center h-18">
						{icon && (
							<img src={icon} alt={day} className="h-full object-fill " />
						)}
					</div>
					<div className="flex flex-row justify-between items-center gap-6 text-sm">
						<p>{maxTemp}°</p>
						<p>{minTemp}°</p>
					</div>
				</>
			) : (
				''
			)}
		</div>
	);
};
