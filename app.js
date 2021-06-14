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

function square(numbers) {
	return numbers[0]**numbers[1];
}

function operate(operator, numbers) {
	return operator(numbers);
}

function displayNum(e) {
	if(current_operator === '=') {clearAll()};
	if(display.innerText.length === 12) {
		alert('You cannot enter more than 12 digits');
		clearDisplay();
		emptyOperands();
	}
	if(Number(display.innerText) == current_ans || display.innerText.includes('e') || Number(display.innerText) == final_ans || current_operator == '=') {display.innerText = ''}
	if (e.target.innerText === '.' && display.innerText.includes('.')) {return;};

	if (e.target.innerText === '±' && display.innerText.includes('-')) {
		display.innerText = display.innerText.slice(1);
		return;
	} else if (e.target.innerText === '±'){
		display.innerText = '-' + display.innerText;
		return;
	}

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

function deleteLast() {
	let str = display.innerText
	let new_str = str.slice(0, str.length-1);
	display.innerText = new_str;
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
			ans = operate(square, operands);
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
	if (current_operator === e.key || current_operator === e.target.innerText) {
		return;
	}
	let last_operator;
	if (current_operator === '=' && (e instanceof KeyboardEvent)) {
		current_operator = e.key;
		return;
	}else if (current_operator === '=') {
		current_operator = e.target.innerText;
		return
	}
	storeNum();
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
		if(String(current_ans).length >= 12) {
			display.innerText=current_ans.toExponential(2);
		}else {
			display.innerText = current_ans;
		}
	}
}

function finalAnswer() {
	storeNum();
	clearDisplay();
	if (operands.length > 1) {
		final_ans = evaluate(current_operator)
		operands.splice(0);
		operands.push(final_ans);
		if(String(final_ans).length >=12) {
			display.innerText=final_ans.toExponential(2);
		} else {
			display.innerText=final_ans;
		}
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
const del = document.querySelector('.delete');
const operands = [];
let current_operator = null;
let current_ans;
let final_ans;

digits.forEach(digit => digit.addEventListener('click', displayNum));
operators.forEach(operator => operator.addEventListener('click', updateOperator));
equals.addEventListener('click', finalAnswer);
clear.addEventListener('click', clearAll);
del.addEventListener('click', deleteLast);

function getKey(e) {
	let key = e.key;
	if(key == 1 ||
		key == 2 ||
		key == 3 ||
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
	} else if (key == '=' || key == 'Enter') {
		finalAnswer()
	} else if (key == 'Backspace') {
		deleteLast();
	}else{
		return;
	}
}
document.addEventListener('keyup', getKey);
