import test from 'ava';
import fn from './';

test('is function', t => {
	t.is(typeof fn, 'function');
});
