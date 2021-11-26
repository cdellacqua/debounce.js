import {debounce} from './lib';

let keyStrokes = 0;
const debouncedHandler = debounce(() => {
	console.log(`debounced ${keyStrokes} keystrokes!`);
	keyStrokes = 0;
}, 1000);

console.log('waiting for keystrokes...');

const stdin = process.stdin;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
stdin.on('data', function (key) {
	// Ctrl-C
	if (key.toString() === '\u0003') {
		process.exit();
	}
	keyStrokes++;
	debouncedHandler();
});
