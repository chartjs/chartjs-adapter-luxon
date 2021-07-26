const {DateTime} = luxon;

describe('Luxon Adapter', function() {
  it('should accept timezone configuration', function() {
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

  it('should parse Luxon DateTime objects directly', function() {
    var adapter = new Chart._adapters._date();

    expect(adapter.parse(DateTime.fromMillis(0))).toEqual(0);
    expect(adapter.parse(DateTime.fromISO('1970-01-01T00:00:01Z'))).toEqual(1000);
  });

  it('should parse Luxon Date objects directly', function() {
    var adapter = new Chart._adapters._date();

    expect(adapter.parse(new Date(0))).toEqual(0);
  });

  it('should format correctly using format presets', function() {
    var adapter = new Chart._adapters._date({zone: 'UTC'});
    var formats = adapter.formats();

    expect(adapter.format(1559056227321, formats.year)).toEqual('2019');
    expect(adapter.format(1559056227321, formats.quarter)).toEqual('Q2 - 2019');
    expect(adapter.format(1559056227321, formats.month)).toEqual('May 2019');
    expect(adapter.format(1559056227321, formats.week)).toEqual('May 28, 2019');
    expect(adapter.format(1559056227321, formats.day)).toEqual('May 28');
    expect(adapter.format(1559056227321, formats.hour)).toEqual('3 PM');
    expect(adapter.format(1559056227321, formats.minute)).toEqual('3:10 PM');
    expect(adapter.format(1559056227321, formats.second)).toEqual('3:10:27 PM');
    expect(adapter.format(1559056227321, formats.millisecond)).toEqual('3:10:27.321 PM');
    expect(adapter.format(1559056227321, formats.datetime)).toEqual('May 28, 2019, 3:10:27 PM');
  });

  it('should startOf correctly using isoWeek preset', function() {
    const adapter = new Chart._adapters._date();

    const dayOfWeekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const daysInMonth = DateTime.local().daysInMonth;

    for (const dayOfWeek of dayOfWeekNames) {
      for (let dayOfMonth = 1; dayOfMonth <= daysInMonth; dayOfMonth++) {
        const dt = DateTime.fromObject({day: dayOfMonth, hour: 8, minute: 30});
        const startOf = adapter.startOf(dt.valueOf(), 'isoWeek', dayOfWeekNames.indexOf(dayOfWeek));
        expect(adapter.format(startOf, 'ccc')).toEqual(dayOfWeek);
        expect(DateTime.fromMillis(startOf)).toBeLessThanOrEqual(dt);
      }
    }

    for (let dayOfMonth = 1; dayOfMonth <= daysInMonth; dayOfMonth++) {
      const dt = DateTime.fromObject({day: dayOfMonth, hour: 8, minute: 30});
      const startOf = adapter.startOf(dt.valueOf(), 'isoWeek', false);
      expect(adapter.format(startOf, 'ccc')).toEqual('Sun');
      expect(DateTime.fromMillis(startOf)).toBeLessThanOrEqual(dt);
    }

    for (let dayOfMonth = 1; dayOfMonth <= daysInMonth; dayOfMonth++) {
      const dt = DateTime.fromObject({day: dayOfMonth, hour: 8, minute: 30});
      const startOf = adapter.startOf(dt.valueOf(), 'isoWeek', true);
      expect(adapter.format(startOf, 'ccc')).toEqual('Mon');
      expect(DateTime.fromMillis(startOf)).toBeLessThanOrEqual(dt);
    }

    for (let dayOfMonth = 1; dayOfMonth <= daysInMonth; dayOfMonth++) {
      const dt = DateTime.fromObject({day: dayOfMonth, hour: 8, minute: 30});
      const startOf = adapter.startOf(dt.valueOf(), 'isoWeek', 100);
      expect(adapter.format(startOf, 'ccc')).toEqual('Sat');
      expect(DateTime.fromMillis(startOf)).toBeLessThanOrEqual(dt);
    }

    for (let dayOfMonth = 1; dayOfMonth <= daysInMonth; dayOfMonth++) {
      const dt = DateTime.fromObject({day: dayOfMonth, hour: 8, minute: 30});
      const startOf = adapter.startOf(dt.valueOf(), 'isoWeek', -100);
      expect(adapter.format(startOf, 'ccc')).toEqual('Sun');
      expect(DateTime.fromMillis(startOf)).toBeLessThanOrEqual(dt);
    }

  });

  it('should use correct date for startOf isoWeek when date is beginning of week', function() {
    const adapter = new Chart._adapters._date();
    const daysInMonth = DateTime.local().daysInMonth;

    for (let dayOfMonth = 1; dayOfMonth <= daysInMonth; dayOfMonth++) {
      const dt = DateTime.fromObject({day: dayOfMonth, hour: 8, minute: 30});
      const dayOfWeek = dt.weekday % 7;
      const startOf = adapter.startOf(dt.valueOf(), 'isoWeek', dayOfWeek);
      expect(adapter.format(startOf, 'D')).toEqual(dt.toFormat('D'));
    }
  });
});
