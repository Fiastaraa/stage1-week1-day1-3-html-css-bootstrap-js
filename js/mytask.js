// Function to get tasks from localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Function to save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to display tasks
function displayTasks() {
    const tasks = getTasks();
    const tasksList = document.getElementById('tasksList');
    const searchTerm = document.getElementById('taskSearchInput').value.toLowerCase();
    const priorityFilter = document.getElementById('priorityFilter').value;
    const statusFilter = document.getElementById('taskStatusFilter').value;

    tasksList.innerHTML = '';

    tasks.forEach((task, index) => {
        // Apply filters
        const matchesSearch = task.name.toLowerCase().includes(searchTerm) ||
                             task.description.toLowerCase().includes(searchTerm) ||
                             task.clientName.toLowerCase().includes(searchTerm);

        const matchesPriority = !priorityFilter || task.priority === priorityFilter;
        const matchesStatus = !statusFilter || task.status === statusFilter;

        if (!matchesSearch || !matchesPriority || !matchesStatus) {
            return;
        }

        const priorityClass = task.priority === 'High' ? 'danger' : task.priority === 'Medium' ? 'warning' : 'success';
        const statusClass = task.status === 'Completed' ? 'success' : task.status === 'In Progress' ? 'warning' : 'secondary';

        const taskCard = `
            <div class="col-md-6 mb-4">
                <div class="card h-100">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${task.name}</h5>
                        <div class="mb-2">
                            <span class="badge bg-primary me-1">${task.clientName}</span>
                            <span class="badge bg-${priorityClass} me-1">${task.priority} Priority</span>
                            <span class="badge bg-${statusClass}">${task.status}</span>
                        </div>
                        <p class="card-text flex-grow-1">${task.description.substring(0, 150)}...</p>
                        <div class="mt-2">
                            <small class="text-muted">Due: ${new Date(task.dueDate).toLocaleDateString()}</small><br>
                            <small class="text-muted">Email: ${task.clientEmail}</small>
                        </div>
                        <div class="mt-auto pt-2">
                            <button class="btn btn-outline-secondary btn-sm me-1" onclick="editTask(${index})">Edit</button>
                            <button class="btn btn-outline-danger btn-sm" onclick="deleteTask(${index})">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        tasksList.innerHTML += taskCard;
    });
}

// Function to edit task
function editTask(index) {
    const tasks = getTasks();
    const task = tasks[index];

    // Simple prompt-based editing for now
    const newStatus = prompt('Update status:', task.status);
    if (newStatus && ['Pending', 'In Progress', 'Completed'].includes(newStatus)) {
        tasks[index].status = newStatus;
        saveTasks(tasks);
        displayTasks();
        alert('Task updated successfully!');
    }
}

// Function to delete task
function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        const tasks = getTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
        displayTasks();
        alert('Task deleted successfully!');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    displayTasks();

    // Add search and filter event listeners
    const searchInput = document.getElementById('taskSearchInput');
    const priorityFilter = document.getElementById('priorityFilter');
    const statusFilter = document.getElementById('taskStatusFilter');

    if (searchInput) {
        searchInput.addEventListener('input', displayTasks);
    }
    if (priorityFilter) {
        priorityFilter.addEventListener('change', displayTasks);
    }
    if (statusFilter) {
        statusFilter.addEventListener('change', displayTasks);
    }
});
