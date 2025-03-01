let queue = [], running_array = [], completed_array = [], temp_array = [];

function first_come_first_serve() {
    disableSchedulingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    fcfs();
}


async function fcfs() {
    time = 0;
    let count = 0;
    temp_array = JSON.parse(JSON.stringify(array)); //creates shallow copy so if you make changes to 'temp_array', it won't affect 'array'
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
                    ele[0].style.background = compareClr;
                }
                if (process.arrival_time == time) {
                    process.status = 'ready';
                    queue.push(process);
                    queue_changed = true;
                    await waitforme(delay);
                    ele[0].style.background = readyClr;
                    await waitforme(delay);
                }
                else {
                    await waitforme(delay);
                    ele[0].style.background = defaultClr;
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
                    process_id_ele[0].style.background = completedClr;
                }
                process.status = 'completed';
                process.completion_time = time;
                ready_to_running();
                count++;
            }
        }

        
        
        
        // // create_gantt_chart();
        if (count == noOfProcess){ //for testing kanak
            console.log(JSON.parse(JSON.stringify(temp_array)));
            enableSchedulingBtn();
            enableSizeSlider();
            enableNewArrayBtn();
            break;
        }
        time++;
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
                arrival_time_ele[0].style.background = defaultClr;
            }
            if(process_id_ele){
                await waitforme(delay);
                process_id_ele[0].style.background = runningClr;
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

