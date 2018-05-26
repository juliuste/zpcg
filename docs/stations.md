# `stations()`

Get a list of all stations. Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) that will resolve in an array of `station`s in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format).

```js
const zpcg = require('zpcg')

zpcg.stations()
.then(console.log)
.catch(console.error)
```

## Response

```js
[
    {
        type: "station",
        id: "Aerodrom",
        name: "Aerodrom"
    },
    {
        type: "station",
        id: "Backa Topola",
        name: "Backa Topola"
    },
    {
        type: "station",
        id: "Bar",
        name: "Bar"
    }
    // …
]
```
