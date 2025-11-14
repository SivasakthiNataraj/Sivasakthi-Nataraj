/* ----------------------------------------------
   1. MOBILE NAVBAR TOGGLE
---------------------------------------------- */

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");

  // Animate hamburger icon
  hamburger.classList.toggle("active");
});


/* ----------------------------------------------
   2. SCROLL REVEAL (Fade + Slide)
---------------------------------------------- */

const revealElements = document.querySelectorAll(".reveal, .animate-up, .animate-down, .animate-left, .animate-right");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      entry.target.style.opacity = "1";
    }
  });
}, { threshold: 0.2 });

revealElements.forEach((el) => observer.observe(el));


/* ----------------------------------------------
   3. PORTFOLIO HORIZONTAL CAROUSEL
---------------------------------------------- */

const carousel = document.querySelector(".portfolio-carousel");

let isDown = false;
let startX;
let scrollLeft;

if (carousel) {
  carousel.addEventListener("mousedown", (e) => {
    isDown = true;
    carousel.classList.add("active");
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener("mouseleave", () => {
    isDown = false;
    carousel.classList.remove("active");
  });

  carousel.addEventListener("mouseup", () => {
    isDown = false;
    carousel.classList.remove("active");
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed
    carousel.scrollLeft = scrollLeft - walk;
  });
}


/* ----------------------------------------------
   4. SMOOTH SCROLL FOR NAV LINKS
---------------------------------------------- */

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });

    // Close mobile menu after click
    navLinks.classList.remove("show");
    hamburger.classList.remove("active");
  });
});


/* ----------------------------------------------
   5. XR TILT HOVER EFFECT (optional)
---------------------------------------------- */

const tiltCards = document.querySelectorAll(".tilt");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y - rect.height / 2) / 20;
    const rotateY = (rect.width / 2 - x) / 20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});
