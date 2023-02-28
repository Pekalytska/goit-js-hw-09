import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
ref.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - Date.now() > 0) {
      ref.btnStart.disabled = false;
    } else {
      ref.btnStart.disabled = true;
      Notify.failure('Please choose a date in the future', 'Button Text');
    }
  },
};
const fp = flatpickr(ref.input, options);

class Timer {
  constructor({ onRemain }) {
    this.idTimerInterval = null;
    this.TIMER_DELAY = 1000;
    this.onRemain = onRemain;
  }

  start() {
    this.idTimerInterval = setInterval(() => {
      ref.btnStart.disabled = true;
      fp.set('clickOpens', false);
      const remainder = convertMs(fp.selectedDates[0] - Date.now());
      this.onRemain(remainder, this.idTimerInterval);
    }, this.TIMER_DELAY);
  }
}

const timer = new Timer({
  onRemain: updateRemainder,
});

function updateRemainder({ days, hours, minutes, seconds }, idInterval) {
  if (seconds < 0 && minutes < 0 && hours < 0 && days < 0) {
    clearInterval(idInterval);
    ref.days.textContent = '00';
    ref.hours.textContent = '00';
    ref.minutes.textContent = '00';
    ref.seconds.textContent = '00';
  } else {
    ref.days.textContent = days;
    ref.hours.textContent = hours;
    ref.minutes.textContent = minutes;
    ref.seconds.textContent = seconds;
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

ref.btnStart.addEventListener('click', () => {
  timer.start();
});
