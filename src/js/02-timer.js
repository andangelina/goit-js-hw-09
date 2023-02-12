// -----------------IMPORTS-----------------

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// -----------------EXPORTS-----------------

const bodyRef = document.querySelector("body");
const startBtn = document.querySelector("button[data-start]");
const timerRef = document.querySelector(".timer");
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    console.log(selectedDates[0]);
    },
    };
// -----------------INITIALIZATION LIBRARY-----------------

const date = flatpickr("#datetime-picker", options);

// -----------------FUNCTIONS-----------------

function selectDate () {
        if(date.latestSelectedDateObj < new Date()) {
            Notify.failure("Please choose a date in the future")
            return
    }
    else {
        startBtn.disabled = false;
        Notify.success("GOOD!!! CLICK START 🥳🥳🥳")
    }
}
function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}
function getTime () {
    const distance = date.latestSelectedDateObj - new Date();
    const days = addLeadingZero(Math.floor(distance / (1000 * 60 * 60 * 24)));
    const hours = addLeadingZero(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = addLeadingZero(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = addLeadingZero(Math.floor((distance % (1000 * 60)) / 1000));
    const countdown = `<div class="field">
    <span class="value" data-days>${days}</span>
    <span class="label">Days</span>
    </div>
    <div class="field">
    <span class="value" data-hours>${hours}</span>
    <span class="label">Hours</span>
    </div>
    <div class="field">
    <span class="value" data-minutes>${minutes}</span>
    <span class="label">Minutes</span>
    </div>
    <div class="field">
    <span class="value" data-seconds>${seconds}</span>
    <span class="label">Seconds</span>
    </div>`;
    timerRef.innerHTML = countdown;
}
function startTimer () {
    const timer = setInterval(() => {
        const distance = date.latestSelectedDateObj - new Date();;
        getTime()
        if (distance < 0) {
            clearInterval(timer);
            Notify.failure("Time's up!🥺🥺🥺");
        }
    }, 1000);
}
// -----------------EVENT LISTENERS-----------------

bodyRef.addEventListener("input", selectDate)
startBtn.addEventListener("click", startTimer)