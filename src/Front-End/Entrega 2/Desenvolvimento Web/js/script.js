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

// carrossel
document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentIndex = 0;
    const intervalTime = 5000; // 5 segundos
    
    // Função para mudar slide
    function nextSlide() {
        items[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        
        currentIndex = (currentIndex + 1) % items.length;
        
        items[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }
    
    // Iniciar autoplay
    let carouselInterval = setInterval(nextSlide, intervalTime);
    
    // Pausar ao passar o mouse
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });
    
    // Retomar autoplay
    carousel.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(nextSlide, intervalTime);
    });
    
    // Navegação pelos dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const dotIndex = parseInt(this.getAttribute('data-index'));
            
            items[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');
            
            currentIndex = dotIndex;
            
            items[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
            
            // Reiniciar intervalo
            clearInterval(carouselInterval);
            carouselInterval = setInterval(nextSlide, intervalTime);
        });
    });
});

// Verificar se é mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar altura do carrossel em mobile
function adjustCarouselHeight() {
    const hero = document.querySelector('.hero');
    if (isMobile()) {
        hero.style.height = `${window.innerHeight * 0.7}px`;
    } else {
        hero.style.height = '';
    }
}

// Inicializar
window.addEventListener('load', adjustCarouselHeight);
window.addEventListener('resize', adjustCarouselHeight);