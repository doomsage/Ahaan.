const countdownIds = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};

function getNextBirthday() {
  const now = new Date();
  let year = now.getFullYear();
  let next = new Date(year, 9, 1, 0, 0, 0);

  if (now > next) {
    next = new Date(year + 1, 9, 1, 0, 0, 0);
  }

  return next;
}

function updateCountdown() {
  const now = new Date();
  const target = getNextBirthday();
  const diff = target - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownIds.days.textContent = String(days).padStart(2, "0");
  countdownIds.hours.textContent = String(hours).padStart(2, "0");
  countdownIds.minutes.textContent = String(minutes).padStart(2, "0");
  countdownIds.seconds.textContent = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

const revealItems = document.querySelectorAll(".reveal");
const skillFills = document.querySelectorAll(".skill-fill");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute("data-width");
        entry.target.style.width = `${width}%`;
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
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
  if (event.key === "Escape" && modal.classList.contains("active")) {
    closeImageModal();
  }
});
