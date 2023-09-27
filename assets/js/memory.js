// define levels
let currentLevel = 1;
let maxLevel = 1;
//define array with queue of buttons to follow
let currentGame = [];
// currentPlayer 0:Computer, 1:User
let currentPlayer = 0;
let gameInProgress = false;
// configuration sounds
let tempo = 100; //100 beats per minute is the default
let defDuration = 0.5; // 0.5 is the default

let doReMiFaSo = [
    {pn: 'pn1', duration: defDuration, frequency: 261.63},
    {pn: 'pn2', duration: defDuration, frequency: 293.66},
    {pn: 'pn3', duration: defDuration, frequency: 329.63},
    {pn: 'pn4', duration: defDuration, frequency: 349.23},
    {pn: 'pn5', duration: defDuration, frequency: 392.00},
    {pn: 'pn6', duration: defDuration, frequency: 440.00},
    {pn: 'pn7', duration: defDuration, frequency: 493.88},
    {pn: 'pn8', duration: defDuration, frequency: 523.25},
    {pn: 'pn9', duration: defDuration, frequency: 261.63},
  ];

setDefaultValues();

function setDefaultValues() {
    currentLevel = 1;
    maxLevel = 1;
    currentGame = [];
    currentPlayer = 0;
    tempo = 100;
    defDuration = 0.5
    doReMiFaSo.forEach((note) => {
        note.duration = defDuration;
    })
}

function startStopGame() {
    setDefaultValues();
    gameInProgress = !gameInProgress;
    console.log(gameInProgress);
}

function configureListeners() {
    let images = document.querySelectorAll('img');
    images.forEach((i) => {
        document.getElementById(i.id).addEventListener('click', playSoundButton, false);
    })
    let boton = document.querySelector('#btn-start');
    boton.addEventListener('click', startStopGame, false);
}

function playSoundButton(event) {
    if (!gameInProgress) return;
    buttonClicked = event.target.id;
    doReMiFaSo.forEach((note) => {
    if (note.pn == buttonClicked)
    {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        let waveforms = ["sine", "square", "sawtooth", "triangle"];
        var quarterNoteTime = 60 / tempo; //60 is the default
        var endTime = note.duration * quarterNoteTime;
        var oscillator = context.createOscillator();
        oscillator.type = "sine";
        var noteFrequency = note.frequency;
        oscillator.frequency.value = noteFrequency;
        oscillator.connect(context.destination);
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + endTime);
    }
    });
};

function addOpacity(event) {
    // add appropriate CSS class
    if (!this.classList.contains('dim')) {
        this.classList.add('dim');
    }
    getProductInfo(event.target.id);
}

function removeOpacity(event) {
     //remove appropriate CSS class
     if (this.classList.contains('dim')) {
        this.classList.remove('dim');
    }

    let element = document.getElementById('color-price');
        element.textContent = '';
        
    let color = document.getElementById('color-name');
        color.textContent = ''; 

    event.preventDefault();
}
