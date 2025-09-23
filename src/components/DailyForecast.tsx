import { getWeatherIcon } from '../utils/functions';

type DailyForecast = {
	sunrise: string[];
	sunset: string[];
	temperature_2m_max: number[];
	temperature_2m_min: number[];
	time: string[];
	weather_code: number[];
};
const DailyForecast = ({ data }: { data: DailyForecast }) => {
	return (
		<section className="w-full flex flex-col gap-4  bg-amber-500">
			<h1 className="text-xl font-semibold">Daily forecast</h1>
			<div className="flex flex-row gap-4 items-center justify-between">
				{data?.time.map((d, i) => (
					<DayForecast
						day={new Date(d).toLocaleDateString('en-EN', { weekday: 'short' })}
						icon={getWeatherIcon(data?.weather_code[i])}
						maxTemp={data?.temperature_2m_max[i]}
						minTemp={data?.temperature_2m_min[i]}
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
		<div className="w-full bg-green-600 rounded-xl p-2 h-[200px] justify-center items-center">
			<h2 className="text-center">{day}</h2>
			<div className="bg-red-300 flex items-center justify-center h-18">
				{icon && (
					<img
						src={icon}
						alt={day}
						className="h-full object-fill bg-amber-300"
					/>
				)}
			</div>
			<div className="flex flex-row justify-between items-center gap-6 text-sm">
				<p>{maxTemp}°</p>
				<p>{minTemp}°</p>
			</div>
		</div>
	);
};
