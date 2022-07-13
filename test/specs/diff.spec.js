const {DateTime} = luxon;

describe('Luxon Adapter', function() {

  const min = '2018-05-28T15:10:27.321Z';
  const max = '2019-05-28T15:10:27.321Z';
  const units = {
    millisecond: 31536000000,
    second: 31536000,
    minute: 525600,
    hour: 8760,
    day: 365,
    week: 52,
    month: 12,
    quarter: 4,
    year: 1
  };

  const utcMin = DateTime.fromISO(min).valueOf();
  const utcMax = DateTime.fromISO(max).valueOf();

  const options = {zone: 'UTC'};
  const adapter = new Chart._adapters._date(options);

  it('should calculate correctly the difference between 2 dates', function() {
    for (const unit of Object.keys(units)) {
      const result = Math.trunc(adapter.diff(utcMax, utcMin, unit));
      expect(result).withContext(`unit: ${unit}`).toEqual(units[unit]);
    }
  });

  it('should not manage invalid unit for calculating the difference', function() {
    expect(() => adapter.diff(utcMax, utcMin, 'dateTime')).toThrow(new Error('Invalid unit dateTime'));
  });

});
