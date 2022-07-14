const {DateTime} = luxon;

describe('\'startOf\' method', function() {

  const date = '2019-05-28T15:10:27.321Z';
  const units = {
    millisecond: date,
    second: '2019-05-28T15:10:27.000Z',
    minute: '2019-05-28T15:10:00.000Z',
    hour: '2019-05-28T15:00:00.000Z',
    day: '2019-05-28T00:00:00.000Z',
    week: '2019-05-27T00:00:00.000Z',
    month: '2019-05-01T00:00:00.000Z',
    quarter: '2019-04-01T00:00:00.000Z',
    year: '2019-01-01T00:00:00.000Z'
  };

  const utcDate = DateTime.fromISO(date).valueOf();

  const options = {zone: 'UTC', locale: 'en-GB'};
  const adapter = new Chart._adapters._date(options);

  it('should correctly calculate the start of start the period for specific unit', function() {
    for (const unit of Object.keys(units)) {
      const result = adapter.startOf(utcDate, unit);
      expect(DateTime.fromMillis(result, options).toISO()).withContext(`unit: ${unit}`).toEqual(units[unit]);
    }
  });

  it('should not manage invalid unit', function() {
    expect(() => adapter.startOf(utcDate, 'dateTime')).toThrow(new Error('Invalid unit dateTime'));
  });

  it('should startOf correctly using isoWeek preset', function() {
    const dayOfWeekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const daysInMonth = DateTime.local().daysInMonth;

    for (const dayOfWeek of dayOfWeekNames) {
      for (let dayOfMonth = 1; dayOfMonth <= daysInMonth; dayOfMonth++) {
        const dt = DateTime.fromObject({day: dayOfMonth, hour: 8, minute: 30}, options);
        const startOf = adapter.startOf(dt.valueOf(), 'isoWeek', dayOfWeekNames.indexOf(dayOfWeek));
        expect(adapter.format(startOf, 'ccc')).toEqual(dayOfWeek);
        expect(DateTime.fromMillis(startOf)).toBeLessThanOrEqual(dt);
      }
    }

    for (let dayOfMonth = 1; dayOfMonth <= daysInMonth; dayOfMonth++) {
      const dt = DateTime.fromObject({day: dayOfMonth, hour: 8, minute: 30}, options);
      const startOf = adapter.startOf(dt.valueOf(), 'isoWeek', false);
      expect(adapter.format(startOf, 'ccc')).toEqual('Sun');
      expect(DateTime.fromMillis(startOf)).toBeLessThanOrEqual(dt);
    }

    for (let dayOfMonth = 1; dayOfMonth <= daysInMonth; dayOfMonth++) {
      const dt = DateTime.fromObject({day: dayOfMonth, hour: 8, minute: 30}, options);
      const startOf = adapter.startOf(dt.valueOf(), 'isoWeek', true);
      expect(adapter.format(startOf, 'ccc')).toEqual('Mon');
      expect(DateTime.fromMillis(startOf)).toBeLessThanOrEqual(dt);
    }

    for (let dayOfMonth = 1; dayOfMonth <= daysInMonth; dayOfMonth++) {
      const dt = DateTime.fromObject({day: dayOfMonth, hour: 8, minute: 30}, options);
      const startOf = adapter.startOf(dt.valueOf(), 'isoWeek', 100);
      expect(adapter.format(startOf, 'ccc')).toEqual('Sat');
      expect(DateTime.fromMillis(startOf)).toBeLessThanOrEqual(dt);
    }

    for (let dayOfMonth = 1; dayOfMonth <= daysInMonth; dayOfMonth++) {
      const dt = DateTime.fromObject({day: dayOfMonth, hour: 8, minute: 30}, options);
      const startOf = adapter.startOf(dt.valueOf(), 'isoWeek', -100);
      expect(adapter.format(startOf, 'ccc')).toEqual('Sun');
      expect(DateTime.fromMillis(startOf)).toBeLessThanOrEqual(dt);
    }

  });

  it('should use correct date for startOf isoWeek when date is beginning of week', function() {
    const daysInMonth = DateTime.local().daysInMonth;

    for (let dayOfMonth = 1; dayOfMonth <= daysInMonth; dayOfMonth++) {
      const dt = DateTime.fromObject({day: dayOfMonth, hour: 8, minute: 30}, options);
      const dayOfWeek = dt.weekday % 7;
      const startOf = adapter.startOf(dt.valueOf(), 'isoWeek', dayOfWeek);
      expect(adapter.format(startOf, 'D')).toEqual(dt.toFormat('D'));
    }
  });

});
