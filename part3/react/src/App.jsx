import { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter } from './components/Filter'
import { Countries } from './components/Countries'

const App = () => {
	const [serverData, setServerData] = useState([])
	const [filter, setFilter] = useState('')

	const showCountry = (country) => {
		setServerData([country])
	}

	useEffect(() => {
		if (!filter) return
		axios
			.get(`https://restcountries.com/v3.1/name/${filter}?fields=name`)
			.then((res) => {
				const { data } = res
				setServerData(data)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [filter])

	return (
		<>
			<Filter filter={filter} setFilter={setFilter} />
			<Countries countries={serverData} showCountry={showCountry} />
		</>
	)
}

export default App
