const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');
const clearBtns = document.querySelectorAll('.clear-btn');
const decimalBtn = document.getElementById('decimal');
const display = document.getElementById('display');

let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';

const decimal = (argument) => {
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
};


const isPositiveNum = (event) => {
  let numSign = display.value;
  numSign = numSign * -1;
  display.value = numSign;
};

const clear = (id) => {
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
};


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

let sqrt = false;

const operationPress = (op) => {
  let localOperationMemory = +display.value;

  if (
    MemoryNewNumber &&
    MemoryPendingOperation !== '=' &&
    MemoryPendingOperation !== '√'
  ) {
    display.value = MemoryCurrentNumber;
  } else {
    MemoryNewNumber = true;

    if (MemoryPendingOperation === '+') {
      MemoryCurrentNumber += localOperationMemory;
    } else if (MemoryPendingOperation === '-') {
      MemoryCurrentNumber -= localOperationMemory;
    } else if (MemoryPendingOperation === '*') {
      MemoryCurrentNumber *= localOperationMemory;
    } else if (MemoryPendingOperation === '/') {
      MemoryCurrentNumber /= localOperationMemory;
    } else if (op === '√') {
      if (localOperationMemory < 0) {
        display.value = 'Учи математику';
        localOperationMemory = '0';
        return;
      }

      MemoryCurrentNumber = Math.sqrt(localOperationMemory);
      display.value = MemoryCurrentNumber;
    } else if (MemoryPendingOperation === 'x**y') {
      MemoryCurrentNumber = Math.pow(MemoryCurrentNumber, localOperationMemory);
    } else {
      MemoryCurrentNumber = localOperationMemory;
    }

    display.value = Number(MemoryCurrentNumber.toFixed(12));
    MemoryPendingOperation = op;
  }
};

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    clear('c');
  }
  if (event.key === 'Backspace') {
    clear('ce');
  }

  if (event.key === 'Enter') {
    operationPress('=');
  }
  if (!isNaN(event.key * 1)) {
    numberPress(event.key);
  }

  if (event.key.match(/[+\-*/]/)) {
    operationPress(event.key);
  }

  if (event.key === '.') {
    decimal('.');
  }
});

const changeNum = document.getElementById('plus-minus');
changeNum.addEventListener('click', isPositiveNum);


