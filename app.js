function add(...numbers) {
	let sum = 0;
	for(let num of numbers) {
		sum+=num;
	}
	return sum;
}

function subtract(...numbers) {
	let difference = numbers[0];
	numbers.shift();
	for(let num of numbers) {
		difference-=num;
	}
	return difference;
}

function multiply(...numbers) {
	let product = numbers[0];
	numbers.shift();
	for(let num of numbers) {
		product*= num;
	}
	return product;
}

function divide(...numbers) {
	let quotient = numbers[0];
	numbers.shift();
	for(let num of numbers) {
		quotient/= num;
	}
	return quotient;
}

function operate(operator, ... numbers) {
	return operator(...numbers);
}
