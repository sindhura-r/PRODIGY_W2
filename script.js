let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        startStopBtn.innerText = 'Stop';
        startStopBtn.style.backgroundColor = '#dc3545';
        startStopBtn.style.color = 'white';
        running = true;
    } else {
        clearInterval(tInterval);
        startStopBtn.innerText = 'Start';
        startStopBtn.style.backgroundColor = '#28a745';
        startStopBtn.style.color = 'white';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    display.innerText = '00:00:00';
    startStopBtn.innerText = 'Start';
    startStopBtn.style.backgroundColor = '#28a745';
    startStopBtn.style.color = 'white';
    running = false;
    laps = [];
    updateLaps();
}

function lap() {
    if (running) {
        const lapTime = display.innerText;
        laps.push(lapTime);
        updateLaps();
    }
}

function updateLaps() {
    lapsContainer.innerHTML = laps.map((lap, index) => `<div>Lap ${index + 1}: ${lap}</div>`).join('');
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.innerText = hours + ":" + minutes + ":" + seconds;
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
