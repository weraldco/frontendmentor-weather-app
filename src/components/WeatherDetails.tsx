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
		<section className="w-full flex flex-row gap-8 items-center justify-between">
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
		<div className="p-4 bg-[var(--neutral-700)] rounded-2xl w-full flex flex-col gap-4">
			<h2>{title}</h2>
			<p className="text-3xl">
				{detail} {label}
			</p>
		</div>
	);
};
