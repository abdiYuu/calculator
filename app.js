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
		if(num === 0) {
			alert('WHAT do you think you\'re doing? Dividing by zero?! Go find another calculator to try and break.');
			clearAll();
		} else {
			quotient/= num;
		}
	}
	return quotient;
}

function modulo(numbers) {
	let remainder= numbers[0]
	numbers.shift();
	for(let num of numbers) {
		remainder%= num
	}
	return remainder;
}

function root(numbers) {
	return Math.sqrt(numbers[0])
}

function operate(operator, numbers) {
	return operator(numbers);
}

function displayNum(e) {
	if(display.innerText.length === 12) {
		alert('You cannot enter more than 12 digits');
		clearDisplay();
		emptyOperands();
	}
	if(Number(display.innerText) === current_ans || Number(display.innerText) === final_ans) {display.innerText = ''}
	if(e instanceof KeyboardEvent) {
		display.innerText+= e.key;
	} else {
		display.innerText+= e.target.innerText;
	}
}

function clearDisplay() {
	display.innerText = ''
}

function storeNum() {
	operands.push(Number(display.innerText))
	clearDisplay();
}

function clearAll() {
	operands.splice(0)
	clearDisplay();
	current_operator = ''
}

function evaluate(operator) {
	let ans;
	switch(true) {
		case (operator === '+'):
			ans =  operate(add, operands);
			break;
		case (operator === '-'):
                        ans =  operate(subtract, operands);
                        break;
		case (operator === 'x' || operator === '*'):
                        ans =  operate(multiply, operands);
                        break;
		case (operator === '/'):
                        ans =  operate(divide, operands);
                        break;
		case (operator === '%'):
                        ans = operate(modulo, operands);
                        break;
		case (operator === '√'):
                        ans = operate(root, operands);
                        break;
		case (operator === 'xʸ'):
			//code
			break;
		default:
			return operands[0];

		}
	if((ans - Math.floor(ans)) !== 0) {
		return ans.toFixed(2);
	}else {
		return ans;
	}
}

function updateOperator(e) {
	let last_operator;
	if (current_operator === '=') {
		current_operator = e.target.innerText;
		return;
	}
	storeNum();
	clearDisplay();
	last_operator = current_operator;
	if(e instanceof KeyboardEvent) {
		current_operator = e.key;
	} else {
		current_operator = e.target.innerText;
	}
	if (operands.length > 1) {
		current_ans = evaluate(last_operator)
		operands.splice(0);
		operands.push(current_ans);
		display.innerText=current_ans;
	}
}

function finalAnswer() {
	storeNum();
	clearDisplay();
	if (operands.length > 1) {
		final_ans = evaluate(current_operator)
		display.innerText=final_ans;
		operands.splice(0);
		operands.push(final_ans);
	}else {
		display.innerText = operands[0]
	}
	current_operator = '=';
}


const display = document.querySelector('p');
const digits = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.answer')
const clear = document.querySelector('.clear');
const operands = [];
let current_operator;
let current_ans;
let final_ans;

digits.forEach(digit => digit.addEventListener('click', displayNum));
operators.forEach(operator => operator.addEventListener('click', updateOperator));
equals.addEventListener('click', finalAnswer);
clear.addEventListener('click', clearAll);

function getKey(e) {
	let key = e.key;
	if(key == 1 ||
		key == 2 ||
		key == 2 ||
		key == 4 ||
		key == 5 ||
		key == 6 ||
		key == 7 ||
		key == 8 ||
		key == 9 ||
		key == 0) {

		displayNum(e);
	} else if ( key == '+' ||
			key == '-' ||
			key == '*' ||
			key == 'x' ||
			key == '/' ||
			key == '%') {
		updateOperator(e)
	} else {
		return;
	}
}
document.addEventListener('keyup', getKey);
