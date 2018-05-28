# zpcg

JavaScript client for the Montenegrin 🇲🇪 [ŽPCG](https://www.zcg-prevoz.me/) railway API. Complies with the [friendly public transport format](https://github.com/public-transport/friendly-public-transport-format). Inofficial, using *ŽPCG* endpoints. Ask them for permission before using this module in production.

[![npm version](https://img.shields.io/npm/v/zpcg.svg)](https://www.npmjs.com/package/zpcg)
[![Build Status](https://travis-ci.org/juliuste/zpcg.svg?branch=master)](https://travis-ci.org/juliuste/zpcg)
[![Greenkeeper badge](https://badges.greenkeeper.io/juliuste/zpcg.svg)](https://greenkeeper.io/)
[![dependency status](https://img.shields.io/david/juliuste/zpcg.svg)](https://david-dm.org/juliuste/zpcg)
[![license](https://img.shields.io/github/license/juliuste/zpcg.svg?style=flat)](license)
[![fptf version](https://fptf.badges.juliustens.eu/badge/juliuste/zpcg)](https://fptf.badges.juliustens.eu/link/juliuste/zpcg)
[![chat on gitter](https://badges.gitter.im/juliuste.svg)](https://gitter.im/juliuste)

## Installation

```shell
npm install --save zpcg
```

## Usage

```javascript
const zpcg = require('zpcg')
```

This package contains data in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format) and provides the following methods:

- [`stations()`](docs/stations.md) to get a list of operated stations, such as `Podgorica`, `Bar` or `Belgrade`.
- [`journeys(origin, destination, date = new Date())`](docs/journeys.md) to get routes between stations. *Please note that the API doesn't yet support interchange connections.*
- [`journeyLeg(legId, departureDate)`](docs/journeyLeg.md) to get all passed stations and prices for a given journey leg.

## Contributing

If you found a bug, want to propose a feature or feel the urge to complain about your life, feel free to visit [the issues page](https://github.com/juliuste/zpcg/issues).
