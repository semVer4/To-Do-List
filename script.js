const fieldTask = document.querySelector(".field__task");
const buttonInputTask = document.querySelector(".task__add");
const buttonExampleTask = document.querySelector(".example__add");
const todoList = document.querySelector(".todo__list");


let taskList = [...JSON.parse(localStorage.getItem("tasks"))];

const addTask = (task) => {
    if (!task.trim()) {
        alert("Введите название задачи");
        return;
    } else {
        taskList.push(task);
        localStorage.setItem("tasks", JSON.stringify(taskList));
    }

    renderTask(task);
    fieldTask.value = "";
};

const removeTask = (taskElement) => {
    taskList = taskList.filter(task => task !== taskElement);
    localStorage.setItem("tasks", JSON.stringify(taskList));

    renderAllTasks();
};

const doneTask = (taskElement) => {   
    taskElement.classList.add("is-completed");
};

const renderTask = (task) => {
    const taskTitle = document.querySelector(".task__title");

    const liTask = document.createElement("li");
    const spanTask = document.createElement("span");
    const btnRemoveTask = document.createElement("button");

    taskTitle.length == 0 
        ? taskTitle.textContent = "Задач не найдено" 
        : taskTitle.textContent = `Список задач: (${taskList.length})`;

    liTask.className = "task";
    spanTask.className = "taskText";
    spanTask.textContent = task;

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

renderAllTasks();

buttonInputTask.addEventListener("click", () => { addTask(fieldTask.value); });
buttonExampleTask.addEventListener("click", () => { getExampleTasks(); });

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn--remove")) {
        const li = e.target.closest(".task");
        const liText = li.querySelector(".taskText").textContent;

        removeTask(liText);

        return;
    }

    if (e.target.classList.contains("taskText")) {
        doneTask(e.target.closest(".task"));
    }
});

