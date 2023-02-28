import { Notify } from 'notiflix/build/notiflix-notify-aio';

formRef = document.querySelector('submit', onFormSubmit)
function onFormSubmit(e) {
    e.preventDefault();
    console.log(e.currentTarget)
    //createPromise(position, delay);
}

//function createPromise(position, delay) {
//  const shouldResolve = Math.random() > 0.3;
//  if (shouldResolve) {
//    // Fulfill
//  } else {
//    // Reject
//  }
//}
