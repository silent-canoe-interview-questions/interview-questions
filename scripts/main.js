// Function to load and display the navigation menu
async function loadNavigation() {
    try {
        // Scan the pages directory structure
        const topics = ['SQL', 'Python']; // This will be dynamic in the future with server-side implementation
        
        // Create the navigation menu
        const nav = document.createElement('nav');
        nav.className = 'main-nav';
        
        // Create topics list
        const topicsList = document.createElement('ul');
        topicsList.className = 'topics-list';
        
        for (const topic of topics) {
            const topicItem = document.createElement('li');
            const topicTitle = document.createElement('span');
            topicTitle.textContent = topic;
            topicTitle.className = 'topic-title';
            topicItem.appendChild(topicTitle);
            
            // Create submenu for topic pages
            const submenu = document.createElement('ul');
            submenu.className = 'topic-submenu';
            
            // Add introduction page
            const introItem = createMenuItem('Introduction', `pages/${topic}/introduction.html`);
            submenu.appendChild(introItem);
            
            // Add interview questions section
            const interviewSection = document.createElement('li');
            const interviewTitle = document.createElement('span');
            interviewTitle.textContent = 'Interview Questions';
            interviewTitle.className = 'subtopic-title';
            interviewSection.appendChild(interviewTitle);
            
            const interviewList = document.createElement('ul');
            interviewList.className = 'interview-submenu';
            
            const links = [
            { name: "SQL-Questions", file: "questions.html" },
            { name: "SQL-Questions-Answers", file: "questions-answers.html" }
            ];

            links.forEach(link => {
            const item = createMenuItem(
                link.name, 
                `pages/${topic}/interview-questions/${link.file}`
            );
            interviewList.appendChild(item);
            });

                        
            interviewSection.appendChild(interviewList);
            submenu.appendChild(interviewSection);
            
            topicItem.appendChild(submenu);
            topicsList.appendChild(topicItem);
        }
        
        nav.appendChild(topicsList);
        
        // Insert the navigation into the page
        const header = document.querySelector('header');
        if (header) {
            header.insertBefore(nav, header.firstChild);
        } else {
            document.body.insertBefore(nav, document.body.firstChild);
        }
        
    } catch (error) {
        console.error('Error loading navigation:', error);
    }
}

// Helper function to create menu items
function createMenuItem(text, href) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.textContent = text;
    link.href = '/' + href;
    item.appendChild(link);
    return item;
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', loadNavigation);

// Add active class to current nav item
document.addEventListener('DOMContentLoaded', () => {
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('a');
    menuItems.forEach(link => {
        if(link.href === currentLocation) {
            link.classList.add('active');
        }
    });
});