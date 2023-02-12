// -----------------------------EXPORT---------------------------------------

const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
// -----------------------------FUNCTIONS---------------------------------------

function getRandomHexColor() {
return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let addColor = null;
stopBtn.disabled = true;
function changeAttribute(bool1, bool2) {
    startBtn.disabled = bool1;
    stopBtn.disabled = bool2;
}
function changeColor() {
    addColor = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    changeAttribute(true, false);
}

function stopChangeColor() {
    clearInterval(addColor);
    changeAttribute(false, true);
}
// -----------------------------EVENTS---------------------------------------

startBtn.addEventListener('click', changeColor);
stopBtn.addEventListener('click', stopChangeColor);
