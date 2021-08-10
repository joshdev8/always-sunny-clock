import { getTime } from './time';

describe('Helpers: time', () => {
	const { time, day } = getTime();

	it('getTime: should return an object with time and day strings', () => {
		expect(typeof time).toEqual('string');
		expect(typeof day).toEqual('string');
	});
	it('getTime: should return a day string that is one of the days of the week', () => {
		const weekdays = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];

		expect(weekdays.includes(day)).toBe(true);
	});
	it('getTime: time returned should contain a colon', () => {
		const timeCharacterArray = Array.from(time);

		expect(timeCharacterArray.includes(':')).toBe(true);
	});
	it('getTime: time returned should have either am or pm at the end of the string', () => {
		const lastTwoCharsOfTimeString = time.slice(-2);
		const expectedLastCharacters = ['am', 'pm'];

		expect(expectedLastCharacters.includes(lastTwoCharsOfTimeString)).toBe(
			true
		);
	});
});
