// Function to get projects from localStorage
function getProjects() {
    return JSON.parse(localStorage.getItem('projects')) || [];
}

// Function to display projects in portfolio
function displayPortfolioProjects() {
    const projects = getProjects();
    const portfolioGrid = document.getElementById('portfolioGrid');

    if (projects.length === 0) {
        // Show default projects if no custom projects
        portfolioGrid.innerHTML = `
            <article class="portfolio-card">
                <h3>IBM Academy Final Project</h3>
                <p>Individual final project involving AI, hybrid cloud, and cybersecurity concepts.</p>
                <a href="#" class="project-link">View Project</a>
            </article>
            <article class="portfolio-card">
                <h3>Mobile Application at Nongsa SEZ</h3>
                <p>Mobile application and cloud-based solution developed during internship.</p>
                <a href="#" class="project-link">View Project</a>
            </article>
            <article class="portfolio-card">
                <h3>Humanity First Indonesia Platform</h3>
                <p>Responsive UI/UX designs implemented using WordPress for the digital platform.</p>
                <a href="#" class="project-link">View Project</a>
            </article>
        `;
        return;
    }

    portfolioGrid.innerHTML = '';

    projects.forEach((project, index) => {
        const statusClass = project.status === 'Completed' ? 'success' : project.status === 'In Progress' ? 'warning' : 'secondary';
        const projectCard = `
            <article class="portfolio-card">
                <h3>${project.name}</h3>
                <p class="mb-2">${project.description.substring(0, 100)}...</p>
                <div class="mb-2">
                    <span class="badge bg-primary me-1">${project.category}</span>
                    <span class="badge bg-${statusClass}">${project.status}</span>
                </div>
                <a href="project-detail.html?id=${index}" class="project-link">View Project</a>
            </article>
        `;
        portfolioGrid.innerHTML += projectCard;
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    displayPortfolioProjects();
});
