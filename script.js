// Header qui apparaît au hover
const header = document.querySelector('.header');
header.style.transition = 'opacity 0.3s ease';
header.style.opacity = '0';

document.addEventListener('mousemove', (e) => {
    header.style.opacity = e.clientY < 100 ? '1' : '0';
});

// Effet apparition pour les .animate-block
document.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('.animate-block');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    blocks.forEach(block => observer.observe(block));
});

// Effet apparition pour les .timeline-item
document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // pour ne pas réappliquer l'animation
            }
        });
    }, { threshold: 0.2 }); // 20% visible déclenche l'animation

    items.forEach(item => {
        observer.observe(item);
    });
});
