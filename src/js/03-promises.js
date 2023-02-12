// -----------------IMPORTS-----------------

import { Notify } from 'notiflix/build/notiflix-notify-aio';

// -----------------EXPORTS-----------------
const formRef = document.querySelector("form");

// ----------------FUNCTIONS----------------

function createPromise(delay, position) {
  return new Promise((resolve, reject) => {
    
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  }, delay);
});
  };

  function callPromise(e) {
    e.preventDefault();
    let delayRef = Number(e.target.delay.value);
    let stepRef = Number(e.target.step.value);
    let amountRef = Number(e.target.amount.value);

      for (let i = 0; i < amountRef; i += 1) {
          createPromise(delayRef, i + 1)
          .then(({ position, delay }) => Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
          .catch(({ position, delay }) => Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
          delayRef += stepRef;
          
      }
    }

    // -----------------EVENTS-----------------
    
formRef.addEventListener('submit', callPromise);
