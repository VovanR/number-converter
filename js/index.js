/* global Vue */

const EXPONENT_SYMBOL = ['e', 'E'];
const NUMBER_INPUT_KEY_BLACK_LIST = [
  '-',
  '+',
  '=',
  ',',
  '.',
  ' '
];

const DECIMAL_INPUT_KEY_BLACK_LIST = [
  ...NUMBER_INPUT_KEY_BLACK_LIST,
  ...EXPONENT_SYMBOL
];
const DECIMAL_INPUT_KEY_BLACK_LIST_MAP = createIdMap(DECIMAL_INPUT_KEY_BLACK_LIST);

const BINARY_INPUT_KEY_BLACK_LIST = [
  ...NUMBER_INPUT_KEY_BLACK_LIST,
  ...EXPONENT_SYMBOL
];
// Add number key codes from 2 to 9
let i = 10;
while (i-- > 2) {
  BINARY_INPUT_KEY_BLACK_LIST.push(String(i));
}

// Create key map for faster search
const BINARY_INPUT_KEY_BLACK_LIST_MAP = createIdMap(BINARY_INPUT_KEY_BLACK_LIST);

const HEXADECIMAL_INPUT_KEY_BLACK_LIST = [
  ...NUMBER_INPUT_KEY_BLACK_LIST
];
// Create key map for faster search
const HEXADECIMAL_INPUT_KEY_BLACK_LIST_MAP = createIdMap(HEXADECIMAL_INPUT_KEY_BLACK_LIST);

// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: '#app',
  data: {
    value: new Date().getUTCFullYear()
  },
  computed: {
    binaryValue() {
      return decimalToBinary(this.value);
    },
    hexadecimalValue() {
      return decimalToHexadecimal(this.value);
    }
  },
  methods: {
    // Decimal
    onDecimalInput({target: {value}}) {
      this.setValue(Number.parseInt(value, 10));
    },

    onDecimalKeyDown(event) {
      if (DECIMAL_INPUT_KEY_BLACK_LIST_MAP[event.key]) {
        event.preventDefault();
      }
    },

    // Binary
    onBinaryInput({target: {value}}) {
      const currentBinaryValue = this.binaryValue;
      const newBinaryValue = Number.parseInt(value, 2);
      const different = newBinaryValue - currentBinaryValue;

      if (different === -1) {
        this.decrease();
      } else if (different === 1) {
        this.increase();
      } else {
        this.setValue(binaryToDecimal(value));
      }
    },

    onBinaryMousewheel(event) {
      event.preventDefault();

      if (event.wheelDeltaY > 0) {
        this.increase();
      } else {
        this.decrease();
      }
    },

    onBinaryKeyDown(event) {
      if (BINARY_INPUT_KEY_BLACK_LIST_MAP[event.key]) {
        event.preventDefault();
      }
    },

    // Hexadecimal
    onHexadecimalInput({target: {value}}) {
      const currentHexadecimalValue = this.hexadecimalValue;
      const newHexadecimalValue = Number.parseInt(value, 10);
      const different = newHexadecimalValue - currentHexadecimalValue;

      if (different === -1) {
        this.decrease();
      } else if (different === 1) {
        this.increase();
      } else {
        this.setValue(hexadecimalToDecimal(value));
      }
    },

    onHexadecimalMousewheel(event) {
      event.preventDefault();

      if (event.wheelDeltaY > 0) {
        this.increase();
      } else {
        this.decrease();
      }
    },

    onHexadecimalKeyDown(event) {
      if (HEXADECIMAL_INPUT_KEY_BLACK_LIST_MAP[event.key]) {
        event.preventDefault();
      }
    },

    setValue(value) {
      this.value = value > 0 ? value : 0;
    },

    increase() {
      this.value += 1;
    },

    decrease() {
      if (this.value > 0) {
        this.value -= 1;
      }
    }
  }
});

/**
 * Convert decimal to binary number
 *
 * @param {number} value
 * @returns {number}
 */
function decimalToBinary(value) {
  return Number.parseInt(value.toString(2), 10);
}

/**
 * Convert binary to decimal number
 *
 * @param {number} value
 * @returns {number}
 */
function binaryToDecimal(value) {
  return Number.parseInt(value, 2);
}

/**
 * Convert decimal to hexadecimal number
 *
 * @param {number} value
 * @returns {string}
 */
function decimalToHexadecimal(value) {
  return value.toString(16);
}

/**
 * Convert hexadecimal to decimal number
 *
 * @param {string} value
 * @returns {number}
 */
function hexadecimalToDecimal(value) {
  return Number.parseInt(value, 16);
}

/**
 * Create id hash map from array
 *
 * @param {Array} list
 * @returns {Object}
 *
 * @example
 * createIdMap(['foo', 'bar']);
 * //=> {foo: true, bar: true}
 */
function createIdMap(list) {
  const idMap = Object.create(null);

  list.forEach(key => {
    idMap[key] = true;
  });

  return idMap;
}
