import { Notify } from 'notiflix';

const refs = {
	form: document.querySelector('.form'),
	firstDelay: document.querySelector('[name="delay"]'),
	delayStep: document.querySelector('[name="step"]'),
	amountPromises: document.querySelector('[name="amount"]'),
}

function onSubmitForm(event) {
	event.preventDefault();
	const maxAmountPromise = Number(refs.amountPromises.value);
	let firstDelay = Number(refs.firstDelay.value);
	let step = Number(refs.delayStep.value);
	let position = 1;

	const promisesArray = getArrayPromises(createPromise, maxAmountPromise);

	showPromises(promisesArray, position, step, firstDelay);
}

function getArrayPromises(callback, maxAmountPromise) {
	const arrayPromises = [];

	for (let i = 1; i <= maxAmountPromise; i += 1) {
		arrayPromises.push(callback);
	}

	return arrayPromises;
}

function showPromises(array, position, step, firstDelay) {
	array.forEach(promise => {
		setTimeout(() => {
			promise(position, step)
				.then(success => Notify.success(success))
				.catch(error => Notify.failure(error));
			step += Number(refs.delayStep.value);
			position += 1;
		}, firstDelay);
	});
}

function createPromise(position, delay) {
	const shouldResolve = Math.random() > 0.3;
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (shouldResolve) {
				resolve(`Fullfilled promise ${position} in ${delay}`)
			}
			reject(`Rejected promise ${position} in ${delay}`)
		}, delay)
	});
}

refs.form.addEventListener('submit', onSubmitForm);
