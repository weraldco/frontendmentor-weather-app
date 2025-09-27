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
	if (!city || !country || !time || !temp || !weatherCode)
		return (
			<div className=" h-full grid place-items-center">
				<div className="flex flex-col gap-4 items-center">
					<img
						src="/images/icon-loading.svg"
						alt="Loading Logo"
						className="w-10 animate-spin [animation-duration:2s]"
					/>
					<span>Loading..</span>
				</div>
			</div>
		);
	return (
		<section className="w-full h-full  rounded-2xl">
			<figure className="bg-[url(/images/bg-today-large.svg)] bg-no-repeat bg-cover bg-center w-full h-full rounded-2xl">
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
