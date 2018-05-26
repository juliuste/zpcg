# `journeyLeg(legId, departureDate)`

Get passed stations and prices for a specific journey leg. Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) that will resolve with an array which looks as follows.

`legId` must be a valid leg id obtained using the `journeys` method.

`departureDate` must be the departure `Date` object of the same leg. Please note that the `journeys` method doesn't return `Date` objects, but rather ISO strings instead, so you would need to use `new Date(leg.departure)` instead of `leg.departure`.

## Example

```js
const zpcg = require('zpcg')

zpcg.journeyLeg('187', new Date('2018-05-29T09:30:00+02:00')) // Podgorica -> Belgrade
.then(console.log)
.catch(console.error)
```

Note that, rather than returning just the stations between origin and destination of your original journey, this methods returns the entire train route, e.g. `Bar -> Podgorica -> Belgrade` instead of just `Podgorica -> Belgrade` in this case.

Prices are always relative to the first station of the train route, e.g. the price at `Belgrade` is the price for the journey `Bar-Belgrade` since the journey starts at `Bar`. You would get the `Podgorica -> Belgrade` price by subtracting the price at `Podgorica` from the price at `Belgrade`.

## Response

```js
[
    {
        station: "Bar",
        arrival: null,
        departure: "2018-05-29T08:20:00+02:00",
        price: {
            amount: 0,
            currency: "EUR",
            class: 2,
            tariffs: [
                {
                    amount: 0,
                    currency: "EUR",
                    class: 1
                },
                {
                    amount: 0,
                    currency: "EUR",
                    class: 2
                }
            ]
        }
    },
    {
        station: "Sutomore",
        arrival: "2018-05-29T08:32:00+02:00",
        departure: "2018-05-29T08:40:00+02:00",
        price: {
            amount: 1.2,
            currency: "EUR",
            class: 2,
            tariffs: [
                {
                    amount: 2,
                    currency: "EUR",
                    class: 1
                },
                {
                    amount: 1.2,
                    currency: "EUR",
                    class: 2
                }
            ]
        }
    },
    {
        station: "Podgorica",
        arrival: "2018-05-29T09:18:00+02:00",
        departure: "2018-05-29T09:30:00+02:00",
        price: {
            amount: 2.4,
            currency: "EUR",
            class: 2,
            tariffs: [
                {
                    amount: 3.6,
                    currency: "EUR",
                    class: 1
                },
                {
                    amount: 2.4,
                    currency: "EUR",
                    class: 2
                }
            ]
        }
    },
    {
        station: "Kolašin",
        arrival: "2018-05-29T10:45:00+02:00",
        departure: "2018-05-29T10:46:00+02:00",
        price: {
            amount: 5.4,
            currency: "EUR",
            class: 2,
            tariffs: [
                {
                    amount: 8.2,
                    currency: "EUR",
                    class: 1
                },
                {
                    amount: 5.4,
                    currency: "EUR",
                    class: 2
                }
            ]
        }
    },
    // …
    {
        station: "Belgrade",
        arrival: "2018-05-29T19:59:00+02:00",
        departure: null,
        price: {
            amount: 21,
            currency: "EUR",
            class: 2,
            tariffs: [
                {
                    amount: 31.8,
                    currency: "EUR",
                    class: 1
                },
                {
                    amount: 21,
                    currency: "EUR",
                    class: 2
                }
            ]
        }
    }
]
```
