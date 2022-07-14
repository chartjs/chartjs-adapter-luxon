import {parseData} from '../data';
const {DateTime} = luxon;

describe('\'parse\' method', function() {

  for (const item of parseData) {
    const {locale} = item;
    const adapter = new Chart._adapters._date({zone: 'UTC', locale});

    it(`should correctly parse using locale '${locale}'`, function() {
      for (const unit of Object.keys(item.units)) {
        const {value, result, format} = item.units[unit];
        const parsed = (!format) ? adapter.parse(value) : adapter.parse(value, format);
        expect(parsed).withContext(`unit: ${unit}`).toEqual(result);
      }
    });
  }

  it('should correctly parse using different types of value', function() {
    const options = {zone: 'UTC', locale: 'en-US'};
    const inputValues = {
      utc: 1559056227321,
      jsDate: new Date(1559056227321),
      jsISODate: new Date('2019-05-28T15:10:27.321Z'),
      luxonDateTime: DateTime.fromMillis(1559056227321, options),
      luxonISODateTime: DateTime.fromISO('2019-05-28T15:10:27.321Z', options),
      luxonDateTimeObject: {year: 2019, month: 5, day: 28, hour: 15, minute: 10, second: 27, millisecond: 321} // INTL object
    };
    const adapter = new Chart._adapters._date(options);
    for (const key of Object.keys(inputValues)) {
      expect(adapter.parse(inputValues[key])).withContext(`item: ${key}`).toEqual(1559056227321);
    }
  });

  it('should not parse invalid types of value', function() {
    const invalidValues = {
      function: function() {},
      null: null,
      undefined: undefined
    };
    const adapter = new Chart._adapters._date();
    for (const key of Object.keys(invalidValues)) {
      expect(adapter.parse(invalidValues[key])).withContext(`item: ${key}`).toEqual(null);
    }
  });

});
