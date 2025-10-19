import { getWeatherIcon } from '../utils/functions';

type ResultBannerT = {
	city?: string;
	country?: string;
	time?: string;
	temp?: number;
	weatherCode: number;
	loading: boolean;
};

const ResultBanner = ({
	city,
	country,
	time,
	temp,
	weatherCode,
	loading,
}: ResultBannerT) => {
	if (!city || !country || !time || !temp || loading)
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
		<section className="w-full h-full rounded-2xl">
			<figure className="bg-[url(/images/bg-today-small.svg)] lg:bg-[url(/images/bg-today-large.svg)] bg-no-repeat bg-cover bg-center w-full h-full rounded-2xl">
				{city && country && time && temp ? (
					<figcaption className=" flex flex-col lg:flex-row items-center justify-between h-full px-6 py-10">
						<div className="text-center lg:text-start">
							<h2 className="text-2xl lg:text-3xl font-bold ">
								{city}, {country}
							</h2>
							<p className="text-xl ">
								{new Date(time).toLocaleDateString('en-EN', {
									day: '2-digit',
									month: 'short',
									year: 'numeric',
									weekday: 'long',
								})}
							</p>
						</div>
						<div className="flex flex-row items-center ">
							<div className=" lg:h-40 lg:w-40 flex items-center">
								<img
									src={getWeatherIcon(weatherCode)}
									alt="todays weather icon"
								/>
							</div>
							<p className="text-7xl lg:text-8xl font-semibold italic">
								{temp}°
							</p>
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
