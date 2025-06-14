// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
    
    // select necessary DOM element
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // function to add new list
    function addTask() {
        // get the task text from input and trim whitespace
        const taskText = taskInput.value.trim();

        // if imput is empty alert the user
        if (taskText === "") {
            alert('Please enter a task.')
            return
        }
        // Create a new list item(li) for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button

        const removeButton = document.createElement('button');
        removeButton.textContent = "remove";
        removeButton.className = 'remove-btn';

        // Add an event listenner to remove the task when the button is clicked
        removeButton.onclick = function () {
            taskList.removeChild(li);
        };

        // Append the rmeove button to the task list
        li.appendChild(removeButton);

        // clear the  input field
        taskInput.value = "";
    }

    // add click event listener to the add task button
    addButton.addEventListener('click', addTask);

    // Add keypress event listener to input field to allow 'Enter' key submission
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
})