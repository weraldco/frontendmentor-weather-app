import { useState } from 'react';

const Search = ({
	city,
	setCity,
	handleSearch,
	error,
}: {
	city: string;
	setCity: (e: string) => void;
	handleSearch: (city: string) => void;
	error: string;
}) => {
	return (
		<section className="w-full flex flex-col items-center justify-center">
			<form className="w-full max-w-xl flex flex-row justify-between gap-4">
				<div className="flex gap-4 items-center relative w-full">
					<label htmlFor="" className="absolute left-6">
						<img src="/images/icon-search.svg" alt="Search Icon" />
					</label>
					<input
						className="bg-[var(--neutral-700)] pl-14 py-3 p r-4  w-full rounded-xl text-[var(--neutral-0)]"
						type="text"
						name="search"
						id="search"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						placeholder="Search for a place.."
					/>
				</div>
				<button
					className="bg-[var(--blue-500)] hover:bg-[var(--blue-700)] duration-200 cursor-pointer px-6 rounded-xl"
					onClick={() => handleSearch(city)}
					type="button"
				>
					Search
				</button>
			</form>
			<div>{error}</div>
		</section>
	);
};

export default Search;
