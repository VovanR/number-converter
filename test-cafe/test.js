import {Selector} from 'testcafe';

/* eslint-disable new-cap */
const decimalInput = Selector('#decimal');
const binaryInput = Selector('#binary');
/* eslint-enable new-cap */

// eslint-disable-next-line no-unused-expressions
fixture`Getting Started`
	.page`http://localhost:8080`;

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
