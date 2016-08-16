//var findEl = document.querySelector('.selector-find');
//var input = document.querySelector('.selector');
//var selectedEl;
//function colorizedEl() {
//    selectedEl = document.querySelector(input.value);
//    selectedEl.style.backgroundColor = 'lightblue';
//    selectedEl.style.outline = 'solid red 5px';
//}
//var findEl = document.querySelector('.selector-find');
//findAllEl.addEventListener('click', colorizedEl);
//var nextEl = document.querySelector('.selector-next');
//nextEl.removeAttribute("disabled");
//nextEl.addEventListener('click', colorizedEl);

var findEl = document.querySelector('.selector-find');
var input = document.querySelector('.selector');
var nextEl = document.querySelector('.selector-next');
var prevEl = document.querySelector('.selector-prev');
var findParent = document.querySelector('.nav-top');
var findChild = document.querySelector('.nav-bottom');
var findPrevNeighbour = document.querySelector('.nav-left');
var findNextNeighbour = document.querySelector('.nav-right');
var selectedEl;
var CurrentNumber = 0;
function colorizedEl() {
    makeClear();
    selectedEl = Array.from(document.querySelectorAll(input.value));
    CurrentNumber = 0;
    selectedEl[CurrentNumber].style.backgroundColor = 'lightblue';
    selectedEl[CurrentNumber].style.outline = 'solid red 5px';
    prevEl.setAttribute("disabled", "true");
    nextEl.removeAttribute("disabled");
    if(selectedEl.length === 1){
        nextEl.setAttribute("disabled", "true");
    }
    if(selectedEl[CurrentNumber].parentNode !== null){
        findParent.removeAttribute("disabled");
    }
    if(selectedEl[CurrentNumber].firstElementChild !== null){
        findChild.removeAttribute("disabled");
    }
    if(selectedEl[CurrentNumber].nextElementSibling !== null){
        findNextNeighbour.removeAttribute("disabled");
    }
}
function colorizedNext() {
    selectedEl[CurrentNumber].style.backgroundColor = '';
    selectedEl[CurrentNumber].style.outline = '';
    nextEl.removeAttribute("disabled");
    prevEl.removeAttribute("disabled");
    if(selectedEl[CurrentNumber +2] === undefined){
        nextEl.setAttribute("disabled", "true");
    }
    selectedEl[CurrentNumber + 1].style.backgroundColor = 'lightblue';
    selectedEl[CurrentNumber + 1].style.outline = 'solid red 5px';
    CurrentNumber += 1;
}
function colorizedPrev() {
    selectedEl[CurrentNumber].style.backgroundColor = '';
    selectedEl[CurrentNumber].style.outline = '';
    selectedEl[CurrentNumber - 1].style.backgroundColor = 'lightblue';
    selectedEl[CurrentNumber - 1].style.outline = 'solid red 5px';
    nextEl.removeAttribute("disabled");
    if(selectedEl[CurrentNumber - 2] === undefined){
        prevEl.setAttribute("disabled", "true");
    }
    CurrentNumber -= 1;
}

function makeClear(){
    prevEl.setAttribute("disabled", "true");
    nextEl.setAttribute("disabled", "true");
    if (selectedEl !== undefined && selectedEl[CurrentNumber] !== null){
        if(selectedEl[CurrentNumber] !== null){
            selectedEl[CurrentNumber].style.backgroundColor = '';
            selectedEl[CurrentNumber].style.outline = '';
        }
        if(selectedEl[CurrentNumber].parentElement !== null){
            selectedEl[CurrentNumber].parentElement.style.backgroundColor = '';
            selectedEl[CurrentNumber].parentElement.style.outline = '';
        }
        if(selectedEl[CurrentNumber].firstElementChild !== null){
            selectedEl[CurrentNumber].firstElementChild.style.backgroundColor = '';
            selectedEl[CurrentNumber].firstElementChild.style.outline = '';
        }
        if(selectedEl[CurrentNumber].nextElementSibling !== null){
            selectedEl[CurrentNumber].nextElementSibling.style.backgroundColor = '';
            selectedEl[CurrentNumber].nextElementSibling.style.outline = '';
        }
        if (selectedEl[CurrentNumber].previousElementSibling !== null){
            selectedEl[CurrentNumber].previousElementSibling.style.backgroundColor = '';
            selectedEl[CurrentNumber].previousElementSibling.style.outline = '';
        }
    }
}

function getParent() {
    makeClear();
    if(selectedEl[CurrentNumber].parentElement !== null){
        selectedEl[CurrentNumber].parentElement.style.backgroundColor = 'lightblue';
        selectedEl[CurrentNumber].parentElement.style.outline = 'solid red 5px';
    }
    selectedEl[CurrentNumber] = selectedEl[CurrentNumber].parentElement;
    var html = document.querySelector('html');
    if(selectedEl[CurrentNumber].parentElement === html){
        findParent.setAttribute("disabled", "true");
    }
    findChild.removeAttribute("disabled");
}

function getChild() {
    makeClear();
    if(selectedEl[CurrentNumber].firstElementChild !== null){
        selectedEl[CurrentNumber].firstElementChild.style.backgroundColor = 'lightblue';
        selectedEl[CurrentNumber].firstElementChild.style.outline = 'solid red 5px';
    }
    selectedEl[CurrentNumber] = selectedEl[CurrentNumber].firstElementChild;
    if(selectedEl[CurrentNumber].firstElementChild === null){
        findChild.setAttribute("disabled", "true");
    }
    findParent.removeAttribute("disabled");
}

function getNextNeighbour(){
    makeClear();
    if(selectedEl[CurrentNumber].nextElementSibling !== null){
        selectedEl[CurrentNumber].nextElementSibling.style.backgroundColor = 'lightblue';
        selectedEl[CurrentNumber].nextElementSibling.style.outline = 'solid red 5px';
        findPrevNeighbour.removeAttribute("disabled");
    }
    selectedEl[CurrentNumber] = selectedEl[CurrentNumber].nextElementSibling;
    if(selectedEl[CurrentNumber].nextElementSibling === null){
        findNextNeighbour.setAttribute("disabled", "true");
    }
    findPrevNeighbour.removeAttribute("disabled");
}

function getPrevNeighbour(){
    makeClear();
    if(selectedEl[CurrentNumber].previousElementSibling !== null){
        selectedEl[CurrentNumber].previousElementSibling.style.backgroundColor = 'lightblue';
        selectedEl[CurrentNumber].previousElementSibling.style.outline = 'solid red 5px';
    }
    selectedEl[CurrentNumber] = selectedEl[CurrentNumber].previousElementSibling;
    if(selectedEl[CurrentNumber].previousElementSibling === null){
        findPrevNeighbour.setAttribute("disabled", "true");
    }
    findNextNeighbour.removeAttribute("disabled");
}

findEl.addEventListener('click', colorizedEl);
nextEl.addEventListener('click', colorizedNext);
prevEl.addEventListener('click', colorizedPrev);
findParent.addEventListener('click', getParent);
findChild.addEventListener('click', getChild);
findNextNeighbour.addEventListener('click', getNextNeighbour);
findPrevNeighbour.addEventListener('click', getPrevNeighbour);

