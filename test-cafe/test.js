import {Selector} from 'testcafe';

/* eslint-disable new-cap */
const decimalInput = Selector('#decimal');
const binaryInput = Selector('#binary');
const hexadecimalInput = Selector('#hexadecimal');
/* eslint-enable new-cap */

// eslint-disable-next-line no-unused-expressions
fixture`Getting Started`
	.page`http://localhost:8080`;

// Decimal
test('Edit decimal value', async t => {
	await t
		.typeText(decimalInput, '12', {replace: true})
		.expect(decimalInput.value).eql('12');
});

test('Edit decimal, update binary', async t => {
	await t
		.typeText(decimalInput, '12', {replace: true})
		.expect(binaryInput.value).eql('1100');
});

test('Edit decimal, update hexadecimal', async t => {
	await t
		.typeText(decimalInput, '12', {replace: true})
		.expect(hexadecimalInput.value).eql('c');
});

// Binary
test('Edit binary value', async t => {
	await t
		.typeText(binaryInput, '1100', {replace: true})
		.expect(binaryInput.value).eql('1100');
});

test('Edit binary, update decimal', async t => {
	await t
		.typeText(binaryInput, '1100', {replace: true})
		.expect(decimalInput.value).eql('12');
});

test('Edit binary, update hexadecimal', async t => {
	await t
		.typeText(decimalInput, '12', {replace: true})
		.expect(hexadecimalInput.value).eql('c');
});

// Hexadecimal
test('Edit hexadecimal value', async t => {
	await t
		.typeText(hexadecimalInput, 'c', {replace: true})
		.expect(hexadecimalInput.value).eql('c');
});

test('Edit hexadecimal, update decimal', async t => {
	await t
		.typeText(hexadecimalInput, 'c', {replace: true})
		.expect(decimalInput.value).eql('12');
});

test('Edit hexadecimal, update binary', async t => {
	await t
		.typeText(hexadecimalInput, 'c', {replace: true})
		.expect(binaryInput.value).eql('1100');
});
