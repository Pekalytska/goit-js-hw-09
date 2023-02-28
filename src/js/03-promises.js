import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onFormSubmit);
function onFormSubmit(e) {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;
  const delayValue = Number(delay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);

  for (let amount = 1, delayWithStep = delayValue; amount <= amountValue; amount += 1, delayWithStep += stepValue) {
    createPromise(amount, delayWithStep)
      .then(result => Notify.success(result))
      .catch(error => Notify.failure(error));
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
