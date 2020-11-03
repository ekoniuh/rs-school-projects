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
  },

  init() {
    alert(
      'Здравствуйте. Если вас не затруднит, не могли бы проверить к концу недели? ЖЫВЕ БЕЛАРУСЬ!'
    );
    document.addEventListener('keydown', (e) => {
      for (const key of this.elements.keys) {
        if (e.key === key.textContent) {
          key.classList.add('keyboard__key--activeK')
        } else if (e.code === 'CapsLock' && key.innerHTML === 'keyboard_capslock') {

          key.classList.add('keyboard__key--activeK')
          key.classList.toggle('keyboard__key--active')
        }
      }
    })

    document.addEventListener('keyup', (e) => {
      for (const key of this.elements.keys) {
        if (e.key === key.textContent) {
          key.classList.remove('keyboard__key--activeK')
        }
      }
    })


    // Create main elements

    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Setup main elements
    this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(
      '.keyboard__key'
    );

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
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
    const enKeyboard = document.createElement('div');
    const fragment = document.createDocumentFragment();
    const ruKeyboard = document.createElement('div');
    
    enKeyboard.classList.add('en-keyboard-wrapper');
    ruKeyboard.classList.add('ru-keyboard-wrapper');
    ruKeyboard.classList.add('locale-keyboard--hidden');
    
    const fragmentRU = document.createDocumentFragment();
    const fragmentEN = document.createDocumentFragment();

    const keyLayout = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter',
      'done', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
      'en', 'shift', 'space', 'arrow-back', 'arrow-forward',
    ];

    const keyLayoutRu = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
      'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
      'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
      'caps', 'done', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
      'ru', 'shift', 'space', 'arrow-back', 'arrow-forward',
    ];

    const keyLayoutShiftEn = [
      ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&amp;'], ['8', '*'], ['9', '('], ['0', ')'],

    ];
    
    const keyLayoutShiftRu = [
      ['1', '!'], ['2', '"'], ['3', '№'], ['4', ';'], ['5', '%'], ['6', ':'], ['7', '?'], ['8', '*'], ['9', '('], ['0', ')'],
    ];

    this.properties.keyLayoutShiftEn = keyLayoutShiftEn;
    this.properties.keyLayoutShiftRu = keyLayoutShiftRu;

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    let keyboardEN = function(key) {
      return keyboardCommon.call(this, key, ['backspace', 'p', 'enter', '?'], fragmentEN, 'en');
    }

    let keyboardRU = function(key) {
      return keyboardCommon.call(this, key, ['backspace', 'ъ', 'enter', '.'], fragmentRU, 'ru');
    }

    keyboardEN = keyboardEN.bind(this);
    keyboardRU = keyboardRU.bind(this);

    //EN keyboard
    keyLayout.forEach(keyboardEN) ;
    keyLayoutRu.forEach(keyboardRU) ;


    function keyboardCommon(key, insertLineBreakMarkers, fragment, layout) {
      const keyElement = document.createElement('button');
      const insertLineBreak = insertLineBreakMarkers.indexOf(key) !== -1;

      // Add attributes/classes
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
              keyElement.classList.toggle(
                'keyboard__key--dark'
              );
            }
          } else {
            this.properties.changeShiftState = () => {
              keyElement.classList.toggle(
                'keyboard__key--dark'
              );
            }
          }

          keyElement.addEventListener('click', () => {
            this._toggleCapsLock(true);
            document.querySelector('.shift').play();


          });
          break;

        case 'caps':
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--activatable'
          );
          keyElement.innerHTML = createIconHTML('keyboard_capslock');

          keyElement.addEventListener('click', () => {
            document.querySelector('.capslock').play();
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

            document.querySelector('.backspace').play();

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

            document.querySelector('.enter').play();

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
            document.querySelector('.space').play();
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

            document.querySelector('.back-arrow').play();

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

            document.querySelector('.for-arrow').play();
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

            document.querySelector('.click-one').play();
            this.close();
            this._triggerEvent('onclose');
          });
          break;

        case 'en':
        case 'ru':
          keyElement.innerHTML = key;

          keyElement.addEventListener('click', () => {



            document.querySelector('.layout-cl').play();
            enKeyboard.classList.toggle('locale-keyboard--hidden');
            ruKeyboard.classList.toggle('locale-keyboard--hidden');

            if (this.properties.layoutLang === 'en') {
                this.properties.layoutLang = 'ru'
            } else {
                this.properties.layoutLang = 'en'
            };
            
            this._redrawButtons();
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.dataset.keyValue = key.toLowerCase();
          keyElement.dataset.layout = layout;

          keyElement.addEventListener('click', () => {

            document.querySelector('.click-one').play();
             let nextLetter = (this.properties.capsLock && !this.properties.shiftCaps) ||
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
    };


    enKeyboard.appendChild(fragmentEN);
    ruKeyboard.appendChild(fragmentRU);

    fragment.appendChild(enKeyboard);
    fragment.appendChild(ruKeyboard);

    return fragment;
  },

  changeByShift (key) {

    const keyLayoutShiftEn = this.properties.keyLayoutShiftEn;
    const keyLayoutShiftRu = this.properties.keyLayoutShiftRu;

    let hasResult = false;
    if (this.properties.layoutLang === 'en') {

      for (let i = 0; i < keyLayoutShiftEn.length; i++ ) {
        if (key.dataset.keyValue === keyLayoutShiftEn[i][0] && key.dataset.layout === 'en') {
          hasResult = true;
          if (this.properties.shiftCaps) {
            key.innerHTML = keyLayoutShiftEn[i][1];
          } else {
            key.textContent = keyLayoutShiftEn[i][0];
          }
        }
      }
    } else {
      for (let i = 0; i < keyLayoutShiftRu.length; i++ ) {
        if (key.dataset.keyValue === keyLayoutShiftRu[i][0] && key.dataset.layout === 'ru') {
          hasResult = true;
          if (this.properties.shiftCaps) {
            key.innerHTML = keyLayoutShiftRu[i][1];
          } else {
            key.textContent = keyLayoutShiftRu[i][0];
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

    this._redrawButtons();
  },

  _redrawButtons() {
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
