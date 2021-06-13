function add(numbers) {
	let sum = 0;
	for(let num of numbers) {
		sum+=num;
	}
	return sum;
}

function subtract(numbers) {
	let difference = numbers[0];
	numbers.shift();
	for(let num of numbers) {
		difference-=num;
	}
	return difference;
}

function multiply(numbers) {
	let product = numbers[0];
	numbers.shift();
	for(let num of numbers) {
		product*= num;
	}
	return product;
}

function divide(numbers) {
	let quotient = numbers[0];
	numbers.shift();
	for(let num of numbers) {
		quotient/= num;
	}
	return quotient;
}

function operate(operator, numbers) {
	return operator(numbers);
}

function displayNum(e) {
	let num = e.target.innerText;
	const display = document.querySelector('h1');
	display.innerText += num;

}

function clearDisplay() {
	operands.push(Number(document.querySelector('h1').innerText))
	document.querySelector('h1').innerText = '';
}

function storeOperation(e) {
	clearDisplay();
	operator = e.target.innerText;
}

function displayAnswer() {
	clearDisplay();
	switch(true) {
		case (operator === '+'):
			document.querySelector('h1').innerText = operate(add, operands);
			break;
		case (operator === '-'):
			document.querySelector('h1').innerText = operate(subtract, operands);
			break;
		case (operator === 'x'):
			document.querySelector('h1').innerText = operate(multiply, operands);
			break;
		case (operator === '/'):
			document.querySelector('h1').innerText = operate(divide, operands);
			break;
		default:
			document.querySelector('h1').innerText = 0;

	}
	operands = [];
}

const digits = document.querySelectorAll('.num');
digits.forEach(digit => digit.addEventListener('click', displayNum));

const operators = document.querySelectorAll('.operator');
operators.forEach(operator => operator.addEventListener('click', storeOperation));

const answer = document.querySelector('.answer');
answer.addEventListener('click', displayAnswer);

let operands = [];
let operator;
