import { DateTime } from 'luxon';

var options = {
	zone: 'UTC+1',
	locale: 'en-GB',
	numberingSystem: 'latn',
	outputCalender: 'gregory'
};

describe('Luxon', function() {
	it('should accept complete options for each options accepting method used', function() {
		expect(function() {
			DateTime.fromMillis(0, options).toISO();
		}).not.toThrow();
		expect(function() {
			DateTime.fromFormat('01', 'DD', options);
		}).not.toThrow();
		expect(function() {
			DateTime.fromISO('1970-01-01T00:00:00.000Z', options);
		}).not.toThrow();
		expect(function() {
			DateTime.fromJSDate(new Date(0), options);
		}).not.toThrow();
		expect(function() {
			DateTime.fromMillis(0, options).toFormat('DD', options);
		}).not.toThrow();
	});
});
