import { _adapters, helpers } from 'chart.js';
import { DateTime } from 'luxon';

var FORMATS = {
	datetime: DateTime.DATETIME_MED_WITH_SECONDS,
	millisecond: 'h:mm:ss.SSS a',
	second: DateTime.TIME_WITH_SECONDS,
	minute: DateTime.TIME_SIMPLE,
	hour: { hour: 'numeric' },
	day: { day: 'numeric', month: 'short' },
	week: 'DD',
	month: { month: 'short', year: 'numeric' },
	quarter: "'Q'q - yyyy",
	year: { year: 'numeric' }
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
		} else if (type === 'object' && !(value instanceof DateTime)) {
			value = DateTime.fromObject(value);
		} else if (value instanceof Date) {
			value = DateTime.fromJSDate(value, options);
		}

		return value.isValid ? value.valueOf() : null;
	},

	format: function(time, format) {
		var datetime = this._create(time);
		return typeof format === 'string'
			? datetime.toFormat(format, this.options)
			: datetime.toLocaleString(format);
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
