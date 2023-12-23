import axios from 'axios'
import { useEffect, useState } from 'react'

export const Weather = ({ city }) => {
	const [weather, setWeather] = useState('')
	const API_KEY = import.meta.env.VITE_API_KEY
	const link = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`
	useEffect(() => {
		axios.get(link).then((res) => {
			const { data } = res
			setWeather(data.current)
		})
	}, [link])
	if (!weather) return null
	return (
		<div>
			<h4>temperature: {weather.temperature} Celsius</h4>
			<img src={weather.weather_icons[0]} />
			<h4>
				wind: {weather.wind_degree} mph direction {weather.wind_dir}
			</h4>
		</div>
	)
}
