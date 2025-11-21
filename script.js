const fieldTask = document.querySelector(".field__task");
const buttonInputTask = document.querySelector(".task__add");
const buttonExampleTask = document.querySelector(".example__add");
const todoList = document.querySelector(".todo__list");
const taskTitle = document.querySelector(".task__title");

let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

const addTask = (title) => {
    if (!title.trim()) return alert("Введите название задачи");

    const task = {
        id: crypto.randomUUID(),
        title,
        completed: false
    };

    taskList.push(task);
    save();
    renderTask(task);
    updateTitle();
    fieldTask.value = "";
};

const save = () => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
};

const updateTitle = () => {
    taskTitle.textContent = taskList.length
        ? `Список задач (${taskList.length})`
        : "Задач нет";
};

const removeTask = (id) => {
    taskList = taskList.filter(task => task.id !== id);
    
    save();
    renderAllTasks();
    updateTitle();
};

const doneTask = (taskElement) => {   
    taskElement.classList.add("is-completed");
};

const renderTask = (task) => {
    const liTask = document.createElement("li");
    const spanTask = document.createElement("span");
    const btnRemoveTask = document.createElement("button");

    liTask.dataset.id = task.id;

    liTask.className = "task";
    spanTask.className = "taskText";
    spanTask.textContent = task.title;

    btnRemoveTask.classList.add("btn--remove");
    btnRemoveTask.textContent = "X";

    todoList.append(liTask);
    liTask.append(spanTask);
    liTask.append(btnRemoveTask);
};

const renderAllTasks = () => {
    todoList.innerHTML = "";
    JSON.parse(localStorage.getItem("tasks") || []).forEach(renderTask);
};

const getExampleTasks = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
    const data = await response.json();

    data.forEach(e => addTask(e.title));
};

buttonInputTask.addEventListener("click", () => { addTask(fieldTask.value); });
buttonExampleTask.addEventListener("click", () => { getExampleTasks(); });

document.addEventListener("click", (e) => {
    const taskEl = e.target.closest(".task");
    if (!taskEl) return;

    const id = taskEl.dataset.id;
    console.log(id);

    if (e.target.classList.contains("btn--remove")) {
        removeTask(id);
        return;
    }

    if (e.target.classList.contains("taskText")) {
        doneTask(id);
        return;
    }
});

renderAllTasks();