import { useEffect, useState } from 'react';

const Test = () => {
	const [results, setResults] = useState<string[]>([]);

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
		fetchData('phi');
	}, []);
	console.log(results);
	return <div>Test</div>;
};

export default Test;
