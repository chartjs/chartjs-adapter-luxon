import { _adapters, helpers } from 'chart.js';
import { DateTime } from 'luxon';

var FORMATS = {
	datetime: 'MMM d, yyyy, h:mm:ss a',
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

function create(time) {
	return DateTime.fromMillis(time);
}

_adapters._date.override({
	_id: 'luxon', // DEBUG

	formats: function() {
		return FORMATS;
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

		return value.isValid ? value.valueOf() : null;
	},

	format: function(time, format) {
		return create(time).toFormat(format);
	},

	add: function(time, amount, unit) {
		var args = {};
		args[unit] = amount;
		return create(time).plus(args).valueOf();
	},

	diff: function(max, min, unit) {
		return create(max).diff(create(min)).as(unit).valueOf();
	},

	startOf: function(time, unit, weekday) {
		if (unit === 'isoWeek') {
			return create(time).isoWeekday(weekday).valueOf();
		}
		return unit ? create(time).startOf(unit).valueOf() : time;
	},

	endOf: function(time, unit) {
		return create(time).endOf(unit).valueOf();
	}
});
