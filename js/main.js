// ==========================================================
// Portfolio — Alpha Mamadou Kadjaliou Diallo
// ==========================================================

const header = document.getElementById("header");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const themeToggle = document.getElementById("theme-toggle");

// ---------- Année automatique dans le pied de page ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- En-tête : fond flouté après défilement ----------
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- Menu mobile ----------
const closeMenu = () => {
  navLinks.classList.remove("open");
  header.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Ouvrir le menu");
};

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  header.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
});

navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// ---------- Thème jour / nuit (jour par défaut, choix mémorisé) ----------
const updateThemeLabel = () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  themeToggle.setAttribute("aria-label", isDark ? "Activer le mode jour" : "Activer le mode nuit");
  themeToggle.title = isDark ? "Mode jour" : "Mode nuit";
};
updateThemeLabel();

themeToggle.addEventListener("click", () => {
  const root = document.documentElement;
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  updateThemeLabel();
  try {
    localStorage.setItem("theme", next);
  } catch (e) {
    // Stockage indisponible (navigation privée) : le thème ne sera pas mémorisé
  }
});

// ---------- Lien actif selon la section visible ----------
const links = [...navLinks.querySelectorAll("a")];
const sections = links
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) =>
        link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id)
      );
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((section) => sectionObserver.observe(section));

// ---------- Apparition des éléments + remplissage des barres ----------
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      entry.target.querySelectorAll(".bar-fill").forEach((bar) => {
        bar.style.width = bar.dataset.level + "%";
      });
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ---------- Formulaire de contact (envoi via Formspree) ----------
const form = document.getElementById("contact-form");
const statusText = document.getElementById("form-status");

const setStatus = (message, type) => {
  statusText.textContent = message;
  statusText.className = "form-status " + (type || "");
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Validation simple côté client
  let valid = true;
  form.querySelectorAll("input[required], textarea[required]").forEach((field) => {
    const ok = field.value.trim() !== "" && field.checkValidity();
    field.closest(".field").classList.toggle("invalid", !ok);
    if (!ok) valid = false;
  });

  if (!valid) {
    setStatus("Merci de remplir correctement tous les champs.", "error");
    return;
  }

  const button = form.querySelector("button[type=submit]");
  button.disabled = true;
  setStatus("Envoi en cours…");

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error("Réponse " + response.status);

    form.reset();
    setStatus("Merci ! Votre message a bien été envoyé.", "success");
  } catch (err) {
    setStatus("Une erreur est survenue. Réessayez ou écrivez-moi directement par email.", "error");
  } finally {
    button.disabled = false;
  }
});

form.querySelectorAll("input, textarea").forEach((field) =>
  field.addEventListener("input", () => field.closest(".field")?.classList.remove("invalid"))
);
