import Chart from 'chart.js';
import { DateTime } from 'luxon';

const FORMATS = {
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

Chart._adapters._date.override({
	_id: 'luxon', // DEBUG

	/**
	 * @private
	 */
	_create: function(time) {
		return DateTime.fromMillis(time, this.options);
	},
	
	/**
	 * @private
	 */
	_isoWeekday: function(dateTime, weekday){
		var diff = (weekday != null ? weekday : 7) - dateTime.weekday;
		return dateTime.plus({days: diff}).startOf('day');
	},	
	
	formats: function() {
		return FORMATS;
	},

	parse: function(value, format) {
		const options = this.options;

		if (value === null || typeof value === 'undefined') {
			return null;
		}

		const type = typeof value;
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
		const datetime = this._create(time);
		return typeof format === 'string'
			? datetime.toFormat(format, this.options)
			: datetime.toLocaleString(format);
	},

	add: function(time, amount, unit) {
		const args = {};
		args[unit] = amount;
		return this._create(time).plus(args).valueOf();
	},

	diff: function(max, min, unit) {
		return this._create(max).diff(this._create(min)).as(unit).valueOf();
	},

	startOf: function(time, unit, weekday) {
		if (unit === 'isoWeek') {
			return this._isoWeekday(this._create(time), weekday).valueOf();
		}
		return unit ? this._create(time).startOf(unit).valueOf() : time;
	},

	endOf: function(time, unit) {
		return this._create(time).endOf(unit).valueOf();
	}
});
