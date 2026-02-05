// Function to get projects from localStorage
function getProjects() {
    return JSON.parse(localStorage.getItem('projects')) || [];
}

// Function to get URL parameter
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Function to display project details
function displayProjectDetail() {
    const projectId = getUrlParameter('id');
    const projects = getProjects();

    if (projectId === '' || isNaN(projectId) || projectId < 0 || projectId >= projects.length) {
        document.getElementById('projectDetail').innerHTML = '<p class="text-center">Project not found.</p>';
        return;
    }

    const project = projects[parseInt(projectId)];
    const projectDetail = `
        <div class="text-center mb-4">
            <img src="${project.image}" alt="${project.name}" class="img-fluid rounded mb-3" style="max-height: 300px;">
        </div>
        <h2 class="text-center mb-4">${project.name}</h2>
        <p class="mb-3"><strong>Description:</strong> ${project.description}</p>
        <p class="mb-3"><strong>Technologies:</strong> ${project.technologies}</p>
        <div class="text-center">
            <a href="${project.link}" target="_blank" class="btn btn-primary">View Project</a>
        </div>
    `;

    document.getElementById('projectDetail').innerHTML = projectDetail;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    displayProjectDetail();
});
