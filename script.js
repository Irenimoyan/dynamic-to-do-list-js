// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {

    // Select necessary DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't save again
    }

    // Function to save the current list of tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        const listItems = taskList.querySelectorAll('li');
        listItems.forEach(item => {
            // Get only the task text (excluding the remove button)
            const taskText = item.firstChild.textContent.trim();
            tasks.push(taskText);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a new task (optionally save to Local Storage)
    function addTask(taskText = null, save = true) {
        // If no argument passed, get from input field
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        // If the task is empty, alert the user
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item (li)
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Add click event to remove the task from the DOM and update Local Storage
        removeButton.onclick = function () {
            taskList.removeChild(li);
            saveTasks(); // Update Local Storage after removal
        };

        // Append the remove button to the list item
        li.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Clear input field if task was added from input
        if (!taskText || save) {
            taskInput.value = "";
        }

        // Save the updated list of tasks to Local Storage
        if (save) {
            saveTasks();
        }
    }

    // Event listener for Add Task button
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Allow pressing 'Enter' to add task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
