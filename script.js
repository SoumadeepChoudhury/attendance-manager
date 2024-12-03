const startButton = document.getElementById('startAttendance');
const startRollInput = document.getElementById('startRoll');
const endRollInput = document.getElementById('endRoll');
const currentRollDisplay = document.getElementById('currentRoll');
const todayDate = document.getElementById('todayDate');
const presentList = document.getElementById('presentList');
const attendanceSection = document.getElementById('attendanceSection');
const resultSection = document.getElementById('resultSection');
const setupSection = document.getElementById('setup');
const markPresentButton = document.getElementById('markPresent');
const markAbsentButton = document.getElementById('markAbsent');


const currentDate = new Date().toLocaleDateString();

let currentRoll = 0;
let rollNumbers = [];
let presentStudents = [];

startButton.addEventListener('click', () => {
    const startRoll = parseInt(startRollInput.value, 10);
    const endRoll = parseInt(endRollInput.value, 10);

    if (isNaN(startRoll) || isNaN(endRoll) || startRoll > endRoll) {
        alert('Please enter a valid range!');
        return;
    }

    rollNumbers = Array.from({ length: endRoll - startRoll + 1 }, (_, i) => startRoll + i);
    presentStudents = [];
    currentRoll = 0;

    setupSection.classList.add('hidden');
    attendanceSection.classList.remove('hidden');
    updateCurrentRoll();
});

markPresentButton.addEventListener('click', () => {
    presentStudents.push(rollNumbers[currentRoll]);
    moveToNextRoll();
});

markAbsentButton.addEventListener('click', () => {
    moveToNextRoll();
});

function updateCurrentRoll() {
    if (currentRoll < rollNumbers.length) {
        currentRollDisplay.textContent = `Roll Number: ${rollNumbers[currentRoll]}`;
    } else {
        showResults();
    }
}

function moveToNextRoll() {
    currentRoll++;
    updateCurrentRoll();
}

function showResults() {
    attendanceSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    // presentList.innerHTML = presentStudents.map(roll => `<li>${roll}</li>`).join('');
    // Display today's date
    const dateHeader = `<div style="font-weight: bold; margin-bottom: 15px;">Date: ${currentDate}</div>`;
    todayDate.innerHTML = `${dateHeader}`;
    // Format roll numbers in a grid
    const studentsList = presentStudents.map(roll => `<span>${roll}</span>`).join('');

    presentList.innerHTML = `${studentsList}`;
}