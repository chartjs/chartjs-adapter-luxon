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
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3"></script>
<script src="https://cdn.jsdelivr.net/npm/luxon@1.22.1"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-luxon@0.2.1"></script>
```

Read more about jsDelivr versioning on their [website](http://www.jsdelivr.com/).

## Configuration

Any date adapter options in the chart configuration will be passed through to Luxon's factory functions. See the [Luxon API docs](https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-fromMillis) for the supported options, such as `zone` and `locale`, that these functions accept.

Read the [Chart.js documention](https://www.chartjs.org/docs/latest) for other possible date/time related options. For example, the time scale [`time.*` options](https://www.chartjs.org/docs/latest/axes/cartesian/time.html#configuration-options) can be overridden using the [Luxon formats](https://moment.github.io/luxon/docs/manual/formatting.html).

## Development

You first need to install node dependencies (requires [Node.js](https://nodejs.org/)):

```
> npm install
```

The following commands will then be available from the repository root:

```
> gulp build            // build dist files
> gulp build --watch    // build and watch for changes
> gulp lint             // perform code linting
```

## License

`chartjs-adapter-luxon` is available under the [MIT license](LICENSE.md).
