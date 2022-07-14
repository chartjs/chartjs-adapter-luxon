import {acquireChart, addMatchers, releaseCharts, specsFromFixtures, triggerMouseEvent, afterEvent} from 'chartjs-test-utils';

window.devicePixelRatio = 1;
window.acquireChart = acquireChart;
window.afterEvent = afterEvent;
window.triggerMouseEvent = triggerMouseEvent;

jasmine.fixtures = specsFromFixtures;

beforeEach(function() {
  addMatchers();
});

afterEach(function() {
  releaseCharts();
});

console.warn('Testing with chart.js v' + Chart.version + ', luxon v' + luxon.VERSION);
