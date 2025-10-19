type WeatherDetailsT = {
	feelsLike?: number;
	humidity?: number;
	wind?: number;
	precipitation?: number;
	windLabel?: string;
	precipitationLabel?: string;
};
const WeatherDetails = ({
	feelsLike,
	humidity,
	wind,
	precipitation,
	windLabel,
	precipitationLabel,
}: WeatherDetailsT) => {
	return (
		<section className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-between h-full">
			<WeatherDetail title="Feels Like" detail={feelsLike ?? -1} label="°" />
			<WeatherDetail
				title="Humidity"
				detail={humidity ?? -1}
				label={humidity ? '%' : '-'}
			/>
			<WeatherDetail title="Wind" detail={wind ?? 0} label={windLabel ?? ''} />
			<WeatherDetail
				title="Precipitation"
				detail={precipitation ?? 0}
				label={precipitationLabel ?? ''}
			/>
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
		<div className="p-4 bg-[var(--neutral-700)] rounded-2xl w-full flex flex-col gap-4 ">
			<h2 className="text-base">{title}</h2>
			{detail != -1 && label ? (
				<p className="text-3xl">
					{detail} {label}
				</p>
			) : (
				'—'
			)}
		</div>
	);
};
