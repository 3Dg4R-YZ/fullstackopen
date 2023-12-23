import axios from 'axios'
import { useEffect, useState } from 'react'
import { Languages } from './Languages'
import { Weather } from './Weather'

export const FullCountry = ({ country }) => {
	const [data, setData] = useState()

	const link = `https://restcountries.com/v3.1/name/${country.name.common}`
	useEffect(() => {
		axios
			.get(link)
			.then((res) => {
				const { data } = res
				setData(data[0])
			})
			.catch((error) => {
				console.log(error)
			})
	}, [link])
	if (!data) return null
	const languages = Object.values(data.languages)
	const flag = data.flags
	return (
		<div>
			<h1>{data.name.common}</h1>
			<p>capital {data.capital[0]}</p>
			<p>population {data.population}</p>
			<Languages languages={languages} />
			<img src={flag.png} alt={flag.alt} />
			<Weather city={data.capital[0]} />
		</div>
	)
}
