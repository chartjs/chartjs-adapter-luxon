const {DateTime} = luxon;

describe('Luxon Adapter', function() {

  for (const item of window.parseData) {
    const {locale} = item;
    const adapter = new Chart._adapters._date({zone: 'UTC', locale});

    it(`should parse correctly using locale '${locale}'`, function() {
      for (const unit of Object.keys(item.units)) {
        const {value, result, format} = item.units[unit];
        const parsed = (!format) ? adapter.parse(value) : adapter.parse(value, format);
        expect(parsed).withContext(`unit: ${unit}`).toEqual(result);
      }
    });
  }

  it('should parse correctly using different types of value', function() {
    const options = {zone: 'UTC', locale: 'en-US'};
    const inputValues = [
      1559056227321, // UTC value
      new Date(1559056227321), // JS date with UTC
      new Date('2019-05-28T15:10:27.321Z'), // JS date with ISO
      DateTime.fromMillis(1559056227321, options), // Luxon UTC
      DateTime.fromISO('2019-05-28T15:10:27.321Z', options), // Luxon ISO
      {year: 2019, month: 5, day: 28, hour: 17, minute: 10, second: 27, millisecond: 321} // INTL object
    ];
    const adapter = new Chart._adapters._date(options);
    for (const item of inputValues) {
      expect(adapter.parse(item)).withContext(`item: ${item}`).toEqual(1559056227321);
    }
  });

  it('should not parse invalid types of value', function() {
    const invalidValues = [
      function() {},
      null,
      undefined
    ];
    const adapter = new Chart._adapters._date();
    for (const item of invalidValues) {
      expect(adapter.parse(item)).withContext(`item: ${item}`).toEqual(null);
    }
  });

});
