const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');
const clearBtns = document.querySelectorAll('.clear-btn');
const decimalBtn = document.getElementById('decimal');
const display = document.getElementById('display');

let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';

decimalBtn.addEventListener('click', decimal);

for (let i = 0; i < numbers.length; i++) {
  let number = numbers[i];
  number.addEventListener('click', (e) => numberPress(e.target.textContent));
}

for (let i = 0; i < operations.length; i++) {
  let operationBtn = operations[i];
  operationBtn.addEventListener('click', (e) =>
    operationPress(e.target.textContent)
  );
}

for (let i = 0; i < clearBtns.length; i++) {
  let clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', (e) => clear(e.target.textContent));
}

function numberPress(number) {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  }
  if (display.value === '0') {
    display.value = number;
  }
  display.value += number;
}

function operationPress(operator) {
  let localOperationMemory = display.value;

  if (MemoryNewNumber && MemoryPendingOperation !== '=') {
    display.value = MemoryCurrentNumber;
  } else {
    MemoryNewNumber = true;
    if (MemoryPendingOperation === '+') {
      MemoryCurrentNumber += +localOperationMemory;
    } else if (MemoryPendingOperation === '-') {
      MemoryCurrentNumber -= +localOperationMemory;
    } else if (MemoryPendingOperation === '*') {
      MemoryCurrentNumber *= +localOperationMemory;
    } else if (MemoryPendingOperation === '/') {
      MemoryCurrentNumber /= +localOperationMemory;
    } else {
      MemoryCurrentNumber = +localOperationMemory;
    }
    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = operator;
  }
}

function decimal(arg) {
  let localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  }

  if (localDecimalMemory.indexOf('.') === -1) {
    localDecimalMemory += '.';
  }
  display.value = localDecimalMemory;
}

function clear(id) {
  if (id === 'ce') {
    display.value = '0';
    MemoryNewNumber = true;
  }

  if (id === 'c') {
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  }
}
