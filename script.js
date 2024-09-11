document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const taskControls = document.querySelector('.task-controls');
    const markAllDoneButton = document.getElementById('markAllDoneButton');
    const taskList = document.getElementById('taskList');

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTask();
        }
    });

    function updateTaskControls() {
        const tasks = taskList.getElementsByTagName('li');
        if (tasks.length > 0) {
            taskControls.style.display = 'block';
            checkAllDoneButtonStatus();
        } else {
            taskControls.style.display = 'none';
        }
    }

    function checkAllDoneButtonStatus() {
        const tasks = taskList.getElementsByTagName('li');
        const allCompleted = Array.from(tasks).every(task => task.classList.contains('completed'));
        markAllDoneButton.disabled = allCompleted;
    }

    window.addTask = function () {
        const taskInput = document.getElementById('taskInput');
        const taskList = document.getElementById('taskList');

        if (taskInput.value.trim() === "") {
            alert("Proszę wpisać treść zadania.");
            return;
        }

        const li = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = taskInput.value;
        li.appendChild(taskText);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const completeButton = document.createElement('button');
        completeButton.textContent = "✔️";
        completeButton.className = "complete-button";
        completeButton.onclick = function () {
            li.classList.toggle('completed');
            checkAllDoneButtonStatus();
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "❌";
        deleteButton.className = "delete-button";
        deleteButton.onclick = function () {
            taskList.removeChild(li);
            updateTaskControls();
        };

        buttonContainer.appendChild(completeButton);
        buttonContainer.appendChild(deleteButton);

        li.appendChild(buttonContainer);
        taskList.appendChild(li);

        taskInput.value = "";
        updateTaskControls();
    };

    window.toggleHideCompleted = function () {
        const tasks = taskList.getElementsByTagName('li');
        Array.from(tasks).forEach(task => {
            if (task.classList.contains('completed')) {
                task.style.display = task.style.display === 'none' ? 'flex' : 'none';
            }
        });
    };

    window.markAllDone = function () {
        const tasks = taskList.getElementsByTagName('li');
        Array.from(tasks).forEach(task => {
            task.classList.add('completed');
        });
        checkAllDoneButtonStatus();
    };
});
