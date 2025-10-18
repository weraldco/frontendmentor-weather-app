import { useEffect, useState } from 'react';
import VoiceButton from './VoiceButton';

const Search = ({
	city,
	setCity,
	handleSearch,
	error,
	loading,
}: {
	city: string;
	setCity: (e: string) => void;
	handleSearch: (city: string) => void;
	error: string;
	loading: boolean;
}) => {
	const [results, setResults] = useState<string[]>([]);

	const SpeechRecognition =
		window.SpeechRecognition || window.webkitSpeechRecognition;

	const recognition = new SpeechRecognition();
	recognition.continuous = false; // stop after user stops speaking
	recognition.interimResults = false; // only final results
	recognition.lang = 'en-US'; // language

	const fetchData = async (search: string) => {
		const res = await fetch(
			`https://geocoding-api.open-meteo.com/v1/search?name=${search}`
		);
		const data = await res.json();

		if (data.results) {
			const matchedCountries = data.results.map((item) => item.country);
			setResults([...new Set(matchedCountries)] as string[]); // remove duplicates
		}
	};
	useEffect(() => {
		fetchData(city);
	}, [city]);
	return (
		<section className="w-full flex flex-col items-center justify-center">
			<form className="w-full max-w-xl flex flex-row justify-between gap-4  relative">
				<div className="flex gap-4 items-center relative w-full">
					<label htmlFor="" className="absolute left-4">
						<img src="/images/icon-search.svg" alt="Search Icon" />
					</label>
					<input
						className="bg-[var(--neutral-700)] pl-11 py-3 p r-4  w-full rounded-xl text-[var(--neutral-0)]"
						type="text"
						name="search"
						id="search"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						placeholder="Search for a place.."
					/>
				</div>

				<button
					className={`bg-[var(--blue-500)]  duration-200 px-6 rounded-xl  ${
						city
							? 'cursor-pointer hover:bg-[var(--blue-700)]'
							: 'cursor-no-drop'
					}`}
					onClick={() => handleSearch(city)}
					type="button"
				>
					{loading ? (
						<span className="">
							<img
								src="/images/icon-loading.svg"
								alt="Loading for weather data"
								className="w-6 animate-spin"
							/>
						</span>
					) : (
						'Search'
					)}
				</button>

				<VoiceButton setCity={setCity} />

				{/* Result of city names */}
				{results && results.length > 0 && city.length > 0 && (
					<div className="absolute bg-[var(--neutral-700)] p-2  left-0 top-14 rounded-xl w-[450px]">
						<ul>
							{results.map((result, i) => (
								<li
									key={i}
									className="cursor-pointer hover:bg-[var(--neutral-600)] px-2 py-1 rounded-md"
									onClick={() => {
										setCity(result);
										setResults([]);
									}}
								>
									{result}
								</li>
							))}
						</ul>
					</div>
				)}
			</form>
			<div>{error}</div>
		</section>
	);
};

export default Search;
