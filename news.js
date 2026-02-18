document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".show-newsletter-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", async () => {
            const newsletterDiv = btn.closest(".latest-newsletter").querySelector(".newsletter-content");
            let loadedDiv = newsletterDiv.querySelector(".loaded-newsletter");
            
            if (!loadedDiv) {
                // Crée un conteneur pour la newsletter externe
                loadedDiv = document.createElement("div");
                loadedDiv.classList.add("loaded-newsletter");
                newsletterDiv.appendChild(loadedDiv);

                const file = btn.getAttribute("data-file");
                try {
                    const response = await fetch(file);
                    if (!response.ok) throw new Error("Impossible de charger la newsletter");
                    const html = await response.text();
                    loadedDiv.innerHTML = html;

                    // Bouton Fermer tout en bas
                    const closeBtn = document.createElement("button");
                    closeBtn.textContent = "Fermer la newsletter";
                    closeBtn.classList.add("close-newsletter-btn");
                    closeBtn.style.cssText = `
                        display:block;
                        margin:20px auto 0 auto;
                        background-color:#A3A687;
                        color:#F0EFEA;
                        border:none;
                        padding:10px 20px;
                        border-radius:15px;
                        cursor:pointer;
                        font-size:1rem;
                    `;
                    loadedDiv.appendChild(closeBtn);

                    closeBtn.addEventListener("click", () => {
                        loadedDiv.style.display = "none";
                        btn.style.display = "inline-block";
                    });

                    btn.style.display = "none";
                } catch (error) {
                    console.error(error);
                    alert("Erreur lors du chargement de la newsletter.");
                }
            } else {
                // Toggle display si déjà chargé
                if (loadedDiv.style.display === "none" || loadedDiv.style.display === "") {
                    loadedDiv.style.display = "block";
                    btn.style.display = "none";
                } else {
                    loadedDiv.style.display = "none";
                    btn.style.display = "inline-block";
                }
            }
        });
    });

    // Anciennes newsletters
    const oldLinks = document.querySelectorAll(".load-old-newsletter");
    oldLinks.forEach(link => {
        link.addEventListener("click", async (e) => {
            e.preventDefault();
            const file = link.getAttribute("data-file");
            const newsletterDiv = document.querySelector(".latest-newsletter .newsletter-content");
            let loadedDiv = newsletterDiv.querySelector(".loaded-newsletter");

            if (!loadedDiv) {
                loadedDiv = document.createElement("div");
                loadedDiv.classList.add("loaded-newsletter");
                newsletterDiv.appendChild(loadedDiv);
            }

            try {
                const response = await fetch(file);
                if (!response.ok) throw new Error("Impossible de charger la newsletter");
                const html = await response.text();
                loadedDiv.innerHTML = html;

                // Bouton Fermer
                const closeBtn = document.createElement("button");
                closeBtn.textContent = "Fermer la newsletter";
                closeBtn.classList.add("close-newsletter-btn");
                closeBtn.style.cssText = `
                    display:block;
                    margin:20px auto 0 auto;
                    background-color:#A3A687;
                    color:#F0EFEA;
                    border:none;
                    padding:10px 20px;
                    border-radius:15px;
                    cursor:pointer;
                    font-size:1rem;
                `;
                loadedDiv.appendChild(closeBtn);

                closeBtn.addEventListener("click", () => {
                    loadedDiv.style.display = "none";
                    document.querySelector(".show-newsletter-btn").style.display = "inline-block";
                });

                loadedDiv.style.display = "block";
                document.querySelector(".show-newsletter-btn").style.display = "none";
            } catch (error) {
                console.error(error);
                alert("Erreur lors du chargement de la newsletter.");
            }
        });
    });
});