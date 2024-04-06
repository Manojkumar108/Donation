// nav.js

document.addEventListener("DOMContentLoaded", function() {
    // Get the current URL
    var currentUrl = window.location.href;

    // Get all navigation links
    var navLinks = document.querySelectorAll(".nav-links a");

    // Loop through each navigation link
    navLinks.forEach(function(link) {
        // Check if the link href matches the current URL
        if (link.getAttribute("href") === currentUrl) {
            // Add the 'active' class to the link
            link.classList.add("active");
        }
    });
});
