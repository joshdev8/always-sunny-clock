// add a '0' in front of numbers if they are less than 10
const formatNumber = (i) => (i < 10 ? '0' + i : i);

// switch hour number to 12 hour time
const switchToTwelveHourTime = (h) => (h > 12 ? h - 12 : h);

const amOrPm = (hours) => (hours > 11 ? 'pm' : 'am');

export const getTime = () => {
	const today = new Date();
	const h = today.getHours();
	let m = today.getMinutes();
	const weekday = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	const day = weekday[today.getDay()];

	m = formatNumber(m);

	const time = switchToTwelveHourTime(h) + ':' + m + ' ' + amOrPm(h);

	return { time, day };
};
