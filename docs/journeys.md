# `journeys(origin, destination, date = new Date())`

Get directions for routes from A to B. Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) that will resolve with an array of `journey`s in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format). **Please note that the API doesn't yet support interchange connections.**

`origin` and `destination` must be `station` objects or ids (use the [`stations`](stations.md) method to get this information).

`date` must be a JS `Date` object. The method returns results for the entire calendar day of the given date in `Europe/Podgorica` timezone.

## Example

```js
const bar = {
    type: 'station',
    id: 'Bar',
    name: 'Bar'
}

const belgrade = 'Belgrade'

const zpcg = require('zpcg')

zpcg.journeys(bar, belgrade, new Date())
.then(console.log)
.catch(console.error)
```

## Response

```js
[
    {
        id: "Bar_2018-05-26T08:20:00+02:00_Belgrade_2018-05-26T19:59:00+02:00_430",
        legs: [
            {
                id: "187", // use this id to request further information for legs using the journeyLeg method
                origin: "Bar",
                destination: "Belgrade",
                departure: "2018-05-26T08:20:00+02:00",
                arrival: "2018-05-26T19:59:00+02:00",
                mode: "train",
                public: true,
                operator: "ŽPCG",
                line: {
                    type: "line",
                    id: "430",
                    name: "430",
                    product: "inter city",
                    mode: "train",
                    public: true,
                    operator: "ŽPCG"
                },
                schedule: "Bar_2018-05-26T08:20:00+02:00_Belgrade_2018-05-26T19:59:00+02:00_430"
            }
        ]
    }
    // …
]
```
