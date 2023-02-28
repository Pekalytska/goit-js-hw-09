function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const ref = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};
let idInterval = null;

ref.btnStart.addEventListener('click', onBtnStartClick);
ref.btnStop.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
  ref.btnStart.disabled = true;
  ref.btnStop.disabled = false;
  idInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onBtnStopClick() {
  ref.btnStop.disabled = true;
  ref.btnStart.disabled = false;
  clearInterval(idInterval);
}
