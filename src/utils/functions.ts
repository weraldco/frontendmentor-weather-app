export const getWeatherIcon = (code: number) => {
	if (code == 0) {
		return './images/icon-sunny.webp';
	} else if (code > 0 && code <= 2) {
		return './images/icon-partly-cloudy.webp';
	} else if (code == 3) {
		return './images/icon-overcast.webp';
	} else if (code >= 45 && code <= 46) {
		return './images/icon-fog.webp';
	} else if (code >= 51 && code <= 53) {
		return './images/icon-drizzle.webp';
	} else if ((code >= 61 && code <= 65) || code == 80) {
		return './images/icon-rain.webp';
	} else if (code >= 71 && code <= 75) {
		return './images/icon-snow.webp';
	} else if (code >= 95 && code <= 99) {
		return './images/icon-storm.webp';
	} else {
		return 'Invalid code, cannot determine the weather.';
	}
};
