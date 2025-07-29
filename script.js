// Portfolio Website JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initScrollAnimations();
  initSkillBars();
  initParticles();
  initTypingEffect();
  initSmoothScrolling();

  // Initialize Project Swiper
  const projectSwiper = new Swiper(".project-swiper", {
    // Konfigurasi utama
    loop: true,
    spaceBetween: 30,

    // Atur slidesPerView di level dasar untuk mobile-first
    slidesPerView: 1,

    // Hapus centeredSlides dari konfigurasi dasar untuk tampilan awal yang benar
    // centeredSlides: true, // Dihapus dari sini

    watchSlidesProgress: true,

    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 640px
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      // Tampilkan 3 slide di layar besar
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },

    // Pagination
    pagination: {
      el: ".project-swiper-pagination",
      clickable: true,
      dynamicBullets: true, // Membuat pagination lebih rapi
    },

    // Navigation arrows
    navigation: {
      nextEl: ".project-swiper-button-next",
      prevEl: ".project-swiper-button-prev",
    },

    on: {
      init: function () {
        this.el.style.overflow = "visible";
      },
    },
  });
});

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    root: null, // default viewport
    rootMargin: "0px 0px -100px 0px", // Memicu sedikit lebih awal
    threshold: 0.1, // Memicu bahkan jika hanya 10% elemen terlihat
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let targetElement = entry.target;

        // Logika khusus untuk timeline
        if (targetElement.classList.contains("timeline-item")) {
          const card = targetElement.querySelector(".timeline-card");
          if (card) {
            card.classList.add("animate");
          }
        } else {
          // Logika untuk semua elemen lainnya
          targetElement.classList.add("animate");
        }

        // Trigger skill bars animation
        if (targetElement.classList.contains("skill-category")) {
          animateSkillBars(targetElement);
        }

        // Hentikan pengamatan setelah animasi berjalan
        observer.unobserve(targetElement);
      }
    });
  }, observerOptions);

  // Pastikan selector ini benar dan menyertakan .timeline-item
  const animatedElements = document.querySelectorAll(
    ".section-title, .about-text, .about-image, .skill-category, .project-card, .timeline-item, .contact-info"
  );

  animatedElements.forEach((el) => {
    observer.observe(el);
  });
}

// Skill bars animation
function initSkillBars() {
  // This will be triggered by scroll animation
}

function animateSkillBars(container) {
  const skillBars = container.querySelectorAll(".skill-progress");
  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    setTimeout(() => {
      bar.style.width = width + "%";
    }, 300);
  });
}

// Floating particles
function initParticles() {
  const particlesContainer = document.querySelector(".floating-particles");
  const particleCount = 100; // Increased particle count

  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement("div");
  particle.className = "particle";

  // Random position
  const x = Math.random() * 100;
  const y = Math.random() * 100;

  // Random size
  const size = Math.random() * 6 + 2;

  // Random animation duration and delay
  const duration = Math.random() * 15 + 10;
  const delay = Math.random() * 5;

  // Random movement direction
  const moveX = (Math.random() - 0.5) * 200;
  const moveY = (Math.random() - 0.5) * 200;

  particle.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(45deg, #8b5cf6, #06b6d4);
        border-radius: 50%;
        opacity: 0.7;
        animation: floatContinuous ${duration}s ease-in-out infinite;
        animation-delay: ${delay}s;
        transform: translateZ(0);
        will-change: transform;
    `;

  container.appendChild(particle);

  // Continuous movement animation
  animateParticle(particle, moveX, moveY, duration * 1000);
}

function animateParticle(particle, moveX, moveY, duration) {
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = (elapsed % duration) / duration;

    // Create smooth, continuous movement
    const x = Math.sin(progress * Math.PI * 2) * moveX;
    const y = Math.cos(progress * Math.PI * 2) * moveY;
    const rotate = progress * 360;

    particle.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg) translateZ(0)`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// Enhanced typing effect with better timing and visual quality
function initTypingEffect() {
  const typingElement = document.querySelector(".typing-animation");
  if (!typingElement) return;

  const fullText = typingElement.textContent.trim();

  typingElement.textContent = "";
  typingElement.classList.add("typing");

  // Create a more natural typing rhythm
  const typingSpeed = 80; // Base speed in ms
  const punctuationDelay = 200; // Extra delay for punctuation
  const spaceDelay = 50; // Delay for spaces

  let charIndex = 0;

  function typeCharacter() {
    if (charIndex < fullText.length) {
      const currentChar = fullText.charAt(charIndex);
      typingElement.textContent += currentChar;
      charIndex++;

      // Variable delay based on character type
      let delay = typingSpeed;

      if (
        currentChar === "." ||
        currentChar === "," ||
        currentChar === "!" ||
        currentChar === "?"
      ) {
        delay += punctuationDelay;
      } else if (currentChar === " ") {
        delay += spaceDelay;
      } else {
        // Add slight randomness for more natural feel
        delay += Math.random() * 40 - 20;
      }

      setTimeout(typeCharacter, Math.max(delay, 30)); // Minimum 30ms delay
    } else {
      // Typing finished
      typingElement.classList.remove("typing");
      typingElement.classList.add("finished");

      // Start blinking cursor
      startCursorBlink();
    }
  }

  function startCursorBlink() {
    // The cursor blinking is handled by CSS animation
    // We can add additional effects here if needed

    // Optional: Remove cursor after some time
    setTimeout(() => {
      typingElement.style.borderRight = "none";
    }, 5000);
  }

  // Start typing immediately (no delay)
  setTimeout(typeCharacter, 100);
}

// Smooth scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

function showNotification(message, type) {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
    type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
  }`;
  notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${
              type === "success" ? "fa-check-circle" : "fa-exclamation-circle"
            } mr-2"></i>
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.classList.remove("translate-x-full");
  }, 100);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.classList.add("translate-x-full");
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 300);
  }, 5000);
}

function downloadCV() {
  const cvPath = "assets/CV-Ragil_Hidayatulloh.pdf";
  const link = document.createElement("a");
  link.href = cvPath;
  link.setAttribute("download", "CV - Ragil Hidayatulloh.pdf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// CTA Button interactions
document.addEventListener("click", (e) => {
  if (e.target.closest(".cta-button")) {
    const btn = e.target.closest(".cta-button");
    const text = btn.querySelector("span").textContent;

    if (text.includes("View My Work")) {
      document
        .querySelector("#projects")
        .scrollIntoView({ behavior: "smooth" });
    } else if (text.includes("Download CV")) {
      showNotification("CV download would start now!", "success");
      downloadCV();
    }
  }
});

// Remove or modify the parallax effect to not interfere with particles
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;

  // Keep particles moving independently of scroll
  const particles = document.querySelectorAll(".particle");
  particles.forEach((particle, index) => {
    // Add subtle scroll-based movement variation
    const speed = 0.1 + (index % 3) * 0.05;
    const currentTransform = particle.style.transform || "";

    if (!currentTransform.includes("translateY")) {
      particle.style.transform += ` translateY(${scrolled * speed}px)`;
    }
  });
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
  // Scroll-based animations can be added here
}, 16);

window.addEventListener("scroll", throttledScrollHandler);

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Stagger animation for elements
  const elements = document.querySelectorAll(".loading");
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("loaded");
    }, index * 100);
  });
});
