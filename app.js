// get all elements that will be interactive 

const createInput = document.querySelector(".create-input");
const addItemBtn = document.querySelector(".add-item");
const unorderedList = document.querySelector(".collection");


addItemBtn.addEventListener("click", function (e) {
    const task = createInput.value;
    if (task === "") {
        alert("Create new Task");
    } else {
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task));
        const link = document.createElement("a");
        link.className = "secondary-content"
        link.innerHTML = "<i class='fa fa-remove'></i>"
        li.appendChild(link);
        unorderedList.appendChild(li);
        createInput.value = " ";
    }
});