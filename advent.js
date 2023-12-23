function checkIsValidCopy(original, copy) {
	const min = /[a-z]/
	const may = /[A-Z]/
	const char = ['#', '+', ':', '.', ' ']

	const rev = (el, el2) => {
		if (may.test(el)) return !(el === el2.toUpperCase() || char.includes(el2))
		else if (min.test(el)) return !(el === el2 || char.includes(el2))
		else if (char.includes(el))
			return !(
				char.findIndex((inx) => el === inx) <=
				char.findIndex((inx) => el2 === inx)
			)
		else return false
	}

	for (let i = 0; i < original.length; i++) {
		const el = original[i]
		const el2 = copy[i]
		if (rev(el, el2)) return false
	}
	return true
}

console.log(checkIsValidCopy('Santa Claus', 's#+:. c:. s'))
