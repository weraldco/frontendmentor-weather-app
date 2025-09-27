type WeatherDetailsT = {
	feelsLike: number;
	humidity: number;
	wind: number;
	precipitation: number;
};
const WeatherDetails = ({
	feelsLike,
	humidity,
	wind,
	precipitation,
}: WeatherDetailsT) => {
	return (
		<section className="w-full flex flex-row gap-6 items-center justify-between h-full">
			<WeatherDetail title="Feels Like" detail={feelsLike} label="°" />
			<WeatherDetail title="Humidity" detail={humidity} label="%" />
			<WeatherDetail title="Wind" detail={wind} label="km/H" />
			<WeatherDetail title="Precipitation" detail={precipitation} label="in" />
		</section>
	);
};

export default WeatherDetails;

const WeatherDetail = ({
	title,
	detail,
	label,
}: {
	title: string;
	detail: number;
	label: string;
}) => {
	return (
		<div className="p-4 bg-[var(--neutral-700)] rounded-2xl w-full flex flex-col gap-4 h-full">
			<h2 className="text-base">{title}</h2>
			{detail != -1 && label ? (
				<p className="text-2xl">
					{detail} {label}
				</p>
			) : (
				'—'
			)}
		</div>
	);
};
