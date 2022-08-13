# Debounce a function with requestAnimationFrame or a custom interval

[NPM Package](https://www.npmjs.com/package/@cdellacqua/debounce)

`npm install @cdellacqua/debounce`

[Documentation](https://github.com/cdellacqua/debounce.js/blob/main/docs/README.md)

## Highlights

```js
import {debounce} from '@cdellacqua/debounce';

// It uses requestAnimationFrame by default
const debounced = debounce(() => {
	console.log(`Debounced with requestAnimationFrame: ${window.innerWidth}px x ${window.innerHeight}px`);
});

// It preserves function parameters
const debounced = debounce((a, b) => {
	console.log(`Debounced with requestAnimationFrame: ${a} and ${b} were passed`);
});
debounced("hello", "test argument");

// The interval can be customized, in this case setTimeout is used
const debounced = debounce(() => {
	console.log(`Debounced 1 second: ${window.innerWidth}px x ${window.innerHeight}px`);
}, 1000);

// Passing true as the third arguments makes the function call happen at the start
// of the interval: call then wait instead of wait then call
const debounced = debounce(() => {
	console.log(`Debounced 1 second: ${window.innerWidth}px x ${window.innerHeight}px`);
}, 1000, true);

// You can cancel or flush (call+cancel) the next scheduled execution
debounced.flush();
// ..or...
debounced.cancel();


// It exposes a state$ store containing 'idle' or 'debouncing'
const debounced = debounce(() => {
	console.log(`Debounced 1 second: ${window.innerWidth}px x ${window.innerHeight}px`);
}, 1000, true);

console.log(debounced.state$.content()); // 'idle'
debounced();
console.log(debounced.state$.content()); // 'debouncing'
// ...after 1000ms
debounced.state$.subscribe(console.log); // immediately prints 'idle'
debounced(); // triggers the subscription, printing 'debouncing'
// ...after 1000ms
// triggers the subscription, printing 'idle'
```
