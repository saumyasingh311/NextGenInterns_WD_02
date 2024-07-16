let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function startStopWatch() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTime, 1000);
}

function stopStopWatch() {
    clearInterval(timerInterval);
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor(difference / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.innerHTML = hours + ":" + minutes + ":" + seconds;
}

startStopBtn.addEventListener('click', function() {
    if (!running) {
        startStopWatch();
        startStopBtn.innerHTML = "Stop";
        running = true;
    } else {
        stopStopWatch();
        startStopBtn.innerHTML = "Start";
        running = false;
    }
});

resetBtn.addEventListener('click', function() {
    stopStopWatch();
    display.innerHTML = "00:00:00";
    startStopBtn.innerHTML = "Start";
    laps = [];
    updateLaps();
    running = false;
});

lapBtn.addEventListener('click', function() {
    if (running) {
        laps.push(display.innerHTML);
        updateLaps();
    }
});

function updateLaps() {
    lapsContainer.innerHTML = "";
    for (let i = 0; i < laps.length; i++) {
        const lapDiv = document.createElement('div');
        lapDiv.classList.add('lap');
        lapDiv.innerHTML = "Lap " + (i + 1) + ": " + laps[i];
        lapsContainer.appendChild(lapDiv);
    }
}
