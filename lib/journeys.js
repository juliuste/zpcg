'use strict'

const got = require('got')
const moment = require('moment-timezone')
const isString = require('lodash.isstring')
const isDate = require('lodash.isdate')

const hashLeg = l => [l.origin, l.departure, l.destination, l.arrival, l.line.id].join('_')
// const hashJourney = j => j.legs.map(l => l.schedule).join('_')

const createJourney = day => j => {
    const departure = moment.tz(`${day}_${j.d}`, 'YYYY-MM-DD_HH:mm', 'Europe/Podgorica')
    let arrival = moment.tz(`${day}_${j.a}`, 'YYYY-MM-DD_HH:mm', 'Europe/Podgorica')

    if (+departure > +arrival) arrival = arrival.add(1, 'days')

    const leg = {
        id: j.i,
        origin: j.f,
        destination: j.l,
        departure: departure.format(),
        arrival: arrival.format(),
        mode: 'train',
        public: true,
        operator: 'ŽPCG',
        line: {
            type: 'line',
            id: j.n,
            name: j.n,
            product: j.t,
            mode: 'train',
            public: true,
            operator: 'ŽPCG'
        }
    }

    leg.schedule = hashLeg(leg)

    const journey = {
        id: leg.schedule,
        legs: [leg]
    }

    return journey
}

const journeys = async (origin, destination, date = new Date()) => {
    if(isString(origin)) origin = {id: origin, type: 'station'}
    if(!isString(origin.id)) throw new Error('invalid or missing origin id')
    if(origin.type !== 'station') throw new Error('invalid or missing origin type')
    origin = origin.id

    if(isString(destination)) destination = {id: destination, type: 'station'}
    if(!isString(destination.id)) throw new Error('invalid or missing destination id')
    if(destination.type !== 'station') throw new Error('invalid or missing destination type')
    destination = destination.id

    if(!isDate(date)){
        throw new Error('`date` must be a JS Date() object')
    }
    const day = moment.tz(date, 'Europe/Podgorica').format('YYYY-MM-DD')

    const results = await (got.get('http://zpcg.me/', {
        json: true,
        query: {
            r: 'api/search',
            from: origin,
            to: destination,
            // date: day,
            date: day,
            locale: 'en_UK' // todo
        }
    }).then(res => res.body))

    if (results.length !== 1) throw new Error('unexpected result length, please report this issue')

    return (results[0].s || []).map(createJourney(day))
}

module.exports = journeys
