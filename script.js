// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form submit alert
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thanks! Your message has been submitted.");
  this.reset();
});

// Clicking a project title changes the portfolio section background
const portfolio = document.getElementById("portfolio");
document.querySelectorAll(".project-title").forEach((title) => {
  title.style.cursor = "pointer";
  title.addEventListener("click", () => {
    const color = title.getAttribute("data-color") || "#f8f9fa";
    portfolio.style.backgroundColor = color;
  });
});
