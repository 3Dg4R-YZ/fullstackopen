import { useState } from 'react'

const Title = ({ title }) => <h2>{title}</h2>
const Button = ({ handelClick, text }) => (
	<button onClick={handelClick}>{text}</button>
)
const StatisticLine = ({ text, value }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
)
const Statistics = ({ good, neutral, bad }) => {
	const all = good + neutral + bad
	const average = (good - bad) / all
	const positive = (good * 100) / all + ' %'

	const isFeedback = all !== 0
	if (!isFeedback) return <p>No feedback given</p>
	return (
		<table>
			<tbody>
				<StatisticLine text={'good'} value={good} />
				<StatisticLine text={'neutral'} value={neutral} />
				<StatisticLine text={'bad'} value={bad} />
				<StatisticLine text={'all'} value={all} />
				<StatisticLine text={'average'} value={average} />
				<StatisticLine text={'positive'} value={positive} />
			</tbody>
		</table>
	)
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<>
			<Title title={'give feedback'} />
			<Button handelClick={() => setGood(good + 1)} text={'good'} />
			<Button handelClick={() => setNeutral(neutral + 1)} text={'neutral'} />
			<Button handelClick={() => setBad(bad + 1)} text={'bad'} />
			<Title title={'statistics'} />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</>
	)
}

export default App
