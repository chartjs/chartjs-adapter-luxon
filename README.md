# chartjs-adapter-luxon

[![release](https://img.shields.io/github/release/chartjs/chartjs-adapter-luxon.svg?style=flat-square&maxAge=600)](https://github.com/chartjs/chartjs-adapter-luxon/releases/latest) [![travis](https://img.shields.io/travis/chartjs/chartjs-adapter-luxon.svg?style=flat-square&maxAge=60)](https://travis-ci.org/chartjs/chartjs-adapter-luxon) [![awesome](https://awesome.re/badge-flat2.svg)](https://github.com/chartjs/awesome)

## Overview

This adapter allows the use of Luxon with Chart.js. Luxon provides built-in support for time zones and internationalization.

Requires [Chart.js](https://github.com/chartjs/Chart.js/releases) **2.8.0** or later and [Luxon](https://moment.github.io/luxon/) **1.0.0** or later.

**Note:** once loaded, this adapter overrides the default date-adapter provided in Chart.js (as a side-effect).

## Installation

### npm

```
npm install luxon chartjs-adapter-luxon --save
```

```javascript
import {Chart} from 'chart.js';
import 'chartjs-adapter-luxon';
```

### CDN

By default, `https://cdn.jsdelivr.net/npm/chartjs-adapter-luxon` returns the latest (minified) version, however it's [highly recommended](https://www.jsdelivr.com/features) to always specify a version in order to avoid breaking changes. This can be achieved by appending `@{version}` to the URL:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@^3"></script>
<script src="https://cdn.jsdelivr.net/npm/luxon@^2"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-luxon@^1"></script>
```

Read more about jsDelivr versioning on their [website](http://www.jsdelivr.com/).

## Configuration

Any date adapter options in the chart configuration will be passed through to Luxon's factory functions.

The following table describes the supported options that these functions accept.

Namespace: `options.scales[scaleId].adapters.date`

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `locale` | `string` | `undefined` | Set a locale to use on the resulting `DateTime` instance. If not set, the adapter will use the [locale](https://www.chartjs.org/docs/latest/configuration/locale.html), defined at chart options level. By default, Luxon uses the system's locale. See [`Intl` locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation).
| `numberingSystem` | `string` | `undefined` | Set the numbering system to set on the resulting `DateTime` instance. See [Luxon](https://moment.github.io/luxon/#/intl?id=numberingsystem) and [`Intl` numberingSystem](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#syntax) documentation.
| `outputCalendar` | `string` | `undefined` | Set the output calendar to set on the resulting `DateTime` instance. See [Luxon](https://moment.github.io/luxon/#/calendars?id=output-calendars) and [`Intl` calendar](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#syntax) documentation.
| `setZone` | `boolean` | `undefined` | Override the zone with a zone specified in the string itself, if it specifies one. By default, Luxon uses `options.setZone=false`.
| `zone` | `string`\|`Zone` | `undefined` | Set the zone to place the `DateTime` into. By default, Luxon uses `options.zone='local'`. See [Luxon](https://moment.github.io/luxon/#/zones?id=luxon-works-with-time-zones) and [`Intl` timeZone](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#syntax) documentation.

Read the [Chart.js documention](https://www.chartjs.org/docs/latest) for other possible date/time related options. For example, the time scale [`time.*` options](https://www.chartjs.org/docs/latest/axes/cartesian/time.html#configuration-options) can be overridden using the [Luxon formats](https://moment.github.io/luxon/#/formatting).

## Development

You first need to install node dependencies (requires [Node.js](https://nodejs.org/)):

```
> npm install
```

The following commands will then be available from the repository root:

```
> npm run build         // build dist files
> npm test              // perfom code testing
> npm run lint          // perform code linting
```

## License

`chartjs-adapter-luxon` is available under the [MIT license](LICENSE.md).
