describe('Luxon Adapter', function() {

  for (const item of window.formatData) {
    const {locale, adapter} = item;

    it(`should accept timezone and locale ${locale} configuration`, function() {
      const chart = acquireChart({
        type: 'line',
        data: {
          datasets: [{
            data: [{
              x: 0,
              y: 100
            }]
          }]
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'second',
                displayFormats: {
                  second: 'MMM d, yyyy, h:mm:ss a'
                }
              },
              adapters: {
                date: {
                  zone: 'UTC+6',
                  locale
                }
              },
              ticks: {
                source: 'data'
              }
            }
          }
        }
      });

      expect(chart.scales.x.ticks[0].label).toEqual(adapter);
    });
  }
});
