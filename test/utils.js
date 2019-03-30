'use strict';

import Chart from 'chart.js';

function acquireChart(config, options) {
	var wrapper = document.createElement('DIV');
	var canvas = document.createElement('CANVAS');
	var chart, key;

	config = config || {};
	options = options || {};
	options.canvas = options.canvas || {height: 512, width: 512};
	options.wrapper = options.wrapper || {class: 'chartjs-wrapper'};

	for (key in options.canvas) {
		if (options.canvas.hasOwnProperty(key)) {
			canvas.setAttribute(key, options.canvas[key]);
		}
	}

	for (key in options.wrapper) {
		if (options.wrapper.hasOwnProperty(key)) {
			wrapper.setAttribute(key, options.wrapper[key]);
		}
	}

	// by default, remove chart animation and auto resize
	config.options = config.options || {};
	config.options.animation = config.options.animation === undefined ? false : config.options.animation;
	config.options.responsive = config.options.responsive === undefined ? false : config.options.responsive;
	config.options.defaultFontFamily = config.options.defaultFontFamily || 'Arial';

	wrapper.appendChild(canvas);
	window.document.body.appendChild(wrapper);

	try {
		chart = new Chart(canvas.getContext('2d'), config);
	} catch (e) {
		window.document.body.removeChild(wrapper);
		throw e;
	}

	chart.$test = {
		persistent: options.persistent,
		wrapper: wrapper
	};

	return chart;
}

function releaseChart(chart) {
	chart.destroy();

	var wrapper = (chart.$test || {}).wrapper;
	if (wrapper && wrapper.parentNode) {
		wrapper.parentNode.removeChild(wrapper);
	}
}

function triggerMouseEvent(chart, type, el) {
	var node = chart.canvas;
	var rect = node.getBoundingClientRect();
	var x = el ? el.x !== undefined ? el.x : el._model.x : null;
	var y = el ? el.y !== undefined ? el.y : el._model.y : null;

	var event = new MouseEvent(type, {
		clientX: el ? rect.left + x : undefined,
		clientY: el ? rect.top + y : undefined,
		cancelable: true,
		bubbles: true,
		view: window
	});

	node.dispatchEvent(event);
}

export default {
	acquireChart: acquireChart,
	releaseChart: releaseChart,
	triggerMouseEvent: triggerMouseEvent
};
