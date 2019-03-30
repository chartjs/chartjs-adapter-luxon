describe('Luxon Adapter', function() {
	it('should accept timezone configuration', function() {
		var chart = jasmine.chart.acquire({
			type: 'line',
			data: {
				datasets: [{
					data: [{
						t: 0,
						y: 100
					}]
				}]
			},
			options: {
				scales: {
					xAxes: [{
						type: 'time',
						id: 'xAxis0',
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
					}]
				}
			}
		});

		expect(chart.scales['xAxis0'].ticks[0]).toEqual('Jan 1, 1970, 6:00:00 AM');
	});
});
