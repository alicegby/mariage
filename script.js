const images = document.querySelectorAll('.hero-gallery img');
let current = 0;

// Afficher la première image
images[current].style.opacity = 1;

// Changer d'image toutes les 3 secondes
setInterval(() => {
    images[current].style.opacity = 0; // cacher l'image actuelle
    current = (current + 1) % images.length; // passer à la suivante
    images[current].style.opacity = 1; // afficher la suivante
}, 3000);