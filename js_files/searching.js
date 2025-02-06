let array = [];
let delay = 260;
let noOfElements = 30;
let compareClr = 'blue', foundClr = 'green', selectedRangeClr = 'orange', defaultClr = 'cyan';

createNewArray(noOfElements);

function colorElements(start, end, ele, clr){
    for(let i=start; i<=end; i++){
        ele[i].style.background = clr;
    }
}

function disableSearchingBtn() {
    document.querySelector(".linearsearch").disabled = true;
    document.querySelector(".binarysearch").disabled = true;
}

function enableDisclaimer(){
    let disclaimerEle = document.getElementById("disclaimer-text");
    disclaimerEle.classList.remove("d-none");
}

function disableDisclaimer(){
    let disclaimerEle = document.getElementById("disclaimer-text");
    disclaimerEle.classList.add("d-none");
}

function enableNotFoundTxt(){
    let notFoundEle = document.getElementById("notFound-text");
    notFoundEle.classList.remove("d-none");
}

function disableNotFoundTxt(){
    let notFoundEle = document.getElementById("notFound-text");
    notFoundEle.classList.add("d-none");
}

function enableSearchingBtn() {
    document.querySelector(".linearsearch").disabled = false;
    document.querySelector(".binarysearch").disabled = false;
}

function disableSizeSlider() {
    document.querySelector("#arr_sz").disabled = true;
}

function enableSizeSlider() {
    document.querySelector("#arr_sz").disabled = false;
}

function disableNewArrayBtn() {
    document.querySelector(".newArray").disabled = true;
}

function enableNewArrayBtn() {
    document.querySelector(".newArray").disabled = false;
}

function disableInputValue(){
    document.querySelector("#searchValue").disabled = true;
}

function enableInputValue(){
    document.querySelector("#searchValue").disabled = false;;
}

function setSizeOfArray(){
    let arrayEle = document.querySelector('#arr_sz');
    noOfElements = parseInt(arrayEle.value);
    disableDisclaimer();
    disableNotFoundTxt();
    disableWarningTxt();
    createNewArray(noOfElements)
}

function disableWarningTxt(){
    let warningEle = document.getElementById("warning-text")
    warningEle.classList.add("d-none");
}

function enableWarningTxt(){
    let warningEle = document.getElementById("warning-text")
    warningEle.classList.remove("d-none");
}

function changeSpeed(){
    let delayElement = document.querySelector('#speed_input');
    delay = 320 - parseInt(delayElement.value);
}

function createNewArray(noOfElements) {
    deleteChild();
    array = [];
    for (let i = 0; i < noOfElements; i++) {
        array.push(Math.floor(Math.random() * 50) + 5);
    }
    const bars = document.querySelector("#bars");
    for (let i = 0; i < noOfElements; i++) {
        const bar = document.createElement("div");
        bar.style.height = `40px`;
        bar.classList.add('bar');
        bar.classList.add('flex-item-search');
        bar.innerText = array[i]
        bars.appendChild(bar);
    }
}

function deleteChild() {
    const bar = document.querySelector("#bars");
    bar.innerHTML = '';
}

function waitforme(milisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec);
    })
}