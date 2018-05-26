'use strict'

const got = require('got')

const createStation = station => ({
	type: 'station',
	id: station,
	name: station
})

const stations = async () => {
	const stations = await (got.get('http://zpcg.me/', {
		json: true,
		query: {
			r: 'api/stations',
			locale: 'en_UK' // todo
		}
	}).then(res => res.body))

	return stations.map(createStation)
}

module.exports = stations
