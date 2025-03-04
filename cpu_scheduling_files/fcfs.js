let queue = [], running_array = [], completed_array = [], temp_array = [];

function first_come_first_serve() {
    disableSchedulingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    fcfs();
}

function reset_process() {
    queue = [], running_array = [], completed_array = [], temp_array = [];
    temp_array = JSON.parse(JSON.stringify(temp_array_copy));
    for (let process of temp_array) {
        process.start_time = '';
        let process_id_ele = document.querySelectorAll(".process_id_" + process.process_id);
        let completion_time_ele = document.querySelectorAll(".completion_time_" + process.process_id);
        let turn_around_time_ele = document.querySelectorAll(".turn_around_time_" + process.process_id);
        let waiting_time_ele = document.querySelectorAll(".waiting_time_" + process.process_id);
        if (process_id_ele && process_id_ele.length)
            process_id_ele[0].style.background = color_Obj && color_Obj.default && color_Obj.default.clr ? color_Obj.default.clr : 'cyan';
        if (completion_time_ele && completion_time_ele.length)
            completion_time_ele[0].innerText = '';
        if (turn_around_time_ele && turn_around_time_ele.length)
            turn_around_time_ele[0].innerText = '';
        if (waiting_time_ele && waiting_time_ele.length)
            waiting_time_ele[0].innerText = '';
    }
}

async function fcfs() {
    time = 0;
    let count = 0;
    temp_array = JSON.parse(JSON.stringify(array)); //creates deep copy so if you make changes to 'temp_array', it won't affect 'array'
    if (completed_array.length == noOfProcess) {
        reset_process();
    }
    while (completed_array.length != noOfProcess) {
        set_time();
        await waitforme(delay*2);
        let queue_changed = false;
        //find processes that can be in ready queue
        for (let process of temp_array) {
            if (process.hasOwnProperty("arrival_time") && process.status == "new") {
                let ele = document.querySelectorAll(".arrival_time_" + process.process_id);
                if (ele){
                    await waitforme(delay);
                    ele[0].style.background = color_Obj && color_Obj.compare && color_Obj.compare.clr ? color_Obj.compare.clr : 'blue';
                }
                if (process.arrival_time == time) {
                    process.status = 'ready';
                    queue.push(process);
                    queue_changed = true;
                    await waitforme(delay);
                    ele[0].style.background = color_Obj && color_Obj.ready && color_Obj.ready.clr ? color_Obj.ready.clr : 'yellow';
                    await waitforme(delay);
                }
                else {
                    await waitforme(delay);
                    ele[0].style.background = color_Obj && color_Obj.default && color_Obj.default.clr ? color_Obj.default.clr : 'cyan';
                    await waitforme(delay);
                }
            }
        }
        if(queue_changed){
            await waitforme(delay);
            display_queue();
            await waitforme(delay);
        }
        
        // find process that can be in running state, a single process can run.
        ready_to_running();
        
        //find process that can be moved into completed state
        if(running_array.length){
            if(running_array[0].hasOwnProperty("rem_burst_time") && running_array[0].rem_burst_time == 0){
                let process = running_array[0];
                completed_array.push(process);
                running_array.splice(0, 1);
                let process_id_ele = document.querySelectorAll(".process_id_" + process.process_id);
                if(process_id_ele){
                    await waitforme(delay);
                    process_id_ele[0].style.background = color_Obj && color_Obj.completed && color_Obj.completed.clr ? color_Obj.completed.clr : 'greenyellow';
                }
                process.status = 'completed';
                process.completion_time = time;
                process.turn_around_time = time - process.arrival_time;
                process.waiting_time = process.turn_around_time - process.burst_time;
                let completion_time_ele = document.querySelectorAll(".completion_time_" + process.process_id);
                let turn_around_time_ele = document.querySelectorAll(".turn_around_time_" + process.process_id);
                let waiting_time_ele = document.querySelectorAll(".waiting_time_" + process.process_id);
                if (completion_time_ele && completion_time_ele.length) {
                    completion_time_ele[0].innerText = time;
                    if (turn_around_time_ele && turn_around_time_ele.length)
                        turn_around_time_ele[0].innerText = process.turn_around_time;
                    if (waiting_time_ele && waiting_time_ele.length)
                        waiting_time_ele[0].innerText = process.waiting_time;
                }
                ready_to_running();
                count++;
            }
        }
        create_gantt_chart();
        if (count == noOfProcess) {
            enableSchedulingBtn();
            enableSizeSlider();
            enableNewArrayBtn();
            break;
        }
        time++;
    }
}

function create_gantt_chart() {
    let timeline = document.getElementById("timeline");
    let ganttChart = document.getElementById("ganttChart_process");
    ganttChart.innerHTML = "";
    timeline.innerHTML = "";

    for (let i = 0; i <= time; i++) {
        let flag = false;
        let timeLabel = document.createElement("div");
        timeLabel.classList.add("time-label");
        timeLabel.style.width = '50px'; 
        timeLabel.style.textAlign = 'left';
        timeLabel.innerText = i;
        timeline.appendChild(timeLabel);
        if (running_array.length) {
            let process = running_array[0];
            if (process.hasOwnProperty("start_time") && i >= process.start_time) {
                flag = true;
                let bar = document.createElement("div");
                bar.classList.add("bar-gantt-chart");
                bar.style.width = `50px`;
                bar.style.backgroundColor = color_Obj && color_Obj.running && color_Obj.running.clr ? color_Obj.running.clr : 'greenyellow';
                bar.innerText = process.process_id ? process.process_id : '';
                ganttChart.appendChild(bar);
            }
        }

        if (completed_array.length) {
            for (let k = 0; k < completed_array.length; k++) {
                let process = completed_array[k];
                if (process.hasOwnProperty("start_time") && i >= process.start_time && i < process.completion_time) {
                    flag = true;
                    let bar = document.createElement("div");
                    bar.classList.add("bar-gantt-chart");
                    bar.style.width = `50px`;
                    bar.style.backgroundColor = color_Obj && color_Obj.completed && color_Obj.completed.clr ? color_Obj.completed.clr : 'greenyellow';
                    bar.innerText = process.process_id ? process.process_id : '';
                    ganttChart.appendChild(bar);
                }
            }
        }

        if (flag == false) {
            let bar = document.createElement("div");
            bar.classList.add("bar-gantt-chart");
            bar.style.width = `50px`;
            ganttChart.appendChild(bar);
        }
    }
}

async function ready_to_running(){
    if (running_array.length == 0) {
        if (queue.length) {
            let process = queue[0];
            process.start_time = time;
            running_array.push(process);
            queue.splice(0, 1);
            let arrival_time_ele = document.querySelectorAll(".arrival_time_" + process.process_id);
            let process_id_ele = document.querySelectorAll(".process_id_" + process.process_id);
            if(arrival_time_ele){
                await waitforme(delay);
                arrival_time_ele[0].style.background = color_Obj && color_Obj.default && color_Obj.default.clr ? color_Obj.default.clr : 'cyan';
            }
            if(process_id_ele){
                await waitforme(delay);
                process_id_ele[0].style.background = color_Obj && color_Obj.running && color_Obj.running.clr ? color_Obj.running.clr : 'orange';
            }
            process.status = 'running';
            display_queue();
            await waitforme(delay);
        }
    }
    else {
        running_array[0].rem_burst_time--;
    }
}

function display_queue() {
    delete_queue();
    const q = document.querySelector("#queue");
    for (let process in queue) {
        const temp_queue = document.createElement("div");
        temp_queue.style.height = `50px`;
        temp_queue.classList.add('flex-item-queue');
        temp_queue.innerText = queue[process].process_id;
        q.appendChild(temp_queue);
    }
    
}

async function set_time(){
    const time_ele = document.querySelector("#timestamp");
    if(time_ele){
        await waitforme(delay);
        time_ele.innerHTML = time;
        await waitforme(delay);
    }
}

function delete_queue() {
    const q = document.querySelector("#queue");
    q.innerHTML = '';
}

