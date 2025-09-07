document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;

    setTimeout(() => {
        body.style.opacity = '1';
    }, 30);

    const navLinks = document.querySelectorAll('nav a');
    const menuButton = document.querySelector('.principal-btn[href*="menu.html"]');

    function handlePageTransition(e, href) {
        if (href && (href.includes('.html') || href === '/index.html' || href === 'index.html')) {
            e.preventDefault();

            body.style.opacity = '0';

            setTimeout(() => {
                window.location.href = href;
            }, 80);
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            handlePageTransition(e, href);
        });
    });

    if (menuButton) {
        menuButton.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            handlePageTransition(e, href);
        });
    }
});