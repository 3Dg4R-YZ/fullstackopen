import { Country } from './Country'
import { FullCountry } from './FullCountry'

export const Countries = ({ countries, showCountry }) => {
	if (countries.length > 10) {
		return <p>Too many matches, specify another filter</p>
	} else if (countries.length > 1) {
		return (
			<>
				{countries.map((country) => (
					<Country
						key={country.name.common}
						country={country}
						showCountry={showCountry}
					/>
				))}
			</>
		)
	} else if (countries.length === 1) {
		return (
			<>
				<FullCountry country={countries[0]} />
			</>
		)
	} else {
		return <p>There&#39;s no country</p>
	}
}
