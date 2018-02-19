/* global Vue */

const NUMBER_INPUT_KEY_BLACK_LIST = [
	'e',
	'E',
	'-',
	'+',
	'=',
	',',
	'.',
	' '
];

const DECIMAL_INPUT_KEY_BLACK_LIST = [...NUMBER_INPUT_KEY_BLACK_LIST];
const DECIMAL_INPUT_KEY_BLACK_LIST_MAP = createIdMap(DECIMAL_INPUT_KEY_BLACK_LIST);

const BINARY_INPUT_KEY_BLACK_LIST = [...NUMBER_INPUT_KEY_BLACK_LIST];
// Add number key codes from 2 to 9
let i = 10;
while (i-- > 2) {
	BINARY_INPUT_KEY_BLACK_LIST.push(String(i));
}
// Create key map for faster search
const BINARY_INPUT_KEY_BLACK_LIST_MAP = createIdMap(BINARY_INPUT_KEY_BLACK_LIST);

// eslint-disable-next-line no-unused-vars
const app = new Vue({
	el: '#app',
	data: {
		value: new Date().getUTCFullYear()
	},
	computed: {
		binaryValue() {
			return decimalToBinary(this.value);
		}
	},
	methods: {
		onDecimalInput(e) {
			this.value = parseInt(e.target.value, 10);
		},

		onDecimalKeyDown(e) {
			if (DECIMAL_INPUT_KEY_BLACK_LIST_MAP[e.key]) {
				e.preventDefault();
			}
		},

		onBinaryInput(e) {
			const currentBinaryValue = this.binaryValue;
			const newBinaryValue = parseInt(e.target.value, 10);
			const different = newBinaryValue - currentBinaryValue;

			if (different === -1) {
				this.decrease();
			} else if (different === 1) {
				this.increase();
			} else {
				this.value = binaryToDecimal(e.target.value);
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

function decimalToBinary(value) {
	return parseInt(parseInt(value, 10).toString(2), 10);
}

function binaryToDecimal(value) {
	return parseInt(value, 2);
}

function createIdMap(list) {
	return list.reduce((acc, key) => {
		acc[key] = true;
		return acc;
	}, Object.create(null));
}
