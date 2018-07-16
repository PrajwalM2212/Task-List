// get all elements that will be interactive 

const createInput = document.querySelector(".create-input");
const createForm = document.querySelector(".create-form");
const addItemBtn = document.querySelector(".add-item");
const unorderedList = document.querySelector(".collection");
const clearAllTasksBtn = document.querySelector(".delete-all");
const filterInput = document.querySelector(".filter-input");

console.log(clearAllTasksBtn);
loadAllEventListeners();


// load all event listeners
function loadAllEventListeners() {

    document.addEventListener("DOMContentLoaded", loadDOM)
    createForm.addEventListener("submit", addTask);
    addItemBtn.addEventListener("click", addTask);
    unorderedList.addEventListener("click", removeTask);
    clearAllTasksBtn.addEventListener("click", clearAllTasks);
    filterInput.addEventListener("keyup", filterTasks);

}

// add Task
function addTask(e) {
    // get value of input 
    const task = createInput.value;
    if (task === "") {
        alert("Create new Task");
    } else {
        // create a li
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task));
        const link = document.createElement("a");
        // required to have class name as secondary-content
        link.className = "secondary-content"
        link.innerHTML = "<i class='fa fa-remove'></i>"
        li.appendChild(link);
        unorderedList.appendChild(li);
        storeNewTask(task);
        createInput.value = " ";
    }
    // prevent form from reloading
    e.preventDefault();
}

// remove task 
function removeTask(e) {

    if (e.target.parentElement.className === "secondary-content") {
        e.target.parentElement.parentElement.remove();

        const taskContent = e.target.parentElement.parentElement.textContent;
        removeTaskFromStorage(taskContent);
    }
}

// clear all tasks
function clearAllTasks(e) {

    console.log(unorderedList.childElementCount);
    if (unorderedList.childElementCount > 0 && confirm("All items will be deleted!")) {
        while (unorderedList.childElementCount > 0) {
            unorderedList.removeChild(unorderedList.firstElementChild);
        }
        clearAllTasksFromStrorage();
    }

}

// filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll("li");
    listItems.forEach(function (task) {
        const listItemContent = task.textContent.toLowerCase();
        if (listItemContent.indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}

// store a new task in local storage

function storeNewTask(task) {

    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// set up tasks in task list as the DOM is loaded

function loadDOM() {

    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks.length > 0) {

        tasks.forEach(function (task) {
            var li = document.createElement("li");
            li.className = "collection-item";
            li.appendChild(document.createTextNode(task));
            var link = document.createElement("a");
            link.className = "secondary-content";
            link.innerHTML = "<i class='fa fa-remove'></i>";
            li.appendChild(link);
            unorderedList.appendChild(li);
        });

    }
}

// remove a task from local storage

function removeTaskFromStorage(taskContent) {
    console.log(taskContent)
    let tasks;
    if (localStorage.getItem("tasks") == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task, index) {
        if (task === taskContent) {
            tasks.splice(index, 1);
        }
    });

    tasks = localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear all tasks from storage

function clearAllTasksFromStrorage(){

    localStorage.removeItem("tasks");

}


