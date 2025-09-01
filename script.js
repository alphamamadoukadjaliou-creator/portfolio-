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
const form = document.querySelector(".contact-form");
const statusTxt = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = {
    nom: form.nom.value,
    email: form.email.value,
    message: form.message.value
  };

  const response = await fetch(form.action, {
    method: form.method,
    body: JSON.stringify(formData),
    headers: { 
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });

  if (response.ok) {
    statusTxt.textContent = "✅ Message envoyé avec succès !";
    form.reset();
  } else {
    statusTxt.textContent = "❌ Une erreur est survenue, réessayez.";
  }
});