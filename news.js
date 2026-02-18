document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".show-newsletter-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", async () => {
            const newsletterDiv = btn.previousElementSibling; // la div newsletter-content
            const file = btn.getAttribute("data-file");

            if (newsletterDiv.innerHTML.trim() === "On a hâte de vous voir !") {
                // charge le fichier HTML externe
                try {
                    const response = await fetch(file);
                    if (!response.ok) throw new Error("Impossible de charger la newsletter");
                    const html = await response.text();
                    newsletterDiv.innerHTML += html; // ajoute le contenu après "On a hâte de vous voir !"
                    newsletterDiv.style.display = "block";
                    btn.textContent = "Fermer la newsletter";
                } catch (error) {
                    console.error(error);
                    alert("Erreur lors du chargement de la newsletter.");
                }
            } else {
                // ferme la newsletter
                newsletterDiv.style.display = (newsletterDiv.style.display === "block") ? "none" : "block";
                btn.textContent = (newsletterDiv.style.display === "block") ? "Fermer la newsletter" : "Voir la newsletter";
            }
        });
    });
});

// Anciennes newsletters
const oldLinks = document.querySelectorAll(".load-old-newsletter");

oldLinks.forEach(link => {
    link.addEventListener("click", async (e) => {
        e.preventDefault(); // empêche l'ouverture du lien
        const file = link.getAttribute("data-file");

        // On récupère la div latest-newsletter pour y afficher le contenu
        const newsletterDiv = document.querySelector(".latest-newsletter .newsletter-content");

        // Optionnel : vide le contenu précédent avant de charger la nouvelle
        newsletterDiv.innerHTML = "<p>On a hâte de vous voir !</p>";

        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error("Impossible de charger la newsletter");
            const html = await response.text();
            newsletterDiv.innerHTML += html;
            newsletterDiv.style.display = "block";

            // change le bouton de la newsletter principale pour "Fermer"
            const btn = document.querySelector(".show-newsletter-btn");
            btn.textContent = "Fermer la newsletter";
        } catch (error) {
            console.error(error);
            alert("Erreur lors du chargement de la newsletter.");
        }
    });
});