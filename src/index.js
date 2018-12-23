import Chart from 'chart.js';
import {DateTime} from 'luxon';

var helpers = Chart.helpers;
var adapter = Chart._adapters._date;

var SHORT_PRESETS = {
	millisecond: 'h:mm:ss.SSS a',
	second: 'h:mm:ss a',
	minute: 'h:mm a',
	hour: 'ha',
	day: 'MMM d',
	week: 'DD',
	month: 'MMM yyyy',
	quarter: "'Q'q - yyyy",
	year: 'yyyy'
};

var LONG_PRESETS = {
	millisecond: 'MMM d, yyyy h:mm:ss.SSS a',
	second: 'MMM d, yyyy h:mm:ss a',
	minute: 'MMM d, yyyy h:mm a',
	hour: 'MMM d, yyyy ha',
	day: 'MMM d, yyyy',
	week: 'DD',
	month: 'MMM yyyy',
	quarter: "'Q'q - yyyy",
	year: 'yyyy'
};

function create(time) {
	return DateTime.fromMillis(time);
}

helpers.merge(adapter, {
	_id: 'luxon', // DEBUG

	presets: function(long) {
		return long ? LONG_PRESETS : SHORT_PRESETS;
	},

	parse: function(value, format) {
		if (helpers.isNullOrUndef(value)) {
			return null;
		}

		var type = typeof value;
		if (type === 'number') {
			value = create(value);
		} else if (type === 'string') {
			if (typeof format === 'string') {
				value = DateTime.fromFormat(value, format);
			} else {
				value = DateTime.fromISO(value);
			}
		} else if (type === 'object') {
			value = DateTime.fromObject(value);
		} else if (value instanceof Date) {
			value = DateTime.fromJSDate(value);
		}

		return value.isValid ? +value : null;
	},

	format: function(time, format) {
		return create(time).toFormat(format);
	},

	add: function(time, amount, unit) {
		var args = {};
		args[unit] = amount;
		return +create(time).plus(args);
	},

	diff: function(max, min, unit) {
		return +create(max).diff(create(min)).as(unit);
	},

	startOf: function(time, unit, opt) {
		if (unit === 'isoWeek') {
			return +create(time).isoWeekday(opt);
		}
		return unit ? +create(time).startOf(unit) : time;
	},

	endOf: function(time, unit) {
		return +create(time).endOf(unit);
	}
});
