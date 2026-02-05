// Function to get tasks from localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Function to save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to handle form submission
function handleTaskFormSubmit(event) {
    event.preventDefault();

    const taskName = document.getElementById('taskName').value.trim();
    const clientName = document.getElementById('clientName').value.trim();
    const taskDescription = document.getElementById('taskDescription').value.trim();
    const taskPriority = document.getElementById('taskPriority').value;
    const taskDueDate = document.getElementById('taskDueDate').value;
    const taskStatus = document.getElementById('taskStatus').value;
    const clientEmail = document.getElementById('clientEmail').value.trim();

    if (!taskName || !clientName || !taskDescription || !taskPriority || !taskDueDate || !taskStatus || !clientEmail) {
        alert('Please fill in all required fields.');
        return;
    }

    const newTask = {
        name: taskName,
        clientName: clientName,
        description: taskDescription,
        priority: taskPriority,
        dueDate: taskDueDate,
        status: taskStatus,
        clientEmail: clientEmail,
        createdDate: new Date().toISOString()
    };

    const tasks = getTasks();
    tasks.push(newTask);
    saveTasks(tasks);

    // Clear form
    document.getElementById('addTaskForm').reset();

    alert('Task added successfully!');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addTaskForm');
    if (form) {
        form.addEventListener('submit', handleTaskFormSubmit);
    }
});
