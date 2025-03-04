let array = [], temp_array_copy = [];
let delay = 260, time = 0, noOfProcess = 5;
let process_Obj = {
    process_id: '',
    arrival_time: 0,
    start_time: 0,
    burst_time: 0,
    rem_burst_time: 0,
    completion_time: 0,
    turn_around_time: 0,
    waiting_time: 0,
    status: 'new',
};
let id_property_mapping = {
    process_id: {
        css_id: "#processID",
        label: "Process ID",
    },
    arrival_time: {
        css_id: "#arrival_time",
        label: "Arrival Time"
    },
    burst_time: {
        css_id: "#burst_time",
        label: "Burst Time",
    },
    completion_time: {
        css_id: "#completion_time",
        label: "Completion Time"
    },
    turn_around_time: {
        css_id: "#turn_around_time",
        label: "Turn Around Time",
    },
    waiting_time: {
        css_id: "#waiting_time",
        label: "Waiting Time",
    },
};

let color_Obj = {
    compare: {
        clr: 'blue',
        label: 'Compare'
    },
    completed: {
        clr: 'greenyellow',
        label: 'Completed',
    },
    ready: {
        clr: 'yellow',
        label: 'Ready'
    },
    running: {
        clr: 'orange',
        label: 'Running'
    },
    default: {
        clr: 'cyan',
        label: 'New'
    }
};

init();

function init(){
    const ele = document.querySelector("#timestamp");
    if(ele)
        ele.innerHTML = time;
    get_notation();
    createNewArray(noOfProcess);
    temp_array_copy = JSON.parse(JSON.stringify(array));
}

function get_notation(){
    const id_element = document.querySelector("#clr_code");
    for (let key in color_Obj) {
        const ele = document.createElement("div");
        ele.style.height = `30px`;
        ele.classList.add('box-item');
        ele.classList.add('mb-2');
        ele.style.background = color_Obj[key].clr ? color_Obj[key].clr : '';
        id_element.appendChild(ele);
    }

    const clr_label_element = document.querySelector("#clr_label");
    for (let key in color_Obj) {
        const ele = document.createElement("div");
        ele.style.height = `30px`;
        ele.classList.add('mb-2');
        ele.style.fontSize = '20px';
        ele.innerText = color_Obj[key].label ? color_Obj[key].label : '';
        clr_label_element.appendChild(ele);
    }
}


function disableSchedulingBtn() {
    document.querySelector(".fcfs").disabled = true;
    document.querySelector(".rr").disabled = true;
    document.querySelector(".sjf").disabled = true;
    document.querySelector(".hrrn").disabled = true;
    document.querySelector(".srjf").disabled = true;
    document.querySelector(".priority").disabled = true;
}

function enableSchedulingBtn() {
    document.querySelector(".fcfs").disabled = false;
    document.querySelector(".rr").disabled = false;
    document.querySelector(".sjf").disabled = false;
    document.querySelector(".hrrn").disabled = false;
    document.querySelector(".srjf").disabled = false;
    document.querySelector(".priority").disabled = false;
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

function setSizeOfProcess() {
    let processEle = document.querySelector('#arr_sz');
    noOfProcess = parseInt(processEle.value);
    createNewArray(noOfProcess)
}

function changeSpeed() {
    let delayElement = document.querySelector('#speed_input');
    delay = 220 - parseInt(delayElement.value);
}

function createNewArray(noOfProcess) {
    deleteChild();
    array = [];

    for (let i = 0; i < noOfProcess; i++) {
        let temp = Object.assign({}, process_Obj);
        temp["process_id"] = 'P' + i;
        temp["arrival_time"] = (Math.floor(Math.random() * 50) % noOfProcess);
        temp["burst_time"] = (Math.floor(Math.random() * 6) % 7) + 1;
        temp["rem_burst_time"] = temp["burst_time"];
        temp["start_time"] = '';
        temp["completion_time"] = '';
        temp["turn_around_time"] = '';
        temp["waiting_time"] = '';
        array.push(temp);
    }

    for (key in id_property_mapping) {
        populate_colums(id_property_mapping[key].css_id, key);
    }

}

function populate_colums(id_name, key_name) {
    const id_element = document.querySelector(id_name);
    for (let i = -1; i < array.length; i++) {
        const ele = document.createElement("div");
        ele.style.height = `40px`;
        ele.classList.add('flex-item-schedule');
        if (i == -1){
            ele.classList.add('bar_' + key_name);
            ele.innerText = id_property_mapping[key_name] && id_property_mapping[key_name].label ? id_property_mapping[key_name].label : (id_property_mapping[key_name] ? id_property_mapping[key_name] : '');
        }
        else{
            ele.innerText = array[i][key_name];
            ele.classList.add(key_name + '_' + array[i].process_id);
        }
        id_element.appendChild(ele);
    }
}

function deleteChild() {
    for (key in id_property_mapping) {
        {
            if (id_property_mapping[key].hasOwnProperty("css_id")) {
                const element = document.querySelector(id_property_mapping[key].css_id);
                element.innerHTML = '';
            }
        }
    }


}

function waitforme(milisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec);
    })
}