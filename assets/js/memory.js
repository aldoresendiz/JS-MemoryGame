///// Define global variables
    // miscellaneous variables
    let intervalUpdateTurns = 0;
    let checkComputerStep = 0;
    let computerStep = -1 // Pick a button, -2 adds button to the queue
    let opacity = document.querySelector(':root');
    // define levels and score variables
    let userLevel = 1;
    let userScore = 0;
    let maxLevel = 200;
    let maxScore = 0;
    let bestLevel = 0;
    let gameInProgress = false;
    let currentPlayer = 0;
    //define array with queue of buttons to follow
    let computerGame = [];
    let userGame = [];
    let elementToPerform = 0;
    let buttonToPlayByComputer = '';
    let buttonClickedByUser = '';
    // define sounds for user and sounds for computer
    let doReMiFaSoUser = [
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
    let doReMiFaSoComputer = [];
    // variables to reference level element and score element
    let levelCaption = document.getElementById('game-level');
    let scoreCaption = document.getElementById('game-score');
    let maxScoreCaption = document.getElementById('game-max-score');
    let bestLevelCaption = document.getElementById('game-max-level');
    let btnStartCaption = document.getElementById('btn-start');
    let gameColors = [
        '../assets/colors/',
        'button-1-red.jpeg',
        'button-2-yellow.jpeg',
        'button-3-orange.jpeg',
        'button-4-green.jpeg',
        'button-5-blue.jpeg',
        'button-6-lightblue.jpeg',
        'button-7-purple.jpeg',
        'button-8-lightgreen.jpeg',
        'button-9-pink.jpeg',
        'game-over.jpeg',
    ]
    let imgAlts = [
        '',
        'Button 1 Red',
        'Button 2 Yellow',
        'Button 3 Orange',
        'Button 4 Green',
        'Button 5 Blue',
        'Button 6 Light Blue',
        'Button 7 Purple',
        'Button 8 Light Green',
        'Button 9 Pink',
        'Button Game Over'
    ]
///// End Define global variables

resetColors();
setDefaultValues();
configureListeners();

function setDefaultValues() {
    computerStep = -1;
    userLevel = 1;
    userScore = 0;
    computerGame = [];
    userGame = [];
    doReMiFaSoComputer = [];
    // gameInProgress = false;
    currentPlayer = 0;
    elementToPerform = 0;
    buttonToPlayByComputer = '';
    buttonClickedByUser = '';
    btnStartCaption.style.color = 'green';
    // let gameOver = document.getElementById('game-over');
    //gameOver.textContent = '';
    //gameOver.style.zIndex = 1;
     updateScore();
    // levelCaption.textContent = '';
    // scoreCaption.textContent = '';
}

function configureListeners() {
    let images = document.querySelectorAll('img');
    images.forEach((i) => {
        if (i.id !== 'game-over') 
        {
            document.getElementById(i.id).addEventListener('click', clickButton, false);
        }
    })
    let botonStart = document.querySelector('#btn-start');
    botonStart.addEventListener('click', startStopGame, false);
}

function startStopGame() {
    setDefaultValues();
    gameInProgress = !gameInProgress; // if there is a game in progress then stop it else setup the environment for a new game
    btnStartCaption.textContent = gameInProgress ? 'STOP' : 'START';
    btnStartCaption.style.color = gameInProgress ? 'red' : 'green';
    resetColors();
    if (gameInProgress)
    {
        intervalUpdateTurns = setInterval(displayTurn, 1);
        checkComputerStep = setInterval(controlComputer, 1);
        opacity.style.setProperty('--opacity', '0.1555')
        // let btn9 = document.getElementById('pn9');
        // btn9.src = './assets/colors/button-9-pink.jpeg';
        // gameOver.setAttribute('hidden', 'hidden');
        // gameOver.textContent = 'GAME OVER';
        // gameOver.style.zIndex = -1;
    
    }
    else
    {
        opacity.style.setProperty('--opacity', '0')
        clearInterval(intervalUpdateTurns);
        clearInterval(checkComputerStep);
    }
    displayTurn();
}

function resetColors() {
    let assetsFolder = gameColors[0];
    console.log(assetsFolder);
    for (i = 1; i<=9; i++)
    {
        let pnX = document.getElementById(`pn${i}`);
        pnX.src = assetsFolder + gameColors[i];
        pnX.alt = imgAlts[i];
        if (pnX.classList.contains('dim'))
        {
            pnX.classList.remove('dim');
        }
        console.log(pnX);
        console.log(pnX.src);
    }
    // let btn1 = document.getElementById('pn1');
    // btn1.src = './assets/colors/button-1-red.jpeg';
    // let btn2 = document.getElementById('pn2');
    // btn2.src = './assets/colors/button-1-red.jpeg';
}

function displayTurn() 
{
    let displayTurn = document.getElementById('who-turn');
    if (gameInProgress)
    {
        if (currentPlayer === 0)
        {
            displayTurn.textContent = 'MY TURN';
            displayTurn.style.color = 'red';
        }
        else
        {
            displayTurn.textContent = 'YOUR TURN';
            displayTurn.style.color = 'green';
        }
    }
    else
    {
        displayTurn.textContent = '---';
        displayTurn.style.color = 'blue';
    }
    // console.log(currentPlayer);
}

function controlComputer() 
{
    if (currentPlayer === 0)
    {
        if (computerStep === -1) // Computer must pick a number
        {
            buttonToPlayByComputer = 'pn' + Math.trunc((Math.random() * 9) + 1);
            computerStep = -2;
            console.log(buttonToPlayByComputer);
        }
        if (computerStep === -2) /// Computer adds chosen button to its queue
        {
            computerGame.push(buttonToPlayByComputer);
            computerStep = -3;
            console.log(computerGame);
        }
        if (computerStep === -3) /// Computer iluminates its current elementToPerform
        {
            computerStep = 0
            let botonToIluminate = document.getElementById(computerGame[elementToPerform]);
            if (!botonToIluminate.classList.contains('dim'))
            {
                botonToIluminate.classList.add('dim');
            }
            setTimeout(computerTurnsOnButton, 1000);
            console.log('play sound for: ',elementToPerform);
            playSoundFromComputer();
        }
        if (computerStep === -4)
        {
            computerTurnsOffButton();
            elementToPerform++;
            if (elementToPerform<=computerGame.length-1)
            {
                computerStep = -3;
            }
            else
            {
                computerStep = -1;
                currentPlayer = 1;
                elementToPerform = 0;
                console.log('cede el turno');
            }
        }
    }
}

function computerTurnsOffButton() {
    let botonToIluminate = document.getElementById(computerGame[elementToPerform]);
    botonToIluminate.classList.remove('dim');
}

function computerTurnsOnButton()
{
    console.log('Iluminate Button', computerGame[elementToPerform]);
    computerStep = -4;
    return;
}

function playButton()
{
    console.log('highlight the button')
    x = -2;
    return x;
}

function playSoundFromComputer() {
    var context = new (window.AudioContext || window.webkitAudioContext)();
    if (doReMiFaSoComputer.length === 0)
    {
        if (currentPlayer === 0)
        {
            doReMiFaSoComputer.push({note: computerGame[elementToPerform], start: 0, duration: 1});
        }
        else 
        {
            doReMiFaSoComputer.push({note:userGame[elementToPerform], start: 0, duration: 1});
        }
    }
    else
    {
        let previousStart = doReMiFaSoComputer[doReMiFaSoComputer.length-1].start + 1;
        if (currentPlayer === 0)
        {
            doReMiFaSoComputer.push({note:computerGame[elementToPerform], start: previousStart, duration: 1});
        }
        else
        {
            doReMiFaSoComputer.push({note:userGame[elementToPerform], start: previousStart, duration: 1});
        }
    }
    // console.log(doReMiFaSoForComputer);

    var tempo = 100; // beats per minute
    var quarterNoteTime = 60 / tempo;

    doReMiFaSoComputer.forEach(function(note) {
      var startTime = note.start * quarterNoteTime;
      var endTime = startTime + note.duration * quarterNoteTime;

      var oscillator = context.createOscillator();
      oscillator.type = "sine";

      var noteFrequency = getFrequency(note.note);
      oscillator.frequency.value = noteFrequency;

      oscillator.connect(context.destination);
      oscillator.start(context.currentTime + startTime);
      oscillator.stop(context.currentTime + endTime);
      doReMiFaSoComputer = [];
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

function playGameOver() {
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var tempo = 100;
    var quarterNoteTime = 60 / tempo;
    var startTime = 0 * quarterNoteTime;
    var endTime = 0 + 2 * quarterNoteTime;

    var oscillator = context.createOscillator();
    oscillator.type = "sine";

    var noteFrequency = 261.63;
    oscillator.frequency.value = noteFrequency;

    oscillator.connect(context.destination);
    oscillator.start(context.currentTime + startTime);
    oscillator.stop(context.currentTime + endTime);
}

function clickButton(event) 
{
    if (!gameInProgress) return;
    if (currentPlayer === 1)
    {
        console.log('es mi turno');
        if (event === undefined) return;
        const botonClicked = event.target.id;
        console.log(botonClicked);
        userGame.push(botonClicked);
        if (computerGame[elementToPerform] === userGame[elementToPerform])
        {
            playSoundFromComputer();
            elementToPerform++;
            if (userGame.length === computerGame.length)
            {
                updateScore();
                // levelCaption.textContent = `Level: ${Math.trunc(computerGame.length / 7) + 1}`
                // scoreCaption.textContent = `Score: ${computerGame.length}`;
                setTimeout(cedeElTurno, 1000);
                elementToPerform = 0;
            }    
        }
        else
        {
            userMakesMistake();
        }
    }
}

function userMakesMistake() 
{
    playGameOver();
    startStopGame();
    // let gameOver = document.getElementById('game-over');
    let bn9 = document.getElementById('pn9');
    bn9.src = gameColors[0] + gameColors[10]; //'../assets/colors/game-over.jpeg';
    bn9.alt = imgAlts[10];
    // pn9.zIndex = -1;
    // gameOver.setAttribute('hidden', 'hidden');
    // gameOver.removeAttribute('hidden');
    // gameOver.textContent = 'GAME OVER';
    //gameOver.style.zIndex = 1;
    console.log('caminaste');
}

function cedeElTurno() 
{
    userGame = [];
    currentPlayer = 0;
}

function updateScore()
{
    let currentLevel = Math.trunc(computerGame.length / 7) + 1;
    levelCaption.textContent = `Level: ${currentLevel}`; //Math.trunc(computerGame.length / 7) + 1
    scoreCaption.textContent = `Score: ${computerGame.length}`;
    if (computerGame.length > maxScore)
    {
        maxScore = computerGame.length;
    }
    if (currentLevel > bestLevel)
    {
        bestLevel = currentLevel;
    }
    maxScoreCaption.textContent = `Best Score: ${maxScore}`;
    bestLevelCaption.textContent = `Best Level: ${bestLevel}`;
}