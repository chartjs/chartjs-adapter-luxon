import {formatData} from '../data';

describe('Luxon Adapter', function() {

  for (const item of formatData) {
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

    it(`should accept locale ${locale} from chart configuration`, function() {
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
          locale,
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
                  zone: 'UTC+6'
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

    it('should use the locale from adapter config overriding the chart configuration', function() {
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
          locale,
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
                  locale: 'de-DE'
                }
              },
              ticks: {
                source: 'data'
              }
            }
          }
        }
      });

      expect(chart.scales.x.ticks[0].label).toEqual('Jan. 1, 1970, 6:00:00 AM');
    });
  }
});
