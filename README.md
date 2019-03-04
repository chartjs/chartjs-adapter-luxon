# chartjs-adapter-luxon

[![release](https://img.shields.io/github/release/chartjs/chartjs-adapter-luxon.svg?style=flat-square&maxAge=600)](https://github.com/chartjs/chartjs-adapter-luxon/releases/latest) [![travis](https://img.shields.io/travis/chartjs/chartjs-adapter-luxon.svg?style=flat-square&maxAge=60)](https://travis-ci.org/chartjs/chartjs-adapter-luxon) [![awesome](https://awesome.re/badge-flat2.svg)](https://github.com/chartjs/awesome)

## Overview

This adapter allows to use Luxon with the Chart.js.

Requires [Chart.js](https://github.com/chartjs/Chart.js/releases) **2.8.0** or later and [Luxon](https://moment.github.io/luxon/) **1.0.0** or later.

## Installation

### npm

```
npm install chartjs-adapter-luxon --save
```

### CDN

By default, `https://cdn.jsdelivr.net/npm/chartjs-adapter-luxon` returns the latest (minified) version, however it's [highly recommended](https://www.jsdelivr.com/features) to always specify a version in order to avoid breaking changes. This can be achieved by appending `@{version}` to the URL:

```
https://cdn.jsdelivr.net/npm/chartjs-adapter-luxon@0.1.0
```

Read more about jsDeliver versioning on their [website](http://www.jsdelivr.com/).

## Integration

**Note:** once loaded, this adapter overrides the default date-adapter provided in Chart.js (as a side-effect).

### HTML

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0/dist/Chart.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/luxon@1.8.2/build/global/luxon.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-luxon@0.1.0"></script>
```

### Module

```javascript
import Chart from 'chart.js';
import 'chartjs-adapter-luxon';
```

## Configuration

No adapter configuration is currently available, read the [Chart.js documention](https://www.chartjs.org/docs/latest) for other possible date/time related options. For example, the time scale [`time.*` options](https://www.chartjs.org/docs/latest/axes/cartesian/time.html#configuration-options) can be overridden using the [Luxon formats](https://moment.github.io/luxon/docs/manual/formatting.html).

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
