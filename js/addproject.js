// Function to get projects from localStorage
function getProjects() {
    return JSON.parse(localStorage.getItem('projects')) || [];
}

// Function to save projects to localStorage
function saveProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Function to display projects
function displayProjects() {
    const projects = getProjects();
    const projectsList = document.getElementById('projectsList');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;

    projectsList.innerHTML = '';

    projects.forEach((project, index) => {
        // Apply filters
        const matchesSearch = project.name.toLowerCase().includes(searchTerm) ||
                             project.description.toLowerCase().includes(searchTerm) ||
                             (project.tags && project.tags.toLowerCase().includes(searchTerm));

        const matchesCategory = !categoryFilter || project.category === categoryFilter;
        const matchesStatus = !statusFilter || project.status === statusFilter;

        if (!matchesSearch || !matchesCategory || !matchesStatus) {
            return;
        }

        const statusClass = project.status === 'Completed' ? 'success' : project.status === 'In Progress' ? 'warning' : 'secondary';

        const projectCard = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${project.image}" class="card-img-top" alt="${project.name}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${project.name}</h5>
                        <div class="mb-2">
                            <span class="badge bg-primary me-1">${project.category}</span>
                            <span class="badge bg-${statusClass}">${project.status}</span>
                        </div>
                        <p class="card-text flex-grow-1">${project.description.substring(0, 100)}...</p>
                        <div class="mt-auto">
                            <a href="project-detail.html?id=${index}" class="btn btn-primary btn-sm me-1">View Details</a>
                            <button class="btn btn-outline-secondary btn-sm me-1" onclick="editProject(${index})">Edit</button>
                            <button class="btn btn-outline-danger btn-sm" onclick="deleteProject(${index})">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        projectsList.innerHTML += projectCard;
    });
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    const projectName = document.getElementById('projectName').value.trim();
    const projectDescription = document.getElementById('projectDescription').value.trim();
    const projectImageFile = document.getElementById('projectImage').files[0];
    const projectCategory = document.getElementById('projectCategory').value;
    const projectDate = document.getElementById('projectDate').value;
    const projectStatus = document.getElementById('projectStatus').value;
    const projectLink = document.getElementById('projectLink').value.trim();
    const projectTags = document.getElementById('projectTags').value.trim();

    if (!projectName || !projectDescription || !projectImageFile || !projectCategory || !projectDate || !projectStatus || !projectLink) {
        alert('Please fill in all required fields and select an image.');
        return;
    }

    // Convert image file to data URL
    const reader = new FileReader();
    reader.onload = function(e) {
        const newProject = {
            name: projectName,
            description: projectDescription,
            image: e.target.result,
            category: projectCategory,
            date: projectDate,
            status: projectStatus,
            technologies: projectTechnologies,
            link: projectLink,
            tags: projectTags
        };

        const projects = getProjects();
        projects.push(newProject);
        saveProjects(projects);

        // Clear form
        document.getElementById('addProjectForm').reset();

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addProjectModal'));
        modal.hide();

        // Refresh projects list
        displayProjects();

        alert('Project added successfully!');
    };
    reader.readAsDataURL(projectImageFile);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    displayProjects();

    const form = document.getElementById('addProjectForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});
