// define levels
let currentLevel = 1;
let maxLevel = 1;
//define array with queue of buttons to follow
let computerGame = [];
let userGame = [];
let buttonToPlay = '';
// currentPlayer 0:Computer, 1:User
let currentPlayer = 0;
let gameInProgress = false;
let interval = 0;
// configuration sounds
let tempo = 100; //100 beats per minute is the default
let defDuration = 0.5; // 0.5 is the default

let doReMiFaSo = [
    {pn: 'pn1', duration: 0.5, frequency: 261.63},
    {pn: 'pn2', duration: 0.5, frequency: 293.66},
    {pn: 'pn3', duration: 0.5, frequency: 329.63},
    {pn: 'pn4', duration: 0.5, frequency: 349.23},
    {pn: 'pn5', duration: 0.5, frequency: 392.00},
    {pn: 'pn6', duration: 0.5, frequency: 440.00},
    {pn: 'pn7', duration: 0.5, frequency: 493.88},
    {pn: 'pn8', duration: 0.5, frequency: 523.25},
    {pn: 'pn9', duration: 0.5, frequency: 261.63},
  ];

  // let doReMiFaSoForComputer = [];

setDefaultValues();

function setDefaultValues() {
    currentLevel = 1;
    maxLevel = 1;
    computerGame = [];
    userGame = [];
    currentPlayer = 0;
    tempo = 100;
    defDuration = 0.5
    //doReMiFaSo.forEach((note) => {
    //     note.duration = defDuration;
    //})
}

function startStopGame() {
    setDefaultValues();
    gameInProgress = !gameInProgress;
    let btnStartCaption = document.getElementById('btn-start');
    btnStartCaption.textContent = gameInProgress ? 'STOP' : 'START';
    if (gameInProgress)
    {
        interval = setInterval(playerTurn, 1000);
    }
    else
    {
        console.log('game stopped');
        clearInterval(interval);
    }
    // TODO: How to change the color for the caption?
    // btnStartCaption.style.fontStyle.ba = 'green';
    // console.log(btnStartCaption.style.fontStyle.color);
}

// function say() {
//     console.log('game');
// }

function configureListeners() {
    let images = document.querySelectorAll('img');
    images.forEach((i) => {
        document.getElementById(i.id).addEventListener('click', playerTurn, false);
    })
    let boton = document.querySelector('#btn-start');
    boton.addEventListener('click', startStopGame, false);
}

function playerTurn(event) {
    if (!gameInProgress) return;
    let response = 200;
    if (currentPlayer === 0)
    {
        const buttonToPush  = 'pn' + Math.trunc((Math.random() * 9) + 1);
        // document.getElementById("pn1").click(); // https://www.geeksforgeeks.org/make-a-click-event-fire-programmatically-for-a-file-input-element-in-javascript/
        computerGame.push(buttonToPush);
        for (i=0; i<=computerGame.length-1;i++)
        {
            playSoundButton(computerGame[i]);
        }
        console.log('Computer=>' + computerGame);
        currentPlayer = 1;
    }
    else
    {
        if (event === undefined) return;
        buttonClicked = event.target.id;
        playSoundButton(buttonClicked);
        if (computerGame.length !== userGame.length)
        {
            userGame.push(buttonClicked);
            for (i=0;i<=userGame.length-1;i++)
            {
                if (userGame[i] != computerGame[i])
                {
                    response = 400;
                    break;
                }
            }
        }
        if (response === 200)
        {
            if (computerGame.length === userGame.length)
            {
                userGame.length = 0;
                currentPlayer = 0;
            }    
        }
        else 
        {
            console.log('fallaste');
            startStopGame();
        }
    }
}

function playSoundButton(event) {
    buttonClicked = event; //.target.id;
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
