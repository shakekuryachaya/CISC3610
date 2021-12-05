document.addEventListener('DOMContentLoaded', init);

//the vegetables and their respective images
let canvas, ctx, output;
let vegetables, potato, eggplant, tomato, lettuce, onion;
let potatoImg, eggplantImg, tomatoImg, lettuceImg, onionImg;

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

//Set continuous to be false, but start the recognition again, if you want to keep listening for more commands.
//Otherwise try the continuous feature, but I found it easier to start the recognition after it stopped.
var recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';

//functions
function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    loadVegetableImages();
    defineVegetables();
    displayWords();

    output = document.getElementById('output');

    speakButton = document.getElementById('speak');
    speakButton.addEventListener('click', toggleSpeak);
}

//for displaying the images of vegetables
function loadVegetableImages() {
    potatoImg = new Image();
    potatoImg.src = 'pictures/potato.png';

    eggplantImg = new Image();
    eggplantImg.src = 'pictures/eggplant.png';

    tomatoImg = new Image();
    tomatoImg.src = 'pictures/tomato.png';

    lettuceImg = new Image();
    lettuceImg.src = 'pictures/lettuce.png';

    onionImg = new Image();
    onionImg.src = 'pictures/onion.png';
}

//diaplays the words of vegetables and their respective images when called
function defineVegetables() {
    potato = {
        name: 'Potato',
        x: canvas.width / 2,
        y: (canvas.height / 2) - 100,
        img: potatoImg
    };

    eggplant = {
        name: 'Eggplant',
        x: canvas.width / 2,
        y: (canvas.height / 2) - 50,
        img: eggplantImg
    };

    tomato = {
        name: 'Tomato',
        x: canvas.width / 2,
        y: (canvas.height / 2),
        img: tomatoImg
    };

    lettuce = {
        name: 'Lettuce',
        x: canvas.width / 2,
        y: (canvas.height / 2) + 50,
        img: lettuceImg
    };

    onion = {
        name: 'Onion',
        x: canvas.width / 2,
        y: (canvas.height / 2) + 100,
        img: onionImg
    };

    vegetables = {
        'potato': potato,
        'eggplant': eggplant,
        'tomato': tomato,
        'lettuce': lettuce,
        'onion': onion
    }
}

function displayWords() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.font = '40px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText(potato.name, potato.x, potato.y);
    ctx.fillText(eggplant.name, eggplant.x, eggplant.y);
    ctx.fillText(tomato.name, tomato.x, tomato.y);
    ctx.fillText(lettuce.name, lettuce.x, lettuce.y);
    ctx.fillText(onion.name, onion.x, onion.y);
}

//When the user stops speaking, or pressed "Stop", change the button's value to "Speak" so that the user can speak again.
function toggleSpeak(e) {
    text = e.target.textContent;
    if(text === 'Speak') {
        e.target.textContent = 'Stop';
        recognition.start();
    }
    else if(text === 'Stop') {
        e.target.textContent = 'Speak';
        recognition.abort();
    }
}

recognition.onresult = (e) => {
    res = e.results[0][0].transcript.toLowerCase();
    if(res == 'about') {
        copyright = 'Shake Kuryachaya - Copyright 2021';
        output.textContent = copyright;
        textToSpeech(copyright);   //text to speech plays back
    }
    else if(res == 'help') {
        help = 'Say a name of the object on the screen. Say about, to hear about the program.';
        output.textContent = help;
        textToSpeech(help); //text to speech plays back
    }
    else if(vegetables[res] != undefined) {
        vegetable = `The ${res} is now displayed`
        displayVegetable(vegetables[res]);
        output.textContent = vegetable;
        textToSpeech(vegetable); //text to speech plays back
    }
    //when something is called which is not on the list
    else {
        nomatch = "Sorry, that does not match anything.";
        output.textContent = nomatch;
        textToSpeech(nomatch); //text to speech plays back
        displayWords();
    }
}

function displayVegetable(vegetable) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(vegetable.name, canvas.width / 2, canvas.height / 2 - 120);
    ctx.drawImage(vegetable.img, (canvas.width / 2) - 150, canvas.height / 2.6, 270, 250);
}

function textToSpeech(text) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}

recognition.onspeechend = () => recognition.stop();
recognition.onerror = (e) => console.error(`Sorry, an error has occured: ${e.error}`);