const burger = document.querySelector('.burger-menu');
const overlay = document.querySelector('.overlay-menu');
const closeOverlay = document.querySelector('.close-overlay');

burger.addEventListener('click', () => {
    overlay.style.display = 'flex';
});

closeOverlay.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// Optionnel : fermer si on clique sur un lien
overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        overlay.style.display = 'none';
    });
});