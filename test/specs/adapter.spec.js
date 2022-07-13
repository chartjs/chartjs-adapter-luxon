describe('Luxon Adapter', function() {

  it('should accept timezone and locale configuration', function() {
    var chart = acquireChart({
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

    expect(chart.scales.x.ticks[0].label).toEqual('Jan 1, 1970, 6:00:00 AM');
  });

});
