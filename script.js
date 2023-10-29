// JavaScript for task management functionality

let completedTaskCount = 0;

function addTask() {
    const taskName = document.getElementById("task-name").value;
    const taskCategory = document.getElementById("task-category").value;
    const taskDeadline = document.getElementById("task-deadline").value;
    const taskPriority = document.getElementById("task-priority").value;

    if (taskName !== "") {
        const taskList = document.getElementById("task-list");
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${taskName}</td>
            <td>${taskCategory}</td>
            <td>${taskDeadline}</td>
            <td>${taskPriority}</td>
            <td><button onclick="markTaskAsComplete(this)">Mark as Complete</button></td>
            <td><button onclick="editTask(this)">Edit</button></td>
        `;
        taskList.appendChild(row);
        clearTaskForm();
        updateProgress();
    }
}

function markTaskAsComplete(button) {
    button.parentElement.parentElement.style.textDecoration = "line-through";
    button.style.display = "none";
    completedTaskCount++;
    updateProgress();
}

function editTask(button) {
    const taskRow = button.parentElement.parentElement;
    const taskCells = taskRow.getElementsByTagName("td");
    const taskName = taskCells[0].textContent;
    const taskCategory = taskCells[1].textContent;
    const taskDeadline = taskCells[2].textContent;
    const taskPriority = taskCells[3].textContent;

    document.getElementById("task-name").value = taskName;
    document.getElementById("task-category").value = taskCategory;
    document.getElementById("task-deadline").value = taskDeadline;
    document.getElementById("task-priority").value = taskPriority;

    taskRow.remove();
    updateProgress();
}

function updateProgress() {
    const totalTasks = document.getElementById("task-list").getElementsByTagName("tr").length;
    const progressText = document.getElementById("progress-text");

    progressText.textContent = `Completed: ${completedTaskCount} / Total: ${totalTasks}`;
}

function clearTaskForm() {
    document.getElementById("task-name").value = "";
    document.getElementById("task-category").value = "Web Design";
    document.getElementById("task-deadline").value = "";
    document.getElementById("task-priority").value = "low";
}

function sortTasks() {
    const sortValue = document.getElementById("sort-by").value;
    const taskList = document.getElementById("task-list");
    const tasks = [...taskList.getElementsByTagName("tr")];

    if (sortValue === "priority") {
        tasks.sort((a, b) => {
            const priorityA = a.getElementsByTagName("td")[3].textContent;
            const priorityB = b.getElementsByTagName("td")[3].textContent;
            return priorityA.localeCompare(priorityB);
        });
    }

    taskList.innerHTML = "";
    tasks.forEach(task => taskList.appendChild(task));
}

function filterTasks() {
    const filterValue = document.getElementById("filter-by").value;
    const taskList = document.getElementById("task-list");
    const tasks = taskList.getElementsByTagName("tr");

    for (const task of tasks) {
        const category = task.getElementsByTagName("td")[1].textContent;
        if (filterValue === "all" || filterValue === category) {
            task.style.display = "";
        } else {
            task.style.display = "none";
        }
    }
}
