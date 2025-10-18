import { useEffect, useState } from 'react';

function LocationComponent() {
	const [location, setLocation] = useState({ lat: null, lon: null });
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					setLocation({
						lat: pos.coords.latitude,
						lon: pos.coords.longitude,
					});
				},
				(err) => {
					setError(err.message);
				}
			);
		} else {
			setError('Geolocation not supported');
		}
	}, []);

	return (
		<div>
			{error && <p>❌ {error}</p>}
			{location.lat && location.lon ? (
				<p>
					📍 Latitude: {location.lat}, Longitude: {location.lon}
				</p>
			) : (
				<p>Getting location...</p>
			)}
		</div>
	);
}

export default LocationComponent;
