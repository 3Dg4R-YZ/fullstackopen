export const Country = ({ country, showCountry }) => {
	const name = country.name.common
	return (
		<>
			<p>
				{name} <button onClick={() => showCountry(country)}>show</button>
			</p>
		</>
	)
}
