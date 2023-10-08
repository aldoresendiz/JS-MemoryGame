// S: Define Global variables
let cheaterMode = false;
let defaultSandClock = 4;
let sandClock = defaultSandClock; // Seconds to start a new game
let computerStep = 0; // 1:Pick a number and formats as 'pn#', 2: Add the button to the queue, 9: Announce new Level
let maxLevel = 10;
let bestLevel = 0;
let bestScore = 0;
let gameOverDisplayed = false;
let currentLevelDescription = document.getElementById('level-description');
let currentLevelCaption = document.getElementById('game-level');
let currentScoreCaption = document.getElementById('game-score');
let bestLevelCaption = document.getElementById('game-best-level');
let bestScoreCaption = document.getElementById('game-best-score');
let btnStartCaption = document.getElementById('btn-start');
let opacity = document.querySelector(':root');

// Define Intervals
let intervalSandClock = 0;
let intervalGameOver = 0;
let intervalUpdateTurns = 0;
let intervalUpdateScores = 0;
let intervalComputerStatus = 0;
let intervalAnnounceNewLevel = 0;
let intervalComputerIsPlaying = 0;

// Game in Progress
let gameInProgress = false;
let currentLevel = 0;
let currentScore = 0;
let currentPlayer = 0; //0: Computer, 1:User
let extraLives = 0;
let currentGame = [];
let currentElement = -1;
let buttonByComputer = '';
let buttonByUser = '';

// Sounds
let doReMiFaSoUser = [
    {bn: 'bn1', duration: 0.5, frequency: 261.63},
    {bn: 'bn2', duration: 0.5, frequency: 293.66},
    {bn: 'bn3', duration: 0.5, frequency: 329.63},
    {bn: 'bn4', duration: 0.5, frequency: 349.23},
    {bn: 'bn5', duration: 0.5, frequency: 392.00},
    {bn: 'bn6', duration: 0.5, frequency: 440.00},
    {bn: 'bn7', duration: 0.5, frequency: 493.88},
    {bn: 'bn8', duration: 0.5, frequency: 523.25},
    {bn: 'bn9', duration: 0.5, frequency: 261.63},
];

let defaultTempo = 100;

// Level Definitions
let levelDefinition = [
    {Level: 0, Description: '---', Tempo: 100, SoundDuration: 1, ExtraLives: 1, WaitDuration: 10, Color: 'beige'},
    {Level: 1, Description: '💤 Easy 💤', Tempo: 100, SoundDuration: 1, ExtraLives: 3, WaitDuration: 10, Color: 'green'},
    {Level: 2, Description: '😊 Beginner 😊', Tempo: 200, SoundDuration: 0.8, ExtraLives: 7, WaitDuration: 8, Color: 'blue'},
    {Level: 3, Description: '😁 Intermediate 😁', Tempo: 300, SoundDuration: 0.6, ExtraLives: 7, WaitDuration: 6, Color: 'blue'},
    {Level: 4, Description: '😎 Expert 😎', Tempo: 400, SoundDuration: 0.4, ExtraLives: 7, WaitDuration: 4, Color: 'blue'},
    {Level: 5, Description: '🧐 Senior 🧐', Tempo: 500, SoundDuration: 0.2, ExtraLives: 7, WaitDuration: 4, Color: 'blue'},
    {Level: 6, Description: '😨 I N S A N E!! 😨', Tempo: 500, SoundDuration: 0.2, ExtraLives: 7, WaitDuration: 4, Color: 'blue'},
    {Level: 7, Description: '😱 C R A Z Y!! 😱', Tempo: 500, SoundDuration: 0.2, ExtraLives: 7, WaitDuration: 4, Color: 'blue'},
    {Level: 8, Description: '🤓 EINSTEIN! 🤓', Tempo: 500, SoundDuration: 0.2, ExtraLives: 7, WaitDuration: 4, Color: 'red'},
    {Level: 9, Description: '🚀 OUT OF THIS WORLD!', Tempo: 500, SoundDuration: 0.2, ExtraLives: 7, WaitDuration: 4, Color: 'red'},
];

// Game Colors
let buttonProperties = [
    '../assets/colors/',
    {Button: 1, Image: 'button-1-red.jpeg', Alt: 'Button 1 Red',},
    {Button: 2, Image: 'button-2-yellow.jpeg', Alt: 'Button 2 Yellow',},
    {Button: 3, Image: 'button-3-orange.jpeg', Alt: 'Button 3 Orange',},
    {Button: 4, Image: 'button-4-green.jpeg', Alt: 'Button 4 Green',},
    {Button: 5, Image: 'button-5-blue.jpeg', Alt: 'Button 5 Blue',},
    {Button: 6, Image: 'button-6-lightblue.jpeg', Alt: 'Button 6 Light Blue',},
    {Button: 7, Image: 'button-7-purple.jpeg', Alt: 'Button 7 Purple',},
    {Button: 8, Image: 'button-8-lightgreen.jpeg', Alt: 'Button 8 Light Green',},
    {Button: 9, Image: 'button-9-pink.jpeg', Alt: 'Button 9 Pink',},
    {Button: 10, Image: 'game-over.jpeg', Alt: 'Button Game Over',},
];
// E: Define Global variables

// resetColors: This function resets every button to its original state and color
function addOpacity(event)
{
console.log(event);
if (event === undefined) return;
if (gameInProgress)
{
    /// let botonToIluminate = document.getElementById(currentGame[currentElement]);
    computerTurnsOnButton(event.target.id);
    // let botonToIluminate = document.getElementById(event.target.id);
    // console.log(botonToIluminate);
    // botonToIluminate.classList.add('dim');    
}
// console.log('addopacity');
}

function announceNewLevel()
{
console.log('jugando musica para new level');
switch (computerStep)
{
    case 90:
    case 93:
    case 94:
    case 97:
        // computerTurnsOnButton('bn1');
        playSpecificNote('bn1', 700, 1);
        // setTimeout(computerTurnsOffButton('bn1'),500);
        break;
    case 91:
    case 95:
        // computerTurnsOnButton('bn2');
        playSpecificNote('bn2', 700, 1);
        // computerTurnsOffButton('bn2');
        break;
    case 92:
    case 96:
        // computerTurnsOnButton('bn3');
        playSpecificNote('bn3', 700, 1);
        // computerTurnsOffButton('bn3');
        break;
    }
computerStep++;
if (computerStep === 98)
{
    computerStep = 1;
}
console.log('jugando musica para new level');
}

function announceWinner()
{
let weHaveAWinner = document.getElementById('player-turn');
weHaveAWinner.textContent = '🏆 WINNER 🏆';
weHaveAWinner.style.color = 'green';
}

function clickButton(event) 
{
if (!gameInProgress) return;
if (currentPlayer === 1)
{
    // console.log('es mi turno');
    if (event === undefined) return;
    const botonClicked = event.target.id;
    // console.log(botonClicked);
    // userGame.push(botonClicked);
    if (botonClicked === currentGame[currentElement])
    {
        addOpacity();
        playSpecificNote(botonClicked, 100, .5);
        removeOpacity();
        currentElement++;
        console.log(currentElement, currentGame.length, currentGame);
        if (currentElement > currentGame.length-1)
        {
            currentScore = currentGame.length;
            currentElement = 0;
            setTimeout(cedeElTurno, 1000);
        }
        // playSoundFromComputer();
        // elementToPerform++;
        // if (userGame.length === computerGame.length)
        // {
        //     updateScore();
        //     // levelCaption.textContent = `Level: ${Math.trunc(computerGame.length / 7) + 1}`
        //     // scoreCaption.textContent = `Score: ${computerGame.length}`;
        //     setTimeout(cedeElTurno, 1000);
        //     elementToPerform = 0;
        // }    
    }
    else
    {
        userMakesMistake();
    }
}
}

function cedeElTurno() 
{
currentPlayer = 0;
}

function computerPlays()
{
if (currentPlayer === 0)
{
    // console.log(currentPlayer, 'level ', currentLevel, 'computerstep', computerStep);
    if (computerStep === 0) // Check if we are in a new level
    {
        console.log(currentGame.length, currentLevel);
        let levelToPlay = Math.trunc(currentGame.length / levelDefinition[currentLevel-1].ExtraLives) + 1;
        // if (levelToPlay > levelDefinition.length)
        if (levelToPlay > maxLevel)
        {
            startStopGame();
            announceWinner();
            return;
        }
        console.log('Formula: ', currentGame.length / levelDefinition[currentLevel-1].ExtraLives)
        console.log('linea 355', 'level to play', levelToPlay);
        if (levelToPlay > currentLevel)
        {
            // TODO: Announce new Level
            // intervalAnnounceNewLevel = setInterval(AnnounceNewLevel, 200);
            // computerStep = 90; // Announce new level
            extraLives++;
            displayExtraLives();
            console.log('Extra Lives ', extraLives);
            computerStep = 1;
            currentLevel++;
        }
        else
        {
            computerStep = 1;
        }
    }
    if (computerStep === 1) // Computer must pick a number
    {
        clearInterval(intervalAnnounceNewLevel);
        buttonByComputer = 'bn' + Math.trunc((Math.random() * 9) + 1); // Computer picks the next button to play
        computerStep = 2;
        // console.log(buttonToPlayByComputer);
    }
    if (computerStep === 2) /// Computer adds chosen button to its queue
    {
        currentGame.push(buttonByComputer); // Computer adds its pick to the queue of the current game
        computerStep = 3;
        // console.log(computerGame);
    }
    if (computerStep === 3) /// Computer is to play the entire play
    {
        computerStep = 10;
        currentElement = 0;
        intervalComputerIsPlaying = setInterval(computerPlaysNextButton, levelDefinition[currentLevel-1].SoundDuration * 500);
        // let botonToIluminate = document.getElementById(computerGame[elementToPerform]);
        // if (!botonToIluminate.classList.contains('dim'))
        // {
        //     botonToIluminate.classList.add('dim');
        // }
        // setTimeout(computerTurnsOnButton, 1000);
        // // console.log('play sound for: ',elementToPerform);
        // playSoundFromComputer();
    }
    if (computerStep === 4) // computer has finished its turn and now gives control to the user
    {
        console.log('computerStep 4');
        clearInterval(intervalComputerIsPlaying);
        computerStep = 0;
        currentPlayer = 1;
        currentElement = 0;
        // computerTurnsOffButton();
        // elementToPerform++;
        // if (elementToPerform<=computerGame.length-1)
        // {
        //     computerStep = -3;
        // }
        // else
        // {
        //     computerStep = -1;
        //     currentPlayer = 1;
        //     elementToPerform = 0;
        //     // console.log('cede el turno');
        // }
    }
}
}

function computerPlaysNextButton()
{
console.log('copmuter plays next button line 422');
if (computerStep === 10) // Computer highlights the button
{
    computerStep = 11;
    computerTurnsOnButton(currentGame[currentElement]);
}
if (computerStep === 12)
{
    computerTurnsOffButton(currentGame[currentElement]);
    computerStep = 13;
}
if (computerStep === 11)
{
    playSpecificNote(currentGame[currentElement], levelDefinition[currentLevel-1].Tempo, levelDefinition[currentLevel-1].SoundDuration);
    computerStep = 12;
}
if (computerStep === 13)
{
    currentElement++;
    if (currentElement > currentGame.length-1)
    {
        currentElement = 0;
        computerStep = 4;
    }
    else
    {
        computerStep = 10;
    }
}
}

function computerTurnsOffButton(whatButton)
{
// let botonToIluminate = document.getElementById(currentGame[currentElement]);
let botonToIluminate = document.getElementById(whatButton);
botonToIluminate.classList.remove('dim');
}

function computerTurnsOnButton(whatButton)
{
// let buttonToIluminate = document.getElementById(currentGame[currentElement]);
let buttonToIluminate = document.getElementById(whatButton);
if (!buttonToIluminate.classList.add('dim'))
{
    buttonToIluminate.classList.add('dim');
}
}

function configureListeners() 
{
let images = document.querySelectorAll('img');
let botonStart = document.querySelector('#btn-start');
images.forEach((i) => {
    document.getElementById(i.id).addEventListener('click', clickButton, false);
    document.getElementById(i.id).addEventListener('mousedown', addOpacity, false);
    document.getElementById(i.id).addEventListener('mouseup', removeOpacity, false);
    document.addEventListener('keydown', confirmCheatMode, false);
})
botonStart.addEventListener('click', fireSandClock, false);
}

function decreaseSandClock() 
{
if (!gameInProgress)
{
    sandClock--;
    if (sandClock > 0)
    {
        let askUserToGetReady = document.getElementById('player-turn');
        askUserToGetReady.textContent = `GET READY IN ${sandClock}!`;
        playSpecificNote('bn2', 700, 1);
    }
    else
    {
        btnStartCaption.disabled = false;
        startStopGame();
    }    
}
}

function displayExtraLives()
{
let extraLivesCaption = document.getElementById('extra-lives');
extraLivesCaption.textContent = `Extra Lives: ${extraLives}`
}

function displayTurn() 
{
let displayTurn = document.getElementById('player-turn');
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

function enterGameOverMode()
{
let bn9 = document.getElementById('bn9');
gameOverDisplayed = !gameOverDisplayed
if (!gameOverDisplayed)
{
    bn9.src = buttonProperties[0] + buttonProperties[10].Image; //'../assets/colors/game-over.jpeg';
    bn9.alt = buttonProperties[10].Alt;
}
else
{
    bn9.src = buttonProperties[0] + buttonProperties[9].Image; //'../assets/colors/game-over.jpeg';
    bn9.alt = buttonProperties[9].Alt;
}
}

function fireSandClock()
{
if (!gameInProgress)
{
    clearInterval(intervalGameOver);
    resetColors();
    btnStartCaption.disabled = true;
    intervalSandClock = setInterval(decreaseSandClock, 1000);
}
else
{
    startStopGame();
}
}

function getFrequency(note) 
{
switch (note) {
  case "bn1":
  case "bn9":
    return 261.63;
  case "bn2":
    return 293.66;
  case "bn3":
    return 329.63;
  case "bn4":
    return 349.23;
  case "bn5":
    return 392.00;
  case "bn6":
    return 440.00;
  case "bn7":
    return 493.88;
  case "bn8":
    return 523.25;
  default:
    return 0;
}
}

function giveUserAnotherChance()
{
currentPlayer = 0;
}

function playSpecificNote(whatNote, whatTempo, whatDuration)
{
console.log('specific note:', whatNote, whatTempo, whatDuration)
whatNote =  whatNote === undefined ? 'bn1' : whatNote;
var context = new (window.AudioContext || window.webkitAudioContext)();
let myNote = [{note: whatNote, duration: whatDuration}];
var tempo = whatTempo === undefined ? defaultTempo : whatTempo; // beats per minute
var quarterNoteTime = 60 / tempo;
var startTime = 0;
var endTime = startTime + myNote[0].duration * quarterNoteTime;
var oscillator = context.createOscillator();
oscillator.type = "sine";
var noteFrequency = getFrequency(myNote[0].note);
oscillator.frequency.value = noteFrequency;
oscillator.connect(context.destination);
oscillator.start(context.currentTime + startTime);
oscillator.stop(context.currentTime + endTime);
}

function removeOpacity(event)
{
if (event === undefined) return;
if (gameInProgress)
{
    computerTurnsOffButton(event.target.id);
    // let botonToIluminate = document.getElementById(currentGame[currentElement]);
    // botonToIluminate.classList.remove('dim');    
}
// console.log('removeopacity');
}

function resetColors() 
{
let assetsFolder = buttonProperties[0];
for (i = 1; i<=9; i++)
{
    let btn = document.getElementById(`bn${i}`);
    btn.src = assetsFolder + buttonProperties[i].Image;
    btn.alt = buttonProperties[i].Alt;
    if (btn.classList.contains('dim'))
    {
        btn.classList.remove('dim');
    }
}
}

function resetLevelDescription()
{
currentLevelDescription.style.visibility = gameInProgress ? 'visible' : 'hidden';
}

function resetPlayerTurn()
{
let playerTurnCaption = document.getElementById('player-turn');
playerTurnCaption.textContent = '---';
}

function startStopGame() 
{
setDefaultValues();
resetColors();
gameInProgress = !gameInProgress; // if there is a game in progress then stop it else setup the environment for a new game
btnStartCaption.textContent = gameInProgress ? 'STOP' : 'START';
btnStartCaption.style.color = gameInProgress ? 'red' : 'green';
if (gameInProgress)
{
    currentLevel = 1;
    intervalUpdateTurns = setInterval(displayTurn, 1);
    intervalComputerStatus = setInterval(computerPlays, 1);
    intervalUpdateScores = setInterval(updateScores, 1);
    opacity.style.setProperty('--opacity', '0.1555')        
    resetLevelDescription();
    // let btn9 = document.getElementById('pn9');
    // btn9.src = './assets/colors/button-9-pink.jpeg';
    // gameOver.setAttribute('hidden', 'hidden');
    // gameOver.textContent = 'GAME OVER';
    // gameOver.style.zIndex = -1;

}
else
{
    currentLevel = 0;
    opacity.style.setProperty('--opacity', '0')
    clearInterval(intervalSandClock);
    clearInterval(intervalUpdateTurns);
    clearInterval(intervalUpdateScores);
    clearInterval(intervalComputerStatus);
    clearInterval(intervalUpdateScores);
    resetPlayerTurn();
    resetLevelDescription();
}
// displayTurn();
}

function setDefaultValues() 
{
if (cheaterMode)
{
    levelDefinition = [
        {Level: 0, Description: '---', Tempo: 100, SoundDuration: 1, ExtraLives: 1, WaitDuration: 10, Color: 'beige'},
        {Level: 1, Description: '💤 Cheater 💤', Tempo: 100, SoundDuration: 1, ExtraLives: 1, WaitDuration: 10, Color: 'green'},
        {Level: 2, Description: '😊 C H E A T E R 😊', Tempo: 200, SoundDuration: 0.8, ExtraLives: 1, WaitDuration: 8, Color: 'blue'},
        {Level: 3, Description: '😁 C h e a t e r 😁', Tempo: 300, SoundDuration: 0.6, ExtraLives: 1, WaitDuration: 6, Color: 'blue'},
        {Level: 4, Description: '😊 Ch.... 😊', Tempo: 400, SoundDuration: 0.4, ExtraLives: 1, WaitDuration: 4, Color: 'blue'},
        {Level: 5, Description: '😁 ...ter 😁', Tempo: 500, SoundDuration: 0.2, ExtraLives: 1, WaitDuration: 4, Color: 'blue'},
        {Level: 6, Description: '😊 cheater 😊', Tempo: 500, SoundDuration: 0.2, ExtraLives: 1, WaitDuration: 4, Color: 'blue'},
        {Level: 7, Description: '😁 cHeAtEr 😁', Tempo: 500, SoundDuration: 0.2, ExtraLives: 1, WaitDuration: 4, Color: 'blue'},
        {Level: 8, Description: '😊 ChEaTeR 😊', Tempo: 500, SoundDuration: 0.2, ExtraLives: 1, WaitDuration: 4, Color: 'red'},
        {Level: 9, Description: '😁 C.H.E.A.T.E.R 😁', Tempo: 500, SoundDuration: 0.2, ExtraLives: 1, WaitDuration: 4, Color: 'red'},
        {Level: 10, Description: '😁 C.H.E.A.T.E.R 😁', Tempo: 500, SoundDuration: 0.2, ExtraLives: 1, WaitDuration: 4, Color: 'red'},
    ];    
}
else
{
    levelDefinition = [
        {Level: 0, Description: '---', Tempo: 100, SoundDuration: 1, ExtraLives: 1, WaitDuration: 10, Color: 'beige'},
        {Level: 1, Description: '💤 Easy 💤', Tempo: 100, SoundDuration: 1, ExtraLives: 3, WaitDuration: 10, Color: 'green'},
        {Level: 2, Description: '😊 Beginner 😊', Tempo: 200, SoundDuration: 0.8, ExtraLives: 7, WaitDuration: 8, Color: 'blue'},
        {Level: 3, Description: '😁 Intermediate 😁', Tempo: 300, SoundDuration: 0.6, ExtraLives: 7, WaitDuration: 6, Color: 'blue'},
        {Level: 4, Description: '😎 Expert 😎', Tempo: 400, SoundDuration: 0.4, ExtraLives: 7, WaitDuration: 4, Color: 'blue'},
        {Level: 5, Description: '🧐 Senior 🧐', Tempo: 500, SoundDuration: 0.2, ExtraLives: 7, WaitDuration: 4, Color: 'blue'},
        {Level: 6, Description: '😨 I N S A N E!! 😨', Tempo: 500, SoundDuration: 0.2, ExtraLives: 7, WaitDuration: 4, Color: 'blue'},
        {Level: 7, Description: '😱 C R A Z Y!! 😱', Tempo: 500, SoundDuration: 0.2, ExtraLives: 7, WaitDuration: 4, Color: 'blue'},
        {Level: 8, Description: '🤓 EINSTEIN! 🤓', Tempo: 500, SoundDuration: 0.2, ExtraLives: 7, WaitDuration: 4, Color: 'red'},
        {Level: 9, Description: '🚀 OUT OF THIS WORLD!', Tempo: 500, SoundDuration: 0.2, ExtraLives: 7, WaitDuration: 4, Color: 'red'},
    ];    
}
clearInterval(intervalSandClock);
clearInterval(intervalGameOver);
clearInterval(intervalUpdateTurns);
clearInterval(intervalUpdateScores);
clearInterval(intervalComputerStatus);
clearInterval(intervalAnnounceNewLevel);
clearInterval(intervalComputerIsPlaying);
sandClock = defaultSandClock;
computerStatus = 0;
computerStep = 0;
maxLevel = 10;
gameOverDisplayed = false;
// gameInProgress = false;
currentLevel = 0;
currentScore = 0;
currentPlayer = 0;
extraLives = 0;
currentGame = [];
currentElement = -1;
buttonByComputer = '';
buttonByUser = '';
btnStartCaption.style.color = 'green';
}

function updateScores()
{
if (gameInProgress)
{
    // let extraLifeEvery = 7;
    // currentLevel = Math.trunc(computerGame.length / 7) + 1;
    // if (computerGame.length % extraLifeEvery === 0)
    // {
    //     extraLives++;
    // }    
}
currentLevelDescription.textContent = levelDefinition[currentLevel].Description;
currentLevelDescription.style.color = levelDefinition[currentLevel].Color;
currentLevelCaption.textContent = `Level: ${currentLevel}`; //Math.trunc(computerGame.length / 7) + 1
currentScoreCaption.textContent = `Score: ${currentScore}`;
bestLevelCaption.textContent = `Best Level: ${bestLevel}`;
if (currentLevel > bestLevel)
{
    bestLevel = currentLevel;
}
if (currentScore > bestScore)
{
    bestScore = currentScore;
}
bestScoreCaption.textContent = `Best Score: ${bestScore}`;
displayExtraLives();
}

function userMakesMistake()
{
if (extraLives > 0)
{
    console.log('tocando specifica nota para game over');
    playSpecificNote('bn1', 100, 2);
    // playGameOver();
    extraLives--;
    computerStep = 3;
    setTimeout(() => {currentPlayer = 0;}, 1000);
    displayExtraLives();
    // currentPlayer = 0;
}
else
{
    console.log('tocando specifica nota para game over');
    playSpecificNote('bn1', 100, 2);
    //playGameOver();
    startStopGame();
    // let gameOver = document.getElementById('game-over');
    let bn9 = document.getElementById('bn9');
    bn9.src = buttonProperties[0] + buttonProperties[10].Image; //'../assets/colors/game-over.jpeg';
    bn9.alt = buttonProperties[10].Alt;
    intervalGameOver = setInterval(enterGameOverMode, 500);
    let announceLoser = document.getElementById('player-turn');
    announceLoser.textContent = '😛 YOU LOST 😛';
    announceLoser.style.color = 'red';
}

// if (extraLives < 0)
// {
//     playGameOver();
//     startStopGame();
//     // let gameOver = document.getElementById('game-over');
//     let bn9 = document.getElementById('pn9');
//     bn9.src = gameColors[0] + gameColors[10]; //'../assets/colors/game-over.jpeg';
//     bn9.alt = imgAlts[10];
//     // pn9.zIndex = -1;
//     // gameOver.setAttribute('hidden', 'hidden');
//     // gameOver.removeAttribute('hidden');
//     // gameOver.textContent = 'GAME OVER';
//     //gameOver.style.zIndex = 1;
//     // console.log('caminaste');
// }
// else
// {
//     elementToPerform--;
//     computerStep = -3;
//     currentPlayer = 0;
// }
}

function confirmCheatMode(event) 
{
console.log(event.key);
let pressedKey = event.key;
if (pressedKey === 'F1') //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
{
    event.preventDefault();
    cheaterMode = confirm('Do you really want to cheat????');
}
console.log('Cheater mode:',cheaterMode)
}

resetColors();
configureListeners();
setDefaultValues();
updateScores();
resetPlayerTurn();
