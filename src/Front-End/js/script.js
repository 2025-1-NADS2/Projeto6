// menu de hamburguer
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    menuToggle.innerHTML = mobileNav.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sticky header
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});