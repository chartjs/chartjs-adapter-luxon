const {DateTime} = luxon;

describe('"add" method', function() {

  const start = '2019-05-28T15:10:27.321Z';
  const amount = 1;
  const units = {
    millisecond: '2019-05-28T15:10:27.322Z',
    second: '2019-05-28T15:10:28.321Z',
    minute: '2019-05-28T15:11:27.321Z',
    hour: '2019-05-28T16:10:27.321Z',
    day: '2019-05-29T15:10:27.321Z',
    week: '2019-06-04T15:10:27.321Z',
    month: '2019-06-28T15:10:27.321Z',
    quarter: '2019-08-28T15:10:27.321Z',
    year: '2020-05-28T15:10:27.321Z'
  };

  const utcStart = DateTime.fromISO(start).valueOf();

  const options = {zone: 'UTC'};
  const adapter = new Chart._adapters._date(options);

  it(`should correctly add ${amount} units to ${start}`, function() {
    for (const unit of Object.keys(units)) {
      const result = adapter.add(utcStart, amount, unit);
      expect(DateTime.fromMillis(result, options).toISO()).withContext(`unit: ${unit}`).toEqual(units[unit]);
    }
  });

  it('should not manage invalid unit', function() {
    expect(() => adapter.add(DateTime.now().toMillis(), 1, 'dateTime')).toThrow(new Error('Invalid unit dateTime'));
  });

});
