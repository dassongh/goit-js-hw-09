import { Notify } from "notiflix";

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('.delay'),
  step: document.querySelector('.step'),
  amount: document.querySelector('.amount'),
}

let times = 0;
let delay = 0;
let step = 0;

refs.form.addEventListener('input', () => {
  times = parseInt(refs.amount.value);
  delay = parseInt(refs.delay.value);
  step = parseInt(refs.step.value);
});

refs.form.addEventListener('submit', (e) => {
  e.preventDefault();

  for (let i = 1; i <= times; i += 1) {
    createPromise(i, delay).then(value => Notify.success(value, { width: '400px' })).catch(error => Notify.failure(error, { width: '400px' }));
    delay += step;
  }

  delay = parseInt(refs.delay.value);
})

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {    
      if (shouldResolve) {
        resolve (`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject (`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}