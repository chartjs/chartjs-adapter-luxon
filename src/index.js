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

_adapters._date.override({
	_id: 'luxon', // DEBUG

	/**
	 * @private
	 */
	_create: function(time) {
		return DateTime.fromMillis(time, this.options);
	},

	formats: function() {
		return FORMATS;
	},

	parse: function(value, format) {
		var options = this.options;

		if (helpers.isNullOrUndef(value)) {
			return null;
		}

		var type = typeof value;
		if (type === 'number') {
			value = this._create(value);
		} else if (type === 'string') {
			if (typeof format === 'string') {
				value = DateTime.fromFormat(value, format, options);
			} else {
				value = DateTime.fromISO(value, options);
			}
		} else if (type === 'object') {
			value = DateTime.fromObject(value);
		} else if (value instanceof Date) {
			value = DateTime.fromJSDate(value, options);
		}

		return value.isValid ? value.valueOf() : null;
	},

	format: function(time, format) {
		return this._create(time).toFormat(format, this.options);
	},

	add: function(time, amount, unit) {
		var args = {};
		args[unit] = amount;
		return this._create(time).plus(args).valueOf();
	},

	diff: function(max, min, unit) {
		return this._create(max).diff(this._create(min)).as(unit).valueOf();
	},

	startOf: function(time, unit, weekday) {
		if (unit === 'isoWeek') {
			return this._create(time).isoWeekday(weekday).valueOf();
		}
		return unit ? this._create(time).startOf(unit).valueOf() : time;
	},

	endOf: function(time, unit) {
		return this._create(time).endOf(unit).valueOf();
	}
});
