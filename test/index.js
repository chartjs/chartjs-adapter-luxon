'use strict';

import Chart from 'chart.js';
import '../src';
import utils from './utils';

var charts = {};

jasmine.chart = {
	acquire: function() {
		var chart = utils.acquireChart.apply(utils, arguments);
		charts[chart.id] = chart;
		return chart;
	},
	release: function(chart) {
		utils.releaseChart.apply(utils, arguments);
		delete charts[chart.id];
	}
};

jasmine.triggerMouseEvent = utils.triggerMouseEvent;

beforeEach(function() {
	Chart.helpers.merge(Chart.defaults.global, {
		animation: false,
		legend: { display: false },
		responsive: false,
		title: { display: false },
		tooltips: false,
		elements: {
			arc: {
				backgroundColor: 'transparent',
				borderColor: 'rgba(0, 0, 0, 0.1)',
				borderWidth: 1
			},
			point: {
				backgroundColor: 'transparent',
				borderColor: 'rgba(0, 0, 0, 0.1)',
				borderWidth: 1
			},
			rectangle: {
				backgroundColor: 'transparent',
				borderColor: 'rgba(0, 0, 0, 0.1)',
				borderWidth: 1
			}
		}
	});

	Chart.helpers.merge(Chart.defaults.scale, {
		display: false,
		ticks: {
			beginAtZero: true
		}
	});
});

afterEach(function() {
	// Auto releasing acquired charts
	Object.keys(charts).forEach(function(id) {
		var chart = charts[id];
		if (!(chart.$test || {}).persistent) {
			jasmine.chart.release(chart);
		}
	});
});
