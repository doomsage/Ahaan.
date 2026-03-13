const countdownIds = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};

function getNextBirthday() {
  const now = new Date();
  const currentYear = now.getFullYear();
  let next = new Date(currentYear, 9, 1, 0, 0, 0); // October 1
  if (now > next) next = new Date(currentYear + 1, 9, 1, 0, 0, 0);
  return next;
}

function animateTick(element) {
  if (!element) return;
  const card = element.closest(".countdown-card");
  if (!card) return;
  card.classList.remove("tick");
  void card.offsetWidth;
  card.classList.add("tick");
}

function updateCountdown() {
  const now = new Date();
  const target = getNextBirthday();
  const diff = target - now;

  const timeValues = {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  };

  Object.entries(timeValues).forEach(([key, value]) => {
    const element = countdownIds[key];
    const nextText = String(value).padStart(2, "0");
    if (element.textContent !== nextText) {
      element.textContent = nextText;
      animateTick(element);
    }
  });
}

setInterval(updateCountdown, 1000);
updateCountdown();

const revealItems = document.querySelectorAll(".reveal");
const skillFills = document.querySelectorAll(".skill-fill");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = `${entry.target.getAttribute("data-width")}%`;
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.45 }
);

skillFills.forEach((fill) => skillObserver.observe(fill));

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");
const galleryImages = document.querySelectorAll(".gallery-card img");

galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeImageModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  modalImage.src = "";
}

closeModal.addEventListener("click", closeImageModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeImageModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("active")) closeImageModal();
});

function createParticles() {
  const container = document.getElementById("particles");
  if (!container) return;

  const particleCount = 34;
  for (let i = 0; i < particleCount; i += 1) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 7}s`;
    particle.style.animationDuration = `${4.5 + Math.random() * 4.5}s`;
    container.appendChild(particle);
  }
}

createParticles();

const soundToggle = document.getElementById("soundToggle");
if (soundToggle) {
  soundToggle.addEventListener("click", () => {
    soundToggle.classList.toggle("muted");
    soundToggle.textContent = soundToggle.classList.contains("muted") ? "🔇" : "🎵";
  });
}
