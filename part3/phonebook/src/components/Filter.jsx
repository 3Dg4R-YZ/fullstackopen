export const Filter = ({ filter, setFilter }) => {
	return (
		<div>
			filter shown with{' '}
			<input
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
				onKeyDown={(e) => {
					if (e.code === 'Enter') setFilter('')
				}}
			/>
		</div>
	)
}
