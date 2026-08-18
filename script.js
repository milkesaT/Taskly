const today = new Date().toDateString();
const savedDate = localStorage.getItem("taskDate");

if (savedDate !== today) {
    localStorage.removeItem("tasks");
    localStorage.setItem("taskDate", today);
}
const quotes = [
    "One task at a time. Keep moving forward.",
    "Small progress is still progress.",
    "Focus on what matters today.",
    "Discipline turns goals into results.",
    "Start where you are. Do what you can.",
    "Don't stop until you're proud.",
    "Your future self will thank you."
];

const quote = document.querySelector(".quote");

let index = 0;

quote.textContent = quotes[index];

setInterval(function() {
    index++;

    if (index === quotes.length) {
        index = 0;
    }

    quote.textContent = quotes[index];
}, 5000);
const input = document.querySelector("input");
const taskList = document.querySelector(".task-list");
const button = document.querySelector("button");
function addTask(taskData) {
    const taskRow = document.createElement("div");
    taskRow.className = "task-row";

    const task = document.createElement("div");
    task.className = "task";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = taskData.completed;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    task.appendChild(checkbox);
    task.append(taskData.text);

    taskRow.appendChild(task);
    taskRow.appendChild(deleteButton);

    taskList.appendChild(taskRow);

    checkbox.addEventListener("change", function() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        const currentTask = tasks.find(function(item) {
            return item.text === taskData.text;
        });

        currentTask.completed = checkbox.checked;

        localStorage.setItem("tasks", JSON.stringify(tasks));

        updateProgress();
    });

    deleteButton.addEventListener("click", function() {
        taskRow.remove();

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        tasks = tasks.filter(function(item) {
            return item.text !== taskData.text;
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));

        updateProgress();
    });
}

button.addEventListener("click", function() {
    if (input.value === "") {
        return;
    }

    const newTask = {
        text: input.value,
        completed: false
    };

    addTask(newTask);

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";

    updateProgress();
});
function updateProgress() {
    const checkboxes = document.querySelectorAll(".task input");

    const total = checkboxes.length;
    const completed = document.querySelectorAll(".task input:checked").length;

    let percentage = 0;

    if (total > 0) {
        percentage = Math.round((completed / total) * 100);
    }

    document.querySelector(".progress-text").textContent =
        percentage + "%";

    document.querySelector(".progress-circle").style.background =
        `conic-gradient(#10b981 ${percentage}%, #e5e7eb ${percentage}%)`;
}


// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

for (let task of tasks) {
    addTask(task);
}

updateProgress();