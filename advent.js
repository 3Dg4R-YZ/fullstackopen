function createChristmasTree(ornaments, height) {
	let c = 0
	let result = ''
	for (let i = 1; i <= height; i++) {
		let temp = []
		for (let j = 0; j < i; j++) {
			temp.push(ornaments[c])
			c = (c + 1) % ornaments.length
		}
		temp = temp.join(' ')
		result += temp.padStart(i + height - 1) + '\n'
	}
	result += ''.padStart(height - 1, ' ') + '|\n'
	return result
}

console.log(createChristmasTree('123', 4))
