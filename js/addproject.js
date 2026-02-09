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

// Function to edit project
function editProject(index) {
    const projects = getProjects();
    const project = projects[index];

    // Populate edit form
    document.getElementById('editProjectIndex').value = index;
    document.getElementById('editProjectName').value = project.name;
    document.getElementById('editProjectDescription').value = project.description;
    document.getElementById('editProjectCategory').value = project.category;
    document.getElementById('editProjectDate').value = project.date;
    document.getElementById('editProjectStatus').value = project.status;
    document.getElementById('editProjectLink').value = project.link;
    document.getElementById('editProjectTags').value = project.tags;

    // Show edit modal
    const editModal = new bootstrap.Modal(document.getElementById('editProjectModal'));
    editModal.show();
}

// Function to delete project
function deleteProject(index) {
    if (confirm('Are you sure you want to delete this project?')) {
        const projects = getProjects();
        projects.splice(index, 1);
        saveProjects(projects);
        displayProjects();
        alert('Project deleted successfully!');
    }
}

// Function to handle edit form submission
function handleEditFormSubmit(event) {
    event.preventDefault();

    const index = document.getElementById('editProjectIndex').value;
    const projectName = document.getElementById('editProjectName').value.trim();
    const projectDescription = document.getElementById('editProjectDescription').value.trim();
    const projectImageFile = document.getElementById('editProjectImage').files[0];
    const projectCategory = document.getElementById('editProjectCategory').value;
    const projectDate = document.getElementById('editProjectDate').value;
    const projectStatus = document.getElementById('editProjectStatus').value;
    const projectLink = document.getElementById('editProjectLink').value.trim();
    const projectTags = document.getElementById('editProjectTags').value.trim();

    if (!projectName || !projectDescription || !projectCategory || !projectDate || !projectStatus || !projectLink) {
        alert('Please fill in all required fields.');
        return;
    }

    const projects = getProjects();
    const project = projects[index];

    if (projectImageFile) {
        // Convert new image file to data URL
        const reader = new FileReader();
        reader.onload = function(e) {
            project.image = e.target.result;
            updateProject();
        };
        reader.readAsDataURL(projectImageFile);
    } else {
        updateProject();
    }

    function updateProject() {
        project.name = projectName;
        project.description = projectDescription;
        project.category = projectCategory;
        project.date = projectDate;
        project.status = projectStatus;
        project.link = projectLink;
        project.tags = projectTags;

        saveProjects(projects);

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('editProjectModal'));
        modal.hide();

        // Refresh projects list
        displayProjects();

        alert('Project updated successfully!');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    displayProjects();

    const form = document.getElementById('addProjectForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    const editForm = document.getElementById('editProjectForm');
    if (editForm) {
        editForm.addEventListener('submit', handleEditFormSubmit);
    }

    // Add event listeners for search and filters
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');

    if (searchInput) {
        searchInput.addEventListener('input', displayProjects);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', displayProjects);
    }
    if (statusFilter) {
        statusFilter.addEventListener('change', displayProjects);
    }
});
