function getRandomHex() {
	return '#' + (Math.random().toString(16) + '000000').substring(2, 8);
}

const COLOR_DELAY = 1000;

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const text = document.querySelector('.hex-color');
const body = document.body;
let timerId = null;

stopBtn.disabled = true;

function showRandomHex(event) {
	if (stopBtn.disabled) {
		event.currentTarget.disabled = true;
		stopBtn.disabled = false;
	}
	timerId = setInterval(() => {
		body.style.backgroundColor = getRandomHex();
		text.textContent = getRandomHex();
	}, COLOR_DELAY);
}

function stopRandomHex(event) {
	if (startBtn.disabled) {
		event.currentTarget.disabled = true;
		startBtn.disabled = false;
	}
	clearInterval(timerId);
}

startBtn.addEventListener('click', showRandomHex);
stopBtn.addEventListener('click', stopRandomHex);
