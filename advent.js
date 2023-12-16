function drawGift(size, symbol) {
	if (size === 1) return '#\n'
	let wall = '#'.padEnd(size - 1, symbol) + '#',
		column = ''.padEnd(size - 1, '#'),
		paths = [],
		result = []

	paths.push(column)

	for (let i = 0; i < size - 2; i++) {
		paths.push(wall + ''.padEnd(i, symbol))
	}
	paths.push(column + wall.substring(0, wall.length - 1))

	for (let i = 0; i < size; i++) {
		result.push(paths[i].padStart(2 * size - 2, ' '))
	}
	for (let i = size - 2; i >= 0; i--) {
		result.push(paths[i])
	}
	result.push('')

	return result.join('#\n')
}

const result = drawGift(4, '+')
console.log(result) // -> 2
