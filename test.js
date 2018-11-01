'use strict'

const tape = require('tape')
const validate = require('validate-fptf')
const isString = require('lodash.isstring')
const moment = require('moment-timezone')
const zpcg = require('.')

tape('zpcg.stations', async (t) => {
	const s = await zpcg.stations()
	t.ok(s.length > 20, 'stations length')

	s.forEach(s => validate(s))

	const podgorica = s.find(x => x.id === 'Podgorica')
	t.ok(podgorica.name === 'Podgorica', 'podgorica name')

	t.end()
})

tape('zpcg.journeys', async (t) => {
	const j = await zpcg.journeys('Podgorica', 'Belgrade', moment.tz('Europe/Podgorica').add(3, 'days').startOf('day').toDate())

	t.ok(j.length === 2, 'journeys length')

	for (let journey of j) {
		validate(journey)

		t.ok(journey.legs.length === 1, 'legs length')
		t.ok(journey.legs[0].origin === 'Podgorica', 'origin id')
		t.ok(journey.legs[journey.legs.length-1].destination === 'Belgrade', 'destination id')

		for (let l of journey.legs) {
			t.ok(l.operator === 'ŽPCG', 'leg operator')
			t.ok(l.line.operator === 'ŽPCG', 'leg line operator')
			t.ok(l.line.id.length > 0, 'leg line id')
			t.ok(l.line.name.length > 0, 'leg line name')
			t.ok(l.line.product.length > 0, 'leg line product')
		}
	}

	t.end()
})

tape('zpcg.journeyLeg', async (t) => {
	const date = moment.tz('Europe/Podgorica').add(3, 'days').startOf('day').toDate()
	const j = await zpcg.journeyLeg('187', date)

	t.ok(j.length > 5, 'journeyLeg length')

	for (let stopover of j) {
		t.ok(isString(stopover.station) && stopover.station.length > 0, 'station')

		// check departure/arrival
		t.ok(stopover.departure || stopover.arrival, 'departure/arrival')
		if (stopover.arrival) {
			t.ok(+new Date(stopover.arrival) >= +date, 'arrival')
			t.ok(+new Date(stopover.arrival) <= +date+3*24*60*60*1000, 'arrival')
		}
		if (stopover.departure) {
			t.ok(+new Date(stopover.departure) >= +date, 'departure')
			t.ok(+new Date(stopover.departure) <= +date+3*24*60*60*1000, 'departure')
		}
		if (stopover.arrival && stopover.departure) {
			t.ok(+new Date(stopover.arrival) <= +new Date(stopover.departure), 'arrival before departure')
		}

		// check prices
		t.ok(stopover.price.currency === 'EUR', 'price currency')
		t.ok(stopover.price.class === 2, 'price class')
		t.ok(Array.isArray(stopover.price.tariffs), 'price tariffs')
		for (let tariff of stopover.price.tariffs) {
			t.ok(tariff.currency === 'EUR', 'tariff currency')
			t.ok([1, 2].includes(tariff.class), 'tariff class')
			if (stopover.arrival) {
				t.ok(tariff.amount > 0, 'tariff amount')
			} else {
				t.ok(tariff.amount === 0, 'tariff amount')
			}
		}
		if (stopover.arrival) {
			t.ok(stopover.price.amount > 0, 'price amount')
		} else {
			t.ok(stopover.price.amount === 0, 'price amount')
		}
	}

	t.end()
})
