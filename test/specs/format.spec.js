import {formatData} from '../data';

describe(`'format' method`, function() {
  const invalidFormats = {
    number: 0,
    function: function() {},
    object: {}
  };

  for (const item of formatData) {
    const {locale, value} = item;
    const adapter = new Chart._adapters._date({zone: 'UTC', locale});
    const formats = adapter.formats();

    it(`should correctly format by format presets for locale '${locale}'`, function() {
      for (const unit of Object.keys(item.units)) {
        const result = (unit === 'default') ? adapter.format(value) : adapter.format(value, formats[unit]);
        expect(result).withContext(`unit: ${unit}`).toEqual(item.units[unit]);
      }
    });

    it(`should correctly format by an invalid format for locale '${locale}'`, function() {
      for (const key of Object.keys(invalidFormats)) {
        expect(adapter.format(value, invalidFormats[key])).withContext(`format: ${key}`).toEqual(item.units.default);
      }
    });

  }
});
