async function binarysearch() {
    if(isSortedAsc() == false){
        enableDisclaimer();
        createSortedArray();
        await waitforme(delay*3);
    }
    else
    disableDisclaimer();
    binarySearchAlgo();
}

function isSortedAsc(){
    const bars = document.querySelectorAll(".bar");
    for (let i = 1; i < bars.length; i++) {
        if(parseInt(bars[i].innerText) < parseInt(bars[i-1].innerText))
            return false;
    }
    return true;
}

function createSortedArray() {
    deleteChild();
    let array = [];
    let arrayEle = document.querySelector('#arr_sz');
    let noOfElements = parseInt(arrayEle.value);
    for (let i = 0; i < noOfElements; i++) {
        if(i == 0)
        array.push(Math.floor(Math.random() * 50) + 5);
        else
        array.push(array[i-1] + Math.floor(Math.random() * 5) + 5);
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

async function binarySearchAlgo() {
    disableSearchingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    disableInputValue();
    disableNotFoundTxt();
    let value = document.getElementById("searchValue").value;
    let found = false;
    if (value != "" && value != undefined && value != null) {
        disableWarningTxt();
        const ele = document.querySelectorAll(".bar");
        colorElements(0,ele.length-1,ele,defaultClr) //consider a user runs linear search prior to binary search than a bar would be of green color, to reset the color of every bar this function call is made
        let low = 0, high = ele.length - 1;
        while (low <= high) {
            let mid = parseInt((low + high) / 2);
            ele[mid].style.background = compareClr;
            if (parseInt(ele[mid].innerText) == value) {
                await waitforme(delay);
                ele[mid].style.background = foundClr;
                found = true;
                enableSearchingBtn();
                enableSizeSlider();
                enableNewArrayBtn();
                enableInputValue();
                break;
            }
            else if (parseInt(ele[mid].innerText) < value) {
                await waitforme(delay);
                ele[mid].style.background = defaultClr;
                colorElements(mid+1, high, ele, selectedRangeClr);
                await waitforme(delay);
                colorElements(mid+1, high, ele, defaultClr);
                low = mid + 1;
            }
            else {
                await waitforme(delay);
                ele[mid].style.background = defaultClr;
                colorElements(low, mid-1, ele, selectedRangeClr);
                await waitforme(delay);
                colorElements(low, mid-1, ele, defaultClr);
                high = mid - 1;
            }
        }
        if(!found){
            enableSearchingBtn();
            enableSizeSlider();
            enableNewArrayBtn();
            enableInputValue();
            enableNotFoundTxt();
        }
    }
    else {
        enableWarningTxt();
        enableSearchingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
        enableInputValue();
    }
}

