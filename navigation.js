// Get all the navigation links
const navLinks = document.querySelectorAll('nav ul li a');

// Get the current URL
const currentPage = window.location.pathname.split('/').pop();

// Loop through each link and add the 'active' class to the matching page
navLinks.forEach(link => {
    if (link.href.includes(currentPage)) {
        link.classList.add('active');
    }
});
