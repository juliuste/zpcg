'use strict'

const got = require('got')
const moment = require('moment-timezone')
const isString = require('lodash.isstring')
const isDate = require('lodash.isdate')

const createStopover = (day, startTime) => s => {
	let arrival, departure
	if (s.a) {
		arrival = moment.tz(`${day}_${s.a}`, 'YYYY-MM-DD_HH:mm', 'Europe/Podgorica')
		if (+arrival < +startTime) arrival = arrival.add(1, 'days')
	}
	if (s.d) {
		departure = moment.tz(`${day}_${s.d}`, 'YYYY-MM-DD_HH:mm', 'Europe/Podgorica')
		if (+departure < +startTime) departure = departure.add(1, 'days')
	}
	if (departure && arrival) {
		if (+departure < +arrival) departure = departure.add(1, 'days')
	}

	const stopover = {
		station: s.s,
		arrival: arrival ? arrival.format() : null,
		departure: departure ? departure.format() : null,
		price: {
			amount: +s.c2,
			currency: 'EUR',
			class: 2,
			tariffs: [
				{
					amount: +s.c1,
					currency: 'EUR',
					class: 1
				},
				{
					amount: +s.c2,
					currency: 'EUR',
					class: 2
				}
			]
		}
	}

	return stopover
}

const journeyLeg = async (id, departure) => {
	if (!isString(id) || id.length === 0) throw new Error('invalid or missing leg id')
	if (!isDate(departure)) throw new Error('invalid or missing departure date')

	const day = moment.tz(departure, 'Europe/Podgorica').format('YYYY-MM-DD')

	const results = await (got.get('http://zpcg.me/', {
		json: true,
		query: {
			r: 'api/details',
			timetable: id,
			locale: 'en_UK' // todo
		}
	}).then(res => res.body))

	if (results.length !== 1) throw new Error('unexpected result length, please report this issue')

	const startTime = +moment.tz(`${day}_${results[0].d[0].d}`, 'YYYY-MM-DD_HH:mm', 'Europe/Podgorica')

	return results[0].d.map(createStopover(day, startTime))
}

module.exports = journeyLeg
