const tasks = [];


const form = document.querySelector("form");
const input = document.querySelector("#taskInput");
const listTasks = document.querySelector(".listTasks");


// Ajouter une tâche
function addTask(event) {

    event.preventDefault();

    const text = input.value.trim();


    // Vérifier si l'entrée est vide
    if (text === "") {
        return;
    }


    // Création de l'objet tâche
    const task = {
        task_id: tasks.length,
        text: text,
        done: false
    };


    // Ajouter au tableau
    tasks.push(task);


    // Ajouter au DOM
    createTask(task);


    // vider l'input
    input.value = "";
}



// Création HTML d'une tâche
function createTask(task) {

    const div = document.createElement("div");
    div.classList.add("task");

    div.setAttribute("data-task-id", task.task_id);


    div.innerHTML = `
        <button class="delete">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <input type="checkbox">

        <label>${task.text}</label>
    `;


    listTasks.appendChild(div);


    // Checkbox
    const checkbox = div.querySelector("input");

    checkbox.addEventListener("change", () => {
        doneTask(task.task_id, div);
    });


    // Suppression
    const deleteBtn = div.querySelector(".delete");

    deleteBtn.addEventListener("click", () => {
        deleteTask(task.task_id, div);
    });

}



// Changer l'état terminé
function doneTask(id, div) {

    const task = tasks.find(task => task.task_id === id);


    task.done = !task.done;


    const label = div.querySelector("label");


    if(task.done){
        label.classList.add("done");
    }
    else{
        label.classList.remove("done");
    }

}



// Supprimer une tâche
function deleteTask(id, div) {


    // supprimer du tableau
    const index = tasks.findIndex(task => task.task_id === id);

    tasks.splice(index,1);


    // supprimer du DOM
    div.remove();

}


form.addEventListener("submit", addTask);