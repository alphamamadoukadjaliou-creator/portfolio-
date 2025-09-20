// =========================
// Remplissage des barres de compétences au scroll
// =========================
window.addEventListener("scroll", () => {
  const skills = document.querySelectorAll(".progress-bar");
  skills.forEach(skill => {
    const skillTop = skill.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (skillTop < windowHeight - 50) {
      skill.style.width = skill.dataset.skill + "%"; // Remplit la barre
    }
  });
});
//Récupére tous les liens de navigation
const navLinks = document.querySelectorAll(".nav-links li a");

//Boucle sur chaque liens 
navLinks.forEach(navLinks => {
    navLinks.addEventListener("click", function(){
        //Retire "active" de tous les liens
        navLinks.forEach(l => l.classlist.remove("active"));
        //Ajoute "active au lien cliqué"
        this.classList.add("active");
    });
});

// =========================
// Formulaire de contact simple
// =========================
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault(); // Empêche l'envoi normal
  alert("Message envoyé !");
});
// Gestion du formulaire avec confirmation
document.getElementById("formulaire-de-contact").addEventListener("submit", e => {
    e.preventDefault(); // Empêche l'envoi normal
    alert("Message envoyé !");
});

// Gestion du formulaire avec confirmation
const formulaire = document.querySelector(".formulaire-de-contact");
const statutTxt = document.getElementById("formulaire-statut");

formulaire.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Récupération des valeurs du formulaire
    const donneesFormulaire = {
        nom: formulaire.nom.value,
        email: formulaire.email.value,
        message: formulaire.message.value
    };

    try {
        const reponse = await fetch(formulaire.action, {
            method: formulaire.method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(donneesFormulaire) //  conversion en JSON
        });

        if (reponse.ok) {
            statutTxt.innerHTML = " Message envoyé avec succès !";
            formulaire.reset();
        } else {
            statutTxt.innerHTML = " Erreur lors de l'envoi.";
        }
    } catch (error) {
        statutTxt.innerHTML = " Problème de connexion.";
        console.error(error);
    }
});
