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
  } else {
    if (display.value === '0') {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

function operationPress(op) {
  let localOperationMemory = display.value;

  if (MemoryNewNumber && MemoryPendingOperation !== '=') {
    display.value = MemoryCurrentNumber;
  }
  // else if (MemoryPendingOperation === '13' && MemoryNewNumber) {
  //   MemoryCurrentNumber = Math.sqrt(+localOperationMemory);
  // }
  else {
    MemoryNewNumber = true;
    if (MemoryPendingOperation === '+') {
      MemoryCurrentNumber += (+localOperationMemory).toFixed(12);
    } else if (MemoryPendingOperation === '-') {
      MemoryCurrentNumber -= +localOperationMemory;
    } else if (MemoryPendingOperation === '*') {
      MemoryCurrentNumber *= +localOperationMemory;
    } else if (MemoryPendingOperation === '/') {
      MemoryCurrentNumber /= +localOperationMemory;
    } else if (MemoryPendingOperation === 'x**y') {
      MemoryCurrentNumber = Math.pow(
        MemoryCurrentNumber,
        +localOperationMemory
      );
    } else {
      MemoryCurrentNumber = +localOperationMemory;
    }
    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = op;
  }
}

function decimal(argument) {
  let localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }
  display.value = localDecimalMemory;
}

function clear(id) {
  if (id === 'ce') {
    display.value = '0';
    MemoryNewNumber = true;
  } else if (id === 'c') {
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  }
}
