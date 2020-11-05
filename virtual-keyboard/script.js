const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: '',
    capsLock: false,
    shiftCaps: false,
    cursorPosition: 0,
    changeShiftState: null,
    layoutLang: 'en',
    soundONOFF: true,
  },

  init() {
    document.addEventListener('keydown', (e) => {
      for (const key of this.elements.keys) {
        if (e.key === key.textContent) {
          key.classList.add('keyboard__key--activeKB');
        } else if (
          e.code === 'CapsLock' &&
          key.textContent === 'keyboard_capslock'
        ) {
          if (
            key.parentNode.classList.contains(
              `${this.properties.layoutLang}-keyboard-wrapper`
            )
          ) {
            this.volume('capslock', this.properties.layoutLang);

            this._toggleCapsLock();
            key.classList.toggle(
              'keyboard__key--active',
              this.properties.capsLock
            );
            key.classList.add('keyboard__key--activeKB');
          }
        } else if (
          e.code === 'Enter' &&
          key.textContent === 'keyboard_return'
        ) {
          this.volume('enter', this.properties.layoutLang);
          key.classList.add('keyboard__key--activeKB');
        } else if (e.code === 'Backspace' && key.textContent === 'backspace') {
          if (this.properties.soundONOFF) {
            this.volume('backspace', this.properties.layoutLang);
          }
          key.classList.add('keyboard__key--activeKB');
        } else if (e.code === 'Space' && key.textContent === 'space_bar') {
          this.volume('space', this.properties.layoutLang);
          key.classList.add('keyboard__key--activeKB');
        } else if (e.code === 'ArrowLeft' && key.textContent === 'arrow_back') {
          this.volume('back-arrow', this.properties.layoutLang);
          key.classList.add('keyboard__key--activeKB');
        } else if (
          e.code === 'ArrowRight' &&
          key.textContent === 'arrow_forward'
        ) {
          this.volume('for-arrow', this.properties.layoutLang);
          key.classList.add('keyboard__key--activeKB');
        } else if (
          (e.code === 'ShiftLeft' && key.textContent === 'shift') ||
          (e.code === 'ShiftRight' && key.textContent === 'shift')
        ) {
          this.volume('shift', this.properties.layoutLang);
          if (
            key.parentNode.classList.contains(
              `${this.properties.layoutLang}-keyboard-wrapper`
            )
          ) {
            key.classList.add('keyboard__key--activeKB');
            this._toggleCapsLock(true);
          }
        }
      }
    });

    document.addEventListener('keyup', (e) => {
      for (const key of this.elements.keys) {
        if (e.key === key.textContent) {
          key.classList.remove('keyboard__key--activeKB');
        } else if (
          e.code === 'CapsLock' &&
          key.textContent === 'keyboard_capslock'
        ) {
          key.classList.remove('keyboard__key--activeKB');
        } else if (
          e.code === 'Enter' &&
          key.textContent === 'keyboard_return'
        ) {
          key.classList.remove('keyboard__key--activeKB');
        } else if (e.code === 'Backspace' && key.textContent === 'backspace') {
          key.classList.remove('keyboard__key--activeKB');
        } else if (e.code === 'Space' && key.textContent === 'space_bar') {
          key.classList.remove('keyboard__key--activeKB');
        } else if (e.code === 'ArrowLeft' && key.textContent === 'arrow_back') {
          key.classList.remove('keyboard__key--activeKB');
        } else if (
          e.code === 'ArrowRight' &&
          key.textContent === 'arrow_forward'
        ) {
          key.classList.remove('keyboard__key--activeKB');
        } else if (
          (e.code === 'ShiftLeft' || e.code === 'ShiftRight') &&
          key.textContent.toLowerCase() === 'shift'
        ) {
          if (
            key.parentNode.classList.contains(
              `${this.properties.layoutLang}-keyboard-wrapper`
            )
          ) {
            key.classList.remove('keyboard__key--activeKB');

            this._toggleCapsLock(true);
          }
        }
      }
    });

 
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Setup main elements
    this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(
      '.keyboard__key'
    );

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    document.querySelectorAll('.use-keyboard-input').forEach((element) => {
      element.addEventListener('focus', () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    const mainInput = document.querySelector('.use-keyboard-input');
    const fragment = document.createDocumentFragment();
    const enKeyboard = document.createElement('div');
    enKeyboard.classList.add('en-keyboard-wrapper');

    const ruKeyboard = document.createElement('div');
    ruKeyboard.classList.add('ru-keyboard-wrapper');
    ruKeyboard.classList.add('locale-keyboard--hidden');

    const fragmentEN = document.createDocumentFragment();
    const fragmentRU = document.createDocumentFragment();

    const keyLayout = [
      'sound',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      'backspace',
      'q',
      'w',
      'e',
      'r',
      't',
      'y',
      'u',
      'i',
      'o',
      'p',
      'caps',
      'a',
      's',
      'd',
      'f',
      'g',
      'h',
      'j',
      'k',
      'l',
      'enter',
      'done',
      'z',
      'x',
      'c',
      'v',
      'b',
      'n',
      'm',
      ',',
      '.',
      '?',
      'en',
      'shift',
      'space',
      'arrow-back',
      'arrow-forward',
    ];

    const keyLayoutRU = [
      'sound',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      'backspace',
      'й',
      'ц',
      'у',
      'к',
      'е',
      'н',
      'г',
      'ш',
      'щ',
      'з',
      'х',
      'ъ',
      'ф',
      'ы',
      'в',
      'а',
      'п',
      'р',
      'о',
      'л',
      'д',
      'ж',
      'э',
      'enter',
      'caps',
      'done',
      'я',
      'ч',
      'с',
      'м',
      'и',
      'т',
      'ь',
      'б',
      'ю',
      '.',
      'ru',
      'shift',
      'space',
      'arrow-back',
      'arrow-forward',
    ];

    const keyLayoutShiftEN = [
      ['1', '!'],
      ['2', '@'],
      ['3', '#'],
      ['4', '$'],
      ['5', '%'],
      ['6', '^'],
      ['7', '&amp;'],
      ['8', '*'],
      ['9', '('],
      ['0', ')'],
    ];
    
    this.properties.keyLayoutShiftEN = keyLayoutShiftEN;

    const keyLayoutShiftRU = [
      ['1', '!'],
      ['2', '"'],
      ['3', '№'],
      ['4', ';'],
      ['5', '%'],
      ['6', ':'],
      ['7', '?'],
      ['8', '*'],
      ['9', '('],
      ['0', ')'],
    ];

    this.properties.keyLayoutShiftRU = keyLayoutShiftRU;

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    let keyboardEN = function (key) {
      return keyboardCommon.call(
        this,
        key,
        ['backspace', 'p', 'enter', '?'],
        fragmentEN,
        'en'
      );
    };

    let keyboardRU = function (key) {
      return keyboardCommon.call(
        this,
        key,
        ['backspace', 'ъ', 'enter', '.'],
        fragmentRU,
        'ru'
      );
    };

    keyboardEN = keyboardEN.bind(this);
    keyboardRU = keyboardRU.bind(this);

    //EN keyboard
    keyLayout.forEach(keyboardEN);
    keyLayoutRU.forEach(keyboardRU);

    function keyboardCommon(key, insertLineBreakMarkers, fragment, layout) {
      const keyElement = document.createElement('button');
      const insertLineBreak = insertLineBreakMarkers.indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        
        case 'shift':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = 'shift';
          
          if (this.properties.changeShiftState) {
            let previousChangeShiftState = this.properties.changeShiftState;
            this.properties.changeShiftState = () => {
              previousChangeShiftState();
              keyElement.classList.toggle('keyboard__key--dark');
            };
          } else {
            this.properties.changeShiftState = () => {
              keyElement.classList.toggle('keyboard__key--dark');
            };
          }

          keyElement.addEventListener('click', () => {
            this._toggleCapsLock(true);
            
            this.volume('shift', this.properties.layoutLang);
          });
          break;
          
          case 'sound':
            keyElement.classList.add('keyboard__key--round');
            if (this.properties.soundONOFF) {
              keyElement.innerHTML = createIconHTML('volume_up');
            } else {
              keyElement.innerHTML = createIconHTML('volume_off');
            }
  
            keyElement.addEventListener('click', () => {
              this.properties.soundONOFF = !this.properties.soundONOFF;
  
              if (this.properties.soundONOFF) {
                keyElement.innerHTML = createIconHTML('volume_up');
              } else {
                keyElement.innerHTML = createIconHTML('volume_off');
              }
            });
  
            break;
        case 'caps':
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--activatable'
          );

          keyElement.innerHTML = createIconHTML('keyboard_capslock');

          keyElement.addEventListener('click', () => {
            this.volume('capslock', this.properties.layoutLang);

            this._toggleCapsLock();
            keyElement.classList.toggle(
              'keyboard__key--active',
              this.properties.capsLock
            );
          });
          break;

        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('backspace');

          keyElement.addEventListener('click', () => {
            this.volume('backspace', this.properties.layoutLang);

            let result = this.properties.value.split('');
            result.splice(this.properties.cursorPosition - 1, 1);
            result = result.join('');
            this.properties.value = result;
            this.properties.cursorPosition--;

            this._triggerEvent('oninput');

            mainInput.focus();
            mainInput.selectionStart = this.properties.cursorPosition;
            mainInput.selectionEnd = this.properties.cursorPosition;
          });

          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('keyboard_return');

          keyElement.addEventListener('click', () => {
            this.volume('enter', this.properties.layoutLang);

            let result = this.properties.value.split('');
            result.splice(this.properties.cursorPosition, 0, '\n');
            result = result.join('');
            this.properties.value = result;
            this.properties.cursorPosition++;

            this._triggerEvent('oninput');

            mainInput.focus();
            mainInput.selectionStart = this.properties.cursorPosition;
            mainInput.selectionEnd = this.properties.cursorPosition;
          });

          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.innerHTML = createIconHTML('space_bar');

          keyElement.addEventListener('click', () => {
            this.volume('space', this.properties.layoutLang);

            let result = this.properties.value.split('');
            result.splice(this.properties.cursorPosition, 0, ' ');
            result = result.join('');
            this.properties.value = result;
            this.properties.cursorPosition++;

            this._triggerEvent('oninput');

            mainInput.focus();
            mainInput.selectionStart = this.properties.cursorPosition;
            mainInput.selectionEnd = this.properties.cursorPosition;
          });

          break;

        case 'arrow-back':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('arrow_back');
          keyElement.addEventListener('click', () => {
            this.volume('back-arrow', this.properties.layoutLang);

            const currentCursorPosition = mainInput.selectionStart;
            mainInput.selectionStart = currentCursorPosition - 1;
            mainInput.selectionEnd = currentCursorPosition - 1;

            this.properties.cursorPosition = currentCursorPosition - 1;

            mainInput.focus();

            this._triggerEvent('oninput');
          });

          break;

        case 'arrow-forward':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('arrow_forward');
          keyElement.addEventListener('click', () => {
            this.volume('for-arrow', this.properties.layoutLang);
            const currentCursorPosition = mainInput.selectionStart;
            mainInput.selectionStart = currentCursorPosition + 1;
            mainInput.selectionEnd = currentCursorPosition + 1;

            this.properties.cursorPosition = currentCursorPosition + 1;

            mainInput.focus();

            this._triggerEvent('oninput');
          });
          break;

        case 'done':
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--dark'
          );
          keyElement.innerHTML = createIconHTML('check_circle');

          keyElement.addEventListener('click', () => {
            this.volume('click-one', this.properties.layoutLang);
            this.close();
            this._triggerEvent('onclose');
          });
          break;

        case 'en':
        case 'ru':
          keyElement.innerHTML = key;

          keyElement.addEventListener('click', () => {
            this.volume('layout-cl', this.properties.layoutLang);
            enKeyboard.classList.toggle('locale-keyboard--hidden');
            ruKeyboard.classList.toggle('locale-keyboard--hidden');

            if (this.properties.layoutLang === 'en') {
              this.properties.layoutLang = 'ru';
            } else {
              this.properties.layoutLang = 'en';
            }

            this.redRawButtons();
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.dataset.keyValue = key.toLowerCase();
          keyElement.dataset.layout = layout;

          keyElement.addEventListener('click', () => {
            this.volume('click-one', this.properties.layoutLang);

            let nextLetter =
              (this.properties.capsLock && !this.properties.shiftCaps) ||
              (!this.properties.capsLock && this.properties.shiftCaps)
                ? key.toUpperCase()
                : key.toLowerCase();

            const numberLayoutKey = this.changeByShift(keyElement);
            if (numberLayoutKey) {
              nextLetter = numberLayoutKey;
            }

            let result = this.properties.value.split('');
            result.splice(this.properties.cursorPosition, 0, nextLetter);
            result = result.join('');
            this.properties.value = result;
            this.properties.cursorPosition++;

            this._triggerEvent('oninput');

            mainInput.focus();
            mainInput.selectionStart = this.properties.cursorPosition;
            mainInput.selectionEnd = this.properties.cursorPosition;

            if (this.properties.shiftCaps) {
              this._toggleCapsLock(true);
            }
          });
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    }

    enKeyboard.appendChild(fragmentEN);
    ruKeyboard.appendChild(fragmentRU);

    fragment.appendChild(enKeyboard);
    fragment.appendChild(ruKeyboard);

    return fragment;
  },

  changeByShift(key) {
    const keyLayoutShiftEN = this.properties.keyLayoutShiftEN;
    const keyLayoutShiftRU = this.properties.keyLayoutShiftRU;

    let hasResult = false;
    if (this.properties.layoutLang === 'en') {
      for (let i = 0; i < keyLayoutShiftEN.length; i++) {
        if (
          key.dataset.keyValue === keyLayoutShiftEN[i][0] &&
          key.dataset.layout === 'en'
        ) {
          hasResult = true;
          if (this.properties.shiftCaps) {
            key.innerHTML = keyLayoutShiftEN[i][1];
          } else {
            key.textContent = keyLayoutShiftEN[i][0];
          }
        }
      }
    } else {
      for (let i = 0; i < keyLayoutShiftRU.length; i++) {
        if (
          key.dataset.keyValue === keyLayoutShiftRU[i][0] &&
          key.dataset.layout === 'ru'
        ) {
          hasResult = true;
          if (this.properties.shiftCaps) {
            key.innerHTML = keyLayoutShiftRU[i][1];
          } else {
            key.textContent = keyLayoutShiftRU[i][0];
          }
        }
      }
    }

    return hasResult && key.textContent;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock(shift) {
    if (!shift) {
      this.properties.capsLock = !this.properties.capsLock;
    } else {
      this.properties.shiftCaps = !this.properties.shiftCaps;
      this.properties.changeShiftState();
    }

    this.redRawButtons();
  },

  redRawButtons() {
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent =
          (this.properties.capsLock && !this.properties.shiftCaps) ||
          (!this.properties.capsLock && this.properties.shiftCaps)
            ? key.textContent.toUpperCase()
            : key.textContent.toLowerCase();

        this.changeByShift(key);
      }
    }
  },

  volume(select, layout) {
    if (this.properties.soundONOFF) {
      let audioElem = document.querySelector('.' + select);
      audioElem.src = `./assets/${select}.mp3`;
      audioElem.pause();
      audioElem.currentTime = 0;
      audioElem.play();
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove('keyboard--hidden');
  },

  close() {
    this.properties.value = '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add('keyboard--hidden');
  },
};

window.addEventListener('DOMContentLoaded', function () {
  Keyboard.init();
});
