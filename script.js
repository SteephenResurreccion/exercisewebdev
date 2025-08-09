// script.js
document.addEventListener("DOMContentLoaded", () => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // =========================
  // 1) HOME → PORTFOLIO TRANSITION
  // =========================
  const homeHero = document.querySelector(".home-hero");

  if (homeHero) {
    const cta = document.querySelector('[data-transition="to-portfolio"]');

    const runExitAndGo = (href) => {
      if (!href) return;
      if (prefersReduced) {
        window.location.href = href;
        return;
      }
      homeHero.classList.add("page-blur");
      setTimeout(() => (window.location.href = href), 600);
    };

    if (cta) {
      cta.addEventListener("click", (e) => {
        const href = cta.getAttribute("href");
        if (!href || href.startsWith("#") || cta.target === "_blank") return;
        e.preventDefault();
        runExitAndGo(href);
      });
    }

    // Intercept internal links on the home page only
    document.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || link.target === "_blank") return;
      link.addEventListener("click", (e) => {
        e.preventDefault();
        runExitAndGo(href);
      });
    });
  }

  // =========================
  // 2) PORTFOLIO: STAGGERED CARD ENTRANCE
  // =========================
  if (document.body.dataset.page === "portfolio") {
    const cards = Array.from(document.querySelectorAll(".project-card"));
    cards.forEach((card, i) => {
      setTimeout(() => card.classList.add("show"), prefersReduced ? 0 : 150 * i);
    });

    // Optional: tint section briefly when clicking a .project-title
    const section = document.getElementById("portfolio");
    if (section) {
      document.querySelectorAll(".project-title").forEach((titleEl) => {
        titleEl.style.cursor = "pointer";
        titleEl.addEventListener("click", () => {
          const tint = titleEl.getAttribute("data-color") || "#fff7ed";
          const prev = section.style.background;
          section.style.background = tint;
          if (!prefersReduced) {
            setTimeout(() => (section.style.background = prev || ""), 1200);
          }
        });
      });
    }
  }

  // =========================
  // 3) CONTACT FORM ALERT (if present)
  // =========================
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thanks! Your autumn message has been sent 🍂");
      form.reset();
    });
  }

  // =========================
  // 4) Footer year (if you use it anywhere)
  // =========================
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // =========================
  // 5) Image tile → modal
  // =========================
  document.querySelectorAll(".project-tile").forEach((tile) => {
    tile.addEventListener("click", (e) => {
      e.preventDefault();
      const title = tile.dataset.title || "";
      const desc = tile.dataset.desc || "";
      const img = tile.dataset.img || "";

      document.getElementById("modalTitle").textContent = title;
      document.getElementById("modalDesc").textContent = desc;

      const modalImg = document.getElementById("modalImg");
      modalImg.src = img;
      modalImg.alt = title;

      const modal = new bootstrap.Modal(document.getElementById("projectModal"));
      modal.show();
    });
  });

  // =========================
  // 6) "see" → random background color for portfolio
  //     (changes the gradient end color via a CSS variable)
  // =========================
  const seeTrigger = document.getElementById("seeTrigger");
  const portfolioBg = document.querySelector(".portfolio-full"); // the gradient section

  if (seeTrigger && portfolioBg) {
    const colors = [
      "#fde68a", "#bbf7d0", "#bfdbfe", "#fecaca", "#f5d0fe",
      "#fef3c7", "#d1fae5", "#c7d2fe", "#fee2e2", "#fbcfe8"
    ];

    seeTrigger.style.cursor = "pointer";
    seeTrigger.addEventListener("click", () => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      // set CSS variable (see CSS snippet below)
      portfolioBg.style.setProperty("--bg-end", randomColor);
    });
  }
});

// =========================
// 6) "see" OR modal title → random background color for portfolio
// =========================
const portfolioBg = document.querySelector(".portfolio-full");
const colors = [
  "#fde68a", "#bbf7d0", "#bfdbfe", "#fecaca", "#f5d0fe",
  "#fef3c7", "#d1fae5", "#c7d2fe", "#fee2e2", "#fbcfe8"
];

// Reusable function
function changePortfolioBg() {
  if (!portfolioBg) return;
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  portfolioBg.style.setProperty("--bg-end", randomColor);
}

const seeTrigger = document.getElementById("seeTrigger");
if (seeTrigger) {
  seeTrigger.style.cursor = "pointer";
  seeTrigger.addEventListener("click", changePortfolioBg);
}

// Add event after modal content is ready
const modalTitle = document.getElementById("modalTitle");
if (modalTitle) {
  modalTitle.style.cursor = "pointer";
  modalTitle.addEventListener("click", changePortfolioBg);
}
