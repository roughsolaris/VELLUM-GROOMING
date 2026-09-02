/* =========================================
   VELLUM GROOMING
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     LUCIDE ICONS
  ========================================== */

  if (window.lucide) {
    lucide.createIcons();
  }


  /* =========================================
     ELEMENTS
  ========================================== */

  const header = document.getElementById("header");

  const menuToggle = document.getElementById("menuToggle");

  const mobileNav = document.getElementById("mobileNav");

  const searchBtn = document.getElementById("searchBtn");

  const searchOverlay = document.getElementById("searchOverlay");

  const searchClose = document.getElementById("searchClose");

  const searchInput = document.getElementById("searchInput");

  const backTop = document.getElementById("backTop");

  const bookingForm = document.getElementById("bookingForm");

  const toast = document.getElementById("toast");

  const toastMessage = document.getElementById("toastMessage");

  const year = document.getElementById("year");

  const playBtn = document.getElementById("playBtn");

  const cartBtn = document.getElementById("cartBtn");

  const cartCount = document.getElementById("cartCount");


  /* =========================================
     CURRENT YEAR
  ========================================== */

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =========================================
     HEADER SCROLL
  ========================================== */

  const handleScroll = () => {

    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    if (window.scrollY > 500) {
      backTop.classList.add("visible");
    } else {
      backTop.classList.remove("visible");
    }

  };

  window.addEventListener("scroll", handleScroll);

  handleScroll();


  /* =========================================
     MOBILE MENU
  ========================================== */

  menuToggle.addEventListener("click", () => {

    const isOpen = mobileNav.classList.toggle("open");

    menuToggle.classList.toggle("open", isOpen);

    document.body.classList.toggle("menu-open", isOpen);

  });


  /* Close mobile menu after clicking link */

  const mobileLinks = mobileNav.querySelectorAll("a");

  mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

      mobileNav.classList.remove("open");

      menuToggle.classList.remove("open");

      document.body.classList.remove("menu-open");

    });

  });


  /* =========================================
     SEARCH
  ========================================== */

  searchBtn.addEventListener("click", () => {

    searchOverlay.classList.add("open");

    document.body.classList.add("menu-open");

    setTimeout(() => {
      searchInput.focus();
    }, 300);

  });


  searchClose.addEventListener("click", closeSearch);


  searchOverlay.addEventListener("click", (event) => {

    if (event.target === searchOverlay) {
      closeSearch();
    }

  });


  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeSearch();
    }

  });


  function closeSearch() {

    searchOverlay.classList.remove("open");

    document.body.classList.remove("menu-open");

  }


  /* =========================================
     SEARCH INPUT
  ========================================== */

  searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

      const query = searchInput.value.trim();

      if (!query) return;

      showToast(`Searching Vellum for "${query}"...`);

      searchInput.value = "";

      setTimeout(() => {
        closeSearch();
      }, 700);

    }

  });


  /* =========================================
     ACTIVE NAVIGATION
  ========================================== */

  const sections = document.querySelectorAll("main section[id]");

  const navLinks = document.querySelectorAll(".desktop-nav .nav-link");


  const updateActiveNav = () => {

    let current = "";

    sections.forEach(section => {

      const sectionTop = section.offsetTop - 180;

      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }

    });


    navLinks.forEach(link => {

      link.classList.remove("active");

      const href = link.getAttribute("href");

      if (href === `#${current}`) {
        link.classList.add("active");
      }

    });

  };


  window.addEventListener("scroll", updateActiveNav);

  updateActiveNav();


  /* =========================================
     SMOOTH ANCHOR LINKS
  ========================================== */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#" ||
        targetId === "#journal"
      ) {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =========================================
     REVEAL ANIMATIONS
  ========================================== */

  const revealElements = document.querySelectorAll(
    ".category-item, .about-content, .about-gallery, .service-card, .journal-card, .shop-content, .shop-image, .contact-grid"
  );


  revealElements.forEach(element => {
    element.classList.add("reveal");
  });


  const revealObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* =========================================
     STAGGER SERVICES
  ========================================== */

  document.querySelectorAll(".service-card").forEach((card, index) => {

    card.style.transitionDelay = `${index * 80}ms`;

  });


  /* =========================================
     PLAY BUTTON
  ========================================== */

  if (playBtn) {

    playBtn.addEventListener("click", () => {

      showToast("Our story video is coming soon.");

    });

  }


  /* =========================================
     CART
  ========================================== */

  if (cartBtn) {

    cartBtn.addEventListener("click", () => {

      let count = Number(cartCount.textContent);

      count += 1;

      cartCount.textContent = count;

      showToast("Your grooming bag has been updated.");

    });

  }


  /* =========================================
     BOOKING FORM
  ========================================== */

  if (bookingForm) {

    bookingForm.addEventListener("submit", event => {

      event.preventDefault();

      const formData = new FormData(bookingForm);

      showToast("Appointment request received.");

      bookingForm.reset();

    });

  }


  /* =========================================
     TOAST
  ========================================== */

  let toastTimer;


  function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

      toast.classList.remove("show");

    }, 3200);

  }


  /* =========================================
     BACK TO TOP
  ========================================== */

  backTop.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });


  /* =========================================
     BUTTON MICRO INTERACTION
  ========================================== */

  document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("mouseenter", () => {

      button.style.transform = "translateY(-3px)";

    });

    button.addEventListener("mouseleave", () => {

      button.style.transform = "";

    });

  });


  /* =========================================
     IMAGE FALLBACK
  ========================================== */

  document.querySelectorAll("img").forEach(img => {

    img.addEventListener("error", () => {

      img.style.background = "#1a1a1a";

      img.style.minHeight = "100px";

    });

  });


  /* =========================================
     PARALLAX HERO
  ========================================== */

  const heroBackground = document.querySelector(".hero-background");

  window.addEventListener("scroll", () => {

    if (!heroBackground) return;

    if (window.scrollY < window.innerHeight) {

      heroBackground.style.transform =
        `translateY(${window.scrollY * 0.12}px) scale(1.02)`;

    }

  });


});