import {debounce} from './lib';

const size1secRef = document.createElement('code');
const sizeAnimFrameRef = document.createElement('code');
const sizeRawRef = document.createElement('code');

function div(content: HTMLElement) {
	const div = document.createElement('div');
	div.appendChild(content);
	return div;
}

document.body.appendChild(div(sizeRawRef));
document.body.appendChild(div(sizeAnimFrameRef));
document.body.appendChild(div(size1secRef));

const debounced1secHandler = debounce(() => {
	size1secRef.textContent = `Debounced 1 second: ${window.innerWidth}px x ${window.innerHeight}px`;
}, 1000);
const debouncedRafHandler = debounce(() => {
	sizeAnimFrameRef.textContent = `Debounced with requestAnimationFrame: ${window.innerWidth}px x ${window.innerHeight}px`;
});
const handler = () => {
	sizeRawRef.textContent = `Not debounced: ${window.innerWidth}px x ${window.innerHeight}px`;
};

window.addEventListener('resize', debounced1secHandler);
window.addEventListener('resize', debouncedRafHandler);
window.addEventListener('resize', handler);
debouncedRafHandler();
debounced1secHandler();
handler();
