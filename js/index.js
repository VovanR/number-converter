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
    onDecimalInput(e) {
      this.setValue(parseInt(e.target.value, 10));
    },

    onDecimalKeyDown(e) {
      if (DECIMAL_INPUT_KEY_BLACK_LIST_MAP[e.key]) {
        e.preventDefault();
      }
    },

    // Binary
    onBinaryInput(e) {
      const currentBinaryValue = this.binaryValue;
      const newBinaryValue = parseInt(e.target.value, 10);
      const different = newBinaryValue - currentBinaryValue;

      if (different === -1) {
        this.decrease();
      } else if (different === 1) {
        this.increase();
      } else {
        this.setValue(binaryToDecimal(e.target.value));
      }
    },

    onBinaryMousewheel(e) {
      e.preventDefault();

      if (e.wheelDeltaY > 0) {
        this.increase();
      } else {
        this.decrease();
      }
    },

    onBinaryKeyDown(e) {
      if (BINARY_INPUT_KEY_BLACK_LIST_MAP[e.key]) {
        e.preventDefault();
      }
    },

    // Hexadecimal
    onHexadecimalInput(e) {
      const currentHexadecimalValue = this.hexadecimalValue;
      const newHexadecimalValue = parseInt(e.target.value, 10);
      const different = newHexadecimalValue - currentHexadecimalValue;

      if (different === -1) {
        this.decrease();
      } else if (different === 1) {
        this.increase();
      } else {
        this.setValue(hexadecimalToDecimal(e.target.value));
      }
    },

    onHexadecimalMousewheel(e) {
      e.preventDefault();

      if (e.wheelDeltaY > 0) {
        this.increase();
      } else {
        this.decrease();
      }
    },

    onHexadecimalKeyDown(e) {
      if (HEXADECIMAL_INPUT_KEY_BLACK_LIST_MAP[e.key]) {
        e.preventDefault();
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
  return parseInt(value.toString(2), 10);
}

/**
 * Convert binary to decimal number
 *
 * @param {number} value
 * @returns {number}
 */
function binaryToDecimal(value) {
  return parseInt(value, 2);
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
  return parseInt(value, 16);
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
  return list.reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, Object.create(null));
}
