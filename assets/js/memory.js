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

let doReMiFaSoForComputer = [];

setDefaultValues();

function setDefaultValues() {
    currentLevel = 1;
    maxLevel = 1;
    computerGame = [];
    userGame = [];
    currentPlayer = 0;
    tempo = 100;
    defDuration = 0.5
    doReMiFaSoForComputer.length = 0;
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
        interval = setInterval(whoClicked, 1000);
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

function configureListeners() {
    let images = document.querySelectorAll('img');
    images.forEach((i) => {
        document.getElementById(i.id).addEventListener('click', playerTurn, false);
    })
    let boton = document.querySelector('#btn-start');
    boton.addEventListener('click', startStopGame, false);
}

function whoClicked(event) {
    if (currentPlayer === 0) {
        const buttonToPush  = 'pn' + Math.trunc((Math.random() * 9) + 1);
        computerGame.push(buttonToPush);
        document.getElementById(buttonToPush).click();
        playSoundFromComputer(buttonToPush);
        setTimeout(removeX, 1000)
        // playerTurn(event);
    }
    else {

    }
}

function playerTurn(event) {
    if (!gameInProgress) return;
    let response = 200;
    // activaOpacity(event);
    if (currentPlayer === 0)
    {
        if (!this.classList.contains('dim')) {
            this.classList.add('dim');
            console.log(this.classList);
        }
        // setTimeout(() => {
        //     if (this.classList.contains('dim')) {
        //         this.classList.remove('dim');
        //     }
        //     console.log('remove');
        //     console.log('remove 2');
        // }, 1000)
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

function removeX() {
    //console.log(document.querySelector('.dim'));
    let xxxx = document.querySelector('.dim');
    if (xxxx.classList.contains('dim')) {
        xxxx.classList.remove('dim');
    }
}

function playSoundFromComputer(buttonToPush) {
    var context = new (window.AudioContext || window.webkitAudioContext)();
    if (doReMiFaSoForComputer.length === 0)
    {
        doReMiFaSoForComputer.push({note: buttonToPush, start: 0, duration: 1});
    }
    else
    {
        let previousStart = doReMiFaSoForComputer[doReMiFaSoForComputer.length-1].start + 1;
        doReMiFaSoForComputer.push({note: buttonToPush, start: previousStart, duration: 1});
    }
    // console.log(doReMiFaSoForComputer);
    
    // var tempo = 100; // beats per minute
    var quarterNoteTime = 60 / tempo;
    
    doReMiFaSoForComputer.forEach(function(note) {
      var startTime = note.start * quarterNoteTime;
      var endTime = startTime + note.duration * quarterNoteTime;
    
      var oscillator = context.createOscillator();
      oscillator.type = "sine";
    
      var noteFrequency = getFrequency(note.note);
      oscillator.frequency.value = noteFrequency;
    
      oscillator.connect(context.destination);
      oscillator.start(context.currentTime + startTime);
      oscillator.stop(context.currentTime + endTime);

      // setTimeout(removeX, 1000)

    });
    
    function getFrequency(note) {
      switch (note) {
        case "pn1":
        case "pn9":
          return 261.63;
        case "pn2":
          return 293.66;
        case "pn3":
          return 329.63;
        case "pn4":
          return 349.23;
        case "pn5":
          return 392.00;
        case "pn6":
          return 440.00;
        case "pn7":
          return 493.88;
        case "pn8":
          return 523.25;
        default:
          return 0;
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
        var quarterNoteTime = 6 / 10;
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
