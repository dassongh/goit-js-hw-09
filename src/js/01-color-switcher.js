const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
}
let intervalId = null;

refs.stop.disabled = true;

refs.start.addEventListener('click', () => {
  intervalId = setInterval(changeBgColor, 1000);
  refs.start.disabled = true;
  refs.stop.disabled = false;
})

refs.stop.addEventListener('click', () => {
  clearInterval(intervalId);
  refs.stop.disabled = true;
  refs.start.disabled = false;
})

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

