// define levels
let currentLevel = 1;
let maxLevel = 1;
//define array with queue of buttons to follow
let currentGame = []
// currentPlayer 0:Computer, 1:User
let currentPlayer = 0;
// configuration sounds
let tempo = 100; //100 beats per minute is the default

const doReMiFaSo = [
    {note: "C4", duration: 0.5, frequency: 261.63, boton: 'pn1'},
    {note: "D4", duration: 0.5, frequency: 293.66, boton: 'pn2'},
    {note: "E4", duration: 0.5, frequency: 329.63, boton: 'pn3'},
    {note: "F4", duration: 0.5, frequency: 349.23, boton: 'pn4'},
    {note: "G4", duration: 0.5, frequency: 392.00, boton: 'pn5'},
    {note: "A4", duration: 0.5, frequency: 440.00, boton: 'pn6'},
    {note: "B4", duration: 0.5, frequency: 493.88, boton: 'pn7'},
    {note: "C5", duration: 0.5, frequency: 523.25, boton: 'pn8'},
    {note: "C4", duration: 0.5, frequency: 261.63, boton: 'pn9'},
  ];

function resetGame() {
    currentLevel = 1;
    maxLevel = 1;
    currentGame = [];
    currentPlayer = 0;
    tempo = 100;
}

function configureListeners() {
    let images = document.querySelectorAll('img');
    images.forEach((i) => {
        document.getElementById(i.id).addEventListener('click', playSound, false);
    })
    let boton = document.querySelector('#btn-start');
    boton.addEventListener('click', resetGame, false);
}

function playSound(event) {
    buttonClicked = event.target.id;
    doReMiFaSo.forEach((note) => {
    if (note.boton == buttonClicked)
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

function getProductInfo(paintColor) {
    return;
    let price = 0;
    let colorName;
    
    switch (paintColor) {
        case 'pn1':
            price = '$14.99';
            colorName = 'Lime Green';
            break;
        case 'pn2':
            price = '$11.14';
            colorName = 'Medium Brown';
            break;
        case 'pn3':
            price = '$22.99';
            colorName = 'Royal Blue';
            break;
        case 'pn4':
            price = '$13.42';
            colorName = 'Solid Red';
            break;
        case 'pn5':
            price = '$21.98';
            colorName = 'Solid White';
            break;
        case 'pn6':
            price = '$4.99';
            colorName = 'Solid Black';
            break;
        case 'pn7':
            price = '$8.22';
            colorName = 'Solid Cyan';
            break;
        case 'pn8':
            price = '$11.99';
            colorName = 'Solid Purple';
            break;   
        case 'pn9':
            price = '$14.99';
            colorName = 'Solid Yellow';
            break;
          default:
            break;
    }
    if (price !== 0) {
        updatePrice(colorName, price);
    }

    function updatePrice(colorName, price)
    {       
        return;
        // display price
        let colorPrice = document.getElementById('color-price'); // select element with corresponding id
        colorPrice.textContent = price;
        //display color name
        let color = document.getElementById('color-name');// select element with corresponding id
        color.textContent = colorName;
    } 
}
