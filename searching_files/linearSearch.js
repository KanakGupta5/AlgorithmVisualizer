async function linearsearch() {
    disableSearchingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    disableInputValue();
    disableDisclaimer();
    disableNotFoundTxt();
    let value = document.getElementById("searchValue").value;
    let found = false;
    if (value != "" && value != undefined && value != null) {
        disableWarningTxt();
        const ele = document.querySelectorAll(".bar");
        colorElements(0,ele.length-1,ele,defaultClr)
        for (let i = 0; i < ele.length; i++) {
            ele[i].style.background = compareClr;
            if (parseInt(ele[i].innerText) == value) {
                await waitforme(delay);
                ele[i].style.background = foundClr;
                found = true;
                enableSearchingBtn();
                enableSizeSlider();
                enableNewArrayBtn();
                enableInputValue();
                break;
            }
            else{
                await waitforme(delay);
                ele[i].style.background = defaultClr;
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
    else{
        enableWarningTxt();
        enableSearchingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
        enableInputValue();
    }

}