describe('Luxon Adapter', function() {
  const invalidFormats = [
    0,
    function() {},
    {}
  ];

  for (const item of window.formatData) {
    const {locale, value} = item;
    const adapter = new Chart._adapters._date({zone: 'UTC', locale});
    const formats = adapter.formats();

    it(`should format correctly using format presets for locale '${locale}'`, function() {
      for (const unit of Object.keys(item.units)) {
        const result = (unit === 'default') ? adapter.format(value) : adapter.format(value, formats[unit]);
        expect(result).withContext(`unit: ${unit}`).toEqual(item.units[unit]);
      }
    });

    it(`should format correctly even with an invalid format for locale '${locale}'`, function() {
      for (const f of invalidFormats) {
        expect(adapter.format(value, f)).withContext(`format: ${f}`).toEqual(item.units.default);
      }
    });

  }
});
