const fieldTask = document.querySelector(".field__task");
const buttonInputTask = document.querySelector(".task__add");
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
    const liTask = document.createElement("li");
    const spanTask = document.createElement("span");
    const btnRemoveTask = document.createElement("button");

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

renderAllTasks();

buttonInputTask.addEventListener("click", () => { addTask(fieldTask.value); });

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

