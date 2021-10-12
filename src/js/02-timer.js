import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}

let chosenDate = null;
let countDownDate = null;

refs.start.disabled = true;

class Timer {
  constructor({ onTick }) {
    this.isActive = false;
    this.onTick = onTick;
  }
  
  init() {
    const time = this.convertMs(chosenDate);
    this.onTick(time);
  }
  
  start() {
    if (this.isActive) return;
    
    const startTime = countDownDate;
    this.isActive = true;
    
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      console.log(deltaTime)
      const time = this.convertMs(deltaTime);
      
      this.onTick(time);
    }, 1000);
  }
  
  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
    return { days, hours, minutes, seconds };
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() >= selectedDates[0].getTime()) return alert('Please choose a date in the future');
    refs.start.disabled = false;
    chosenDate = selectedDates[0].getTime() - Date.now();
    countDownDate = selectedDates[0].getTime();
    timer.init()
    console.log(chosenDate);
    console.log(convert(chosenDate))
  },
};

const fp = flatpickr("#datetime-picker", options);

const timer = new Timer({ onTick: updateClockFace, });

refs.start.addEventListener('click', onStartClick);

function onStartClick() {
  timer.start();
  console.log(timer);
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}


