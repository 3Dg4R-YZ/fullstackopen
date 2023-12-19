import Content from './Content'
import Total from './Total'
import Header from './Header'

const Course = ({ course }) => {
	const { name, parts } = course
	let all = parts.reduce((acc, curr) => acc + curr.exercises, 0)
	return (
		<div>
			<Header course={name} />
			<Content parts={parts} />
			<Total all={all} />
		</div>
	)
}

export default Course
