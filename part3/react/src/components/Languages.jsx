import { Language } from './Language'

export const Languages = ({ languages }) => {
	return (
		<>
			<h3>languages</h3>
			<ul>
				{languages.map((language, i) => {
					return <Language key={i} language={language} />
				})}
			</ul>
		</>
	)
}
