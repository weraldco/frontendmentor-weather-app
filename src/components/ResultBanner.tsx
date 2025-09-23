import { getWeatherIcon } from '../utils/functions';

type ResultBannerT = {
	city: string;
	country: string;
	time: Date;
	temp: number;
	weatherCode: number;
};

const ResultBanner = ({
	city,
	country,
	time,
	temp,
	weatherCode,
}: ResultBannerT) => {
	return (
		<section className="w-full">
			<figure className="bg-[url(/images/bg-today-large.svg)] bg-contain w-full h-[320px]">
				{city && country && time && temp ? (
					<figcaption className="flex flex-row items-center justify-between w-full h-full p-8">
						<div>
							<h2 className="text-3xl font-bold">
								{city}, {country}
							</h2>
							<p className="text-xl">
								{new Date(time).toLocaleDateString('en-EN', {
									day: '2-digit',
									month: 'short',
									year: 'numeric',
									weekday: 'long',
								})}
							</p>
						</div>
						<div className="flex flex-row items-center">
							<div className="w-40 h-40">
								<img src={getWeatherIcon(weatherCode)} alt="Icon" />
							</div>
							<p className="text-8xl font-semibold italic">{temp}°</p>
						</div>
					</figcaption>
				) : (
					''
				)}
			</figure>
		</section>
	);
};

export default ResultBanner;
