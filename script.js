// navbar section

let lastScroll = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  let currentScroll = window.pageYOffset;

  if (currentScroll < lastScroll) {
    // Scrolling Up → Expand Navbar
    navbar.classList.add("expanded");
  } else {
    // Scrolling Down → Normal Navbar
    navbar.classList.remove("expanded");
  }

  lastScroll = currentScroll;
});

// hero section
class PropertySlider {
  constructor() {
    this.currentSlide = 1;
    this.totalSlides = 2;
    this.autoSlideInterval = null;
    this.autoSlideDelay = 8000; // 8 seconds

    this.init();
  }

  init() {
    this.bindEvents();
    this.startAutoSlide();
    this.setupFormHandlers();
  }

  bindEvents() {
    // Arrow navigation
    document.getElementById("nextSlide").addEventListener("click", () => {
      this.nextSlide();
    });

    document.getElementById("prevSlide").addEventListener("click", () => {
      this.prevSlide();
    });

    // Indicator navigation
    const indicators = document.querySelectorAll(".indicator");
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        this.goToSlide(index + 1);
      });
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.prevSlide();
      } else if (e.key === "ArrowRight") {
        this.nextSlide();
      }
    });

    // Pause auto-slide on hover
    const sliderContainer = document.querySelector(".slider-container");
    sliderContainer.addEventListener("mouseenter", () => {
      this.stopAutoSlide();
    });

    sliderContainer.addEventListener("mouseleave", () => {
      this.startAutoSlide();
    });

    // Touch/swipe support for mobile
    this.setupTouchEvents();
  }

  setupTouchEvents() {
    let startX = 0;
    let endX = 0;
    const slider = document.querySelector(".slider-container");

    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe();
    });

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = startX - endX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swiped left - next slide
          this.nextSlide();
        } else {
          // Swiped right - previous slide
          this.prevSlide();
        }
      }
    };

    this.handleSwipe = handleSwipe;
  }

  nextSlide() {
    const nextSlideNum =
      this.currentSlide >= this.totalSlides ? 1 : this.currentSlide + 1;
    this.goToSlide(nextSlideNum);
  }

  prevSlide() {
    const prevSlideNum =
      this.currentSlide <= 1 ? this.totalSlides : this.currentSlide - 1;
    this.goToSlide(prevSlideNum);
  }

  goToSlide(slideNumber) {
    if (slideNumber === this.currentSlide) return;

    // Remove active class from current slide and indicator
    document
      .querySelector(`.slide[data-slide="${this.currentSlide}"]`)
      .classList.remove("active");
    document
      .querySelector(`.indicator[data-slide="${this.currentSlide}"]`)
      .classList.remove("active");

    // Add active class to new slide and indicator
    document
      .querySelector(`.slide[data-slide="${slideNumber}"]`)
      .classList.add("active");
    document
      .querySelector(`.indicator[data-slide="${slideNumber}"]`)
      .classList.add("active");

    this.currentSlide = slideNumber;
    this.restartAutoSlide();
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoSlideDelay);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  restartAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  setupFormHandlers() {
    // Form 1 - Consultation Form Handler
    const form1 = document.getElementById("consultationForm1");
    form1.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleConsultationFormSubmit(form1, "consultation");
    });

    // Form 2 - Pricing Form Handler
    const form2 = document.getElementById("consultationForm2");
    form2.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handlePricingFormSubmit(form2, "pricing");
    });
  }

  handleConsultationFormSubmit(form, formType) {
    const formData = new FormData(form);
    const data = {
      name: form.querySelector('input[type="text"]').value,
      email: form.querySelector('input[type="email"]').value,
      phone: form.querySelector('input[type="tel"]').value,
      countryCode: form.querySelector(".country-code").value,
      whatsappConsent: form.querySelector('input[type="checkbox"]').checked,
      interest: form.querySelector("select").value,
      formType: formType,
      timestamp: new Date().toISOString(),
    };

    // Show success message
    this.showFormSuccess(form, "Thank you! We'll contact you within 24 hours.");

    // Here you can add your email functionality in the future
    console.log("Consultation Form Data:", data);

    // Reset form after 3 seconds
    setTimeout(() => {
      form.reset();
      form.querySelector('input[type="checkbox"]').checked = true;
    }, 3000);
  }

  handlePricingFormSubmit(form, formType) {
    const data = {
      name: form.querySelector('input[type="text"]').value,
      email: form.querySelector('input[type="email"]').value,
      phone: form.querySelector('input[type="tel"]').value,
      countryCode: form.querySelector(".country-code").value,
      smsConsent: form.querySelector('input[type="checkbox"]').checked,
      propertyType: form.querySelector("select").value,
      formType: formType,
      timestamp: new Date().toISOString(),
    };

    // Show success message
    this.showFormSuccess(form, "Pricing details sent to your email!");

    // Here you can add your email functionality in the future
    console.log("Pricing Form Data:", data);

    // Reset form after 3 seconds
    setTimeout(() => {
      form.reset();
      form.querySelector('input[type="checkbox"]').checked = true;
    }, 3000);
  }

  showFormSuccess(form, message) {
    const submitBtn = form.querySelector(".btn-form");
    const originalText = submitBtn.textContent;
    const originalColor = submitBtn.style.backgroundColor;

    submitBtn.textContent = message;
    submitBtn.style.backgroundColor = "#4ade80";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.backgroundColor = originalColor;
      submitBtn.disabled = false;
    }, 3000);
  }
}

// Initialize the slider when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PropertySlider();
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// master plan script

function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside the image
window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
    document.body.style.overflow = "auto";
  }
};

// Close modal with escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      modal.style.display = "none";
    });
    document.body.style.overflow = "auto";
  }
});

// Floor plan data
const floorPlansData = {
  north: {
    slides: [
      [
        {
          image: "./A_North_facing_3200.webp",
          title: "North Facing - 3200 SQFT",
        },
        {
          image: "./A_North_facing_3700.webp",
          title: "North Facing - 3200 SQFT",
        },
        {
          image: "./A_North_facing_3200.webp",
          title: "North Facing - 3200 SQFT",
        },
      ],
      [
        {
          image: "./A_North_facing_3700.webp",
          title: "North Facing - 3700 SQFT",
        },
        {
          image:
            "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=400&h=300&fit=crop",
          title: "North Facing - 3700 SQFT",
        },
        {
          image:
            "https://images.unsplash.com/photo-1560185127-d1e2dcf5e0e2?w=400&h=300&fit=crop",
          title: "North Facing - 3700 SQFT",
        },
      ],
    ],
    tableData: [
      {
        type: "3-BHK",
        sba: "3200 Sqft",
        price: "₹2.8 Cr*",
        availability: "Limited",
      },
      {
        type: "4-BHK",
        sba: "3700 Sqft",
        price: "₹3.4 Cr*",
        availability: "Limited",
      },
    ],
  },
  east: {
    slides: [
      [
        {
          image: "./A_North_facing_3200.webp",
          title: "East Facing - 3200 SQFT",
        },
        {
          image: "./A_North_facing_3200.webp",
          title: "East Facing - 3200 SQFT",
        },
        {
          image: "./A_North_facing_3200.webp",
          title: "East Facing - 3200 SQFT",
        },
      ],
      [
        {
          image: "./A_North_facing_3200.webp",
          title: "East Facing - 3700 SQFT",
        },
        {
          image: "./A_North_facing_3200.webp",
          title: "East Facing - 3700 SQFT",
        },
        {
          image: "./A_North_facing_3200.webp",
          title: "East Facing - 3700 SQFT",
        },
      ],
    ],
    tableData: [
      {
        type: "3-BHK",
        sba: "3200 Sqft",
        price: "₹3.0 Cr*",
        availability: "Available",
      },
      {
        type: "4-BHK",
        sba: "3700 Sqft",
        price: "₹3.6 Cr*",
        availability: "Available",
      },
      {
        type: "5-BHK",
        sba: "4200 Sqft",
        price: "₹4.2 Cr*",
        availability: "Limited",
      },
    ],
  },
};

let floorPlanCurrentFacing = "north";
let floorPlanCurrentSlide = 0;

function initializeFloorPlanSlider() {
  renderFloorPlanSlider();
  renderFloorPlanTable();
  updateFloorPlanIndicators();
}

function renderFloorPlanSlider() {
  const slider = document.getElementById("floorPlanSlider");
  const slides = floorPlansData[floorPlanCurrentFacing].slides;

  slider.innerHTML = slides
    .map(
      (slide) =>
        `<div class="floor-plan-slide">
                    ${slide
                      .map(
                        (plan) =>
                          `<div class="floor-plan-card">
                            <img src="${plan.image}" alt="${plan.title}" class="floor-plan-image">
                            <div class="floor-plan-info">
                                <h3 class="floor-plan-title">${plan.title}</h3>
                            </div>
                        </div>`
                      )
                      .join("")}
                </div>`
    )
    .join("");

  updateFloorPlanSliderPosition();
}

function renderFloorPlanTable() {
  const tableContent = document.getElementById("tableContent");
  const tableData = floorPlansData[floorPlanCurrentFacing].tableData;

  tableContent.innerHTML = tableData
    .map(
      (row) =>
        `<div class="table-row">
                    <div class="table-cell">${row.type}</div>
                    <div class="table-cell">${row.sba}</div>
                    <div class="table-cell">${row.price}</div>
                    <div class="table-cell">${row.availability}</div>
                </div>`
    )
    .join("");
}

function updateFloorPlanIndicators() {
  const indicatorsContainer = document.getElementById("floorPlanIndicators");
  const totalSlides = floorPlansData[floorPlanCurrentFacing].slides.length;

  indicatorsContainer.innerHTML = Array.from(
    { length: totalSlides },
    (_, i) =>
      `<div class="floor-plan-indicator ${
        i === floorPlanCurrentSlide ? "active" : ""
      }" onclick="goToFloorPlanSlide(${i})"></div>`
  ).join("");
}

function updateFloorPlanSliderPosition() {
  const slider = document.getElementById("floorPlanSlider");
  slider.style.transform = `translateX(-${floorPlanCurrentSlide * 100}%)`;
}

function floorPlanPreviousSlide() {
  const totalSlides = floorPlansData[floorPlanCurrentFacing].slides.length;
  floorPlanCurrentSlide =
    floorPlanCurrentSlide === 0 ? totalSlides - 1 : floorPlanCurrentSlide - 1;
  updateFloorPlanSliderPosition();
  updateFloorPlanIndicators();
}

function floorPlanNextSlide() {
  const totalSlides = floorPlansData[floorPlanCurrentFacing].slides.length;
  floorPlanCurrentSlide =
    floorPlanCurrentSlide === totalSlides - 1 ? 0 : floorPlanCurrentSlide + 1;
  updateFloorPlanSliderPosition();
  updateFloorPlanIndicators();
}

function goToFloorPlanSlide(index) {
  floorPlanCurrentSlide = index;
  updateFloorPlanSliderPosition();
  updateFloorPlanIndicators();
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  initializeFloorPlanSlider();

  // Facing button listeners
  document.querySelectorAll(".facing-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      document
        .querySelectorAll(".facing-btn")
        .forEach((b) => b.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Update current facing
      floorPlanCurrentFacing = this.dataset.facing;
      floorPlanCurrentSlide = 0;

      // Re-render slider and table
      initializeFloorPlanSlider();
    });
  });
});

// Auto-slide functionality (optional) - Removed to avoid conflicts
// setInterval(() => {
//     floorPlanNextSlide();
// }, 5000);

// Touch/swipe support for mobile
let floorPlanStartX = 0;
let floorPlanCurrentX = 0;
let floorPlanIsDragging = false;

document
  .getElementById("floorPlanSlider")
  .addEventListener("touchstart", (e) => {
    floorPlanStartX = e.touches[0].clientX;
    floorPlanIsDragging = true;
  });

document
  .getElementById("floorPlanSlider")
  .addEventListener("touchmove", (e) => {
    if (!floorPlanIsDragging) return;
    floorPlanCurrentX = e.touches[0].clientX;
  });

document.getElementById("floorPlanSlider").addEventListener("touchend", () => {
  if (!floorPlanIsDragging) return;
  floorPlanIsDragging = false;

  const diff = floorPlanStartX - floorPlanCurrentX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      floorPlanNextSlide();
    } else {
      floorPlanPreviousSlide();
    }
  }
});

// galary section

// Interior showcase data
const galleryInteriorData = {
  north: [
    {
      image: '././A_North_facing_3200.webp"',
      title: "Living Room",
      description:
        "Spacious and modern living area with natural lighting and contemporary furnishing.",
    },
    {
      image: './A_North_facing_3200.webp"',
      title: "Dining Room",
      description:
        "Elegant dining space perfect for family gatherings and entertaining guests.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1556909019-f2c240d81b8f?w=1200&h=800&fit=crop",
      title: "Master Bedroom",
      description:
        "Luxurious master suite with panoramic views and premium finishes.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1556909045-f23703c5767b?w=1200&h=800&fit=crop",
      title: "Modern Kitchen",
      description:
        "State-of-the-art kitchen with high-end appliances and sleek design.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1556909116-6e0a3920b1f2?w=1200&h=800&fit=crop",
      title: "Study Room",
      description:
        "Quiet and inspiring workspace with built-in storage and natural light.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1556909092-4ac1bb41e5c6?w=1200&h=800&fit=crop",
      title: "Bathroom",
      description:
        "Spa-like bathroom with premium fixtures and modern amenities.",
    },
  ],
  east: [
    {
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop",
      title: "Grand Living Area",
      description:
        "Expansive living space with floor-to-ceiling windows and premium materials.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1556909045-f23703c5767b?w=1200&h=800&fit=crop",
      title: "Gourmet Kitchen",
      description:
        "Professional-grade kitchen with island seating and top-tier appliances.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1556909019-f2c240d81b8f?w=1200&h=800&fit=crop",
      title: "Luxury Bedroom",
      description:
        "Serene bedroom retreat with walk-in closet and private balcony access.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop",
      title: "Entertainment Lounge",
      description:
        "Stylish entertainment area perfect for relaxation and social gatherings.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1556909116-6e0a3920b1f2?w=1200&h=800&fit=crop",
      title: "Home Office",
      description:
        "Professional workspace with panoramic city views and modern technology.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1556909092-4ac1bb41e5c6?w=1200&h=800&fit=crop",
      title: "Master Bath",
      description:
        "Resort-style bathroom with soaking tub and rain shower experience.",
    },
  ],
};

let galleryCurrentFace = "north";
let galleryCurrentSlideIndex = 0;
let galleryIsTransitioning = false;

function initializeGalleryCarousel() {
  renderGallerySlides();
  renderGalleryPagination();
  updateGalleryProgressBar();
}

function renderGallerySlides() {
  const track = document.getElementById("galleryCarouselTrack");
  const slides = galleryInteriorData[galleryCurrentFace];

  track.innerHTML = slides
    .map(
      (slide) =>
        `<div class="gallery-carousel-slide">
                    <img src="${slide.image}" alt="${slide.title}" class="gallery-slide-image">
                    <div class="gallery-slide-overlay"></div>
                    <div class="gallery-slide-content">
                        <h2 class="gallery-slide-title">${slide.title}</h2>
                        <p class="gallery-slide-description">${slide.description}</p>
                    </div>
                </div>`
    )
    .join("");

  updateGalleryCarouselPosition();
}

function renderGalleryPagination() {
  const pagination = document.getElementById("galleryCarouselPagination");
  const slides = galleryInteriorData[galleryCurrentFace];

  pagination.innerHTML = slides
    .map(
      (_, index) =>
        `<div class="gallery-pagination-dot ${
          index === galleryCurrentSlideIndex ? "gallery-active" : ""
        }" onclick="goToGallerySlide(${index})"></div>`
    )
    .join("");
}

function updateGalleryCarouselPosition() {
  const track = document.getElementById("galleryCarouselTrack");
  track.style.transform = `translateX(-${galleryCurrentSlideIndex * 100}%)`;
}

function updateGalleryProgressBar() {
  const progressBar = document.getElementById("galleryProgressBar");
  const slides = galleryInteriorData[galleryCurrentFace];
  const progress = ((galleryCurrentSlideIndex + 1) / slides.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function updateGalleryPagination() {
  const dots = document.querySelectorAll(".gallery-pagination-dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("gallery-active", index === galleryCurrentSlideIndex);
  });
}

function galleryPreviousSlide() {
  if (galleryIsTransitioning) return;
  galleryIsTransitioning = true;

  const slides = galleryInteriorData[galleryCurrentFace];
  galleryCurrentSlideIndex =
    galleryCurrentSlideIndex === 0
      ? slides.length - 1
      : galleryCurrentSlideIndex - 1;

  updateGalleryCarouselPosition();
  updateGalleryPagination();
  updateGalleryProgressBar();

  setTimeout(() => {
    galleryIsTransitioning = false;
  }, 800);
}

function galleryNextSlide() {
  if (galleryIsTransitioning) return;
  galleryIsTransitioning = true;

  const slides = galleryInteriorData[galleryCurrentFace];
  galleryCurrentSlideIndex =
    galleryCurrentSlideIndex === slides.length - 1
      ? 0
      : galleryCurrentSlideIndex + 1;

  updateGalleryCarouselPosition();
  updateGalleryPagination();
  updateGalleryProgressBar();

  setTimeout(() => {
    galleryIsTransitioning = false;
  }, 800);
}

function goToGallerySlide(index) {
  if (galleryIsTransitioning || index === galleryCurrentSlideIndex) return;
  galleryIsTransitioning = true;

  galleryCurrentSlideIndex = index;
  updateGalleryCarouselPosition();
  updateGalleryPagination();
  updateGalleryProgressBar();

  setTimeout(() => {
    galleryIsTransitioning = false;
  }, 800);
}

// Face toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  initializeGalleryCarousel();

  document.querySelectorAll(".gallery-face-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      if (this.classList.contains("gallery-active") || galleryIsTransitioning)
        return;

      // Remove active class from all buttons
      document
        .querySelectorAll(".gallery-face-btn")
        .forEach((b) => b.classList.remove("gallery-active"));

      // Add active class to clicked button
      this.classList.add("gallery-active");

      // Update current face
      galleryCurrentFace = this.dataset.galleryFace;
      galleryCurrentSlideIndex = 0;

      // Re-render carousel
      initializeGalleryCarousel();
    });
  });
});

// Keyboard navigation for gallery
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft" && e.ctrlKey) {
    galleryPreviousSlide();
  } else if (e.key === "ArrowRight" && e.ctrlKey) {
    galleryNextSlide();
  }
});

// Touch/swipe support for gallery
let galleryTouchStartX = 0;
let galleryTouchEndX = 0;

document
  .getElementById("galleryCarouselTrack")
  .addEventListener("touchstart", (e) => {
    galleryTouchStartX = e.changedTouches[0].screenX;
  });

document
  .getElementById("galleryCarouselTrack")
  .addEventListener("touchend", (e) => {
    galleryTouchEndX = e.changedTouches[0].screenX;
    handleGallerySwipe();
  });

function handleGallerySwipe() {
  const swipeThreshold = 50;
  const diff = galleryTouchStartX - galleryTouchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      galleryNextSlide(); // Swipe left - next slide
    } else {
      galleryPreviousSlide(); // Swipe right - previous slide
    }
  }
}

// location advantags
function laToggleSection(header) {
  const currentSection = header.parentElement;
  const currentContent = currentSection.querySelector(".la-amenity-content");
  const currentIcon = header.querySelector(".la-dropdown-icon");

  // Close all other sections
  const allSections = document.querySelectorAll(".la-amenity-section");
  allSections.forEach((section) => {
    if (section !== currentSection) {
      section.querySelector(".la-amenity-header").classList.remove("la-active");
      section
        .querySelector(".la-amenity-content")
        .classList.remove("la-active");
      section.querySelector(".la-dropdown-icon").classList.remove("la-rotated");
    }
  });

  // Toggle current section
  if (currentContent.classList.contains("la-active")) {
    header.classList.remove("la-active");
    currentContent.classList.remove("la-active");
    currentIcon.classList.remove("la-rotated");
  } else {
    header.classList.add("la-active");
    currentContent.classList.add("la-active");
    currentIcon.classList.add("la-rotated");
  }
}

// booking section
function showProperty(event, type) {
  // Update button states
  const buttons = document.querySelectorAll(".booking-toggle-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  // Hide all property sections
  const sections = document.querySelectorAll(".booking-property-section");
  sections.forEach((section) => section.classList.remove("active"));

  // Show selected property section
  document.getElementById(type + "-section").classList.add("active");
}

function submitVillamentsForm(event) {
  event.preventDefault();
  const formData = {
    propertyType: "villaments",
    name: document.getElementById("villaments-name").value,
    email: document.getElementById("villaments-email").value,
    countryCode: document.getElementById("villaments-country-code").value,
    phone: document.getElementById("villaments-phone").value,
    date: document.getElementById("villaments-date").value,
    time: document.getElementById("villaments-time").value,
    location: "Bengaluru Central",
  };
  console.log("Villaments Form Data:", formData);
  showSuccessMessage("Villaments visit scheduled successfully!");
  document.getElementById("villamentsForm").reset();
  document.getElementById("villaments-date").value = "2025-09-26";
}

function submitVillasForm(event) {
  event.preventDefault();
  const formData = {
    propertyType: "villas",
    name: document.getElementById("villas-name").value,
    email: document.getElementById("villas-email").value,
    countryCode: document.getElementById("villas-country-code").value,
    phone: document.getElementById("villas-phone").value,
    date: document.getElementById("villas-date").value,
    time: document.getElementById("villas-time").value,
    location: "Whitefield Tech Park",
  };
  console.log("Villas Form Data:", formData);
  showSuccessMessage("Villas visit scheduled successfully!");
  document.getElementById("villasForm").reset();
  document.getElementById("villas-date").value = "2025-09-26";
}

function showSuccessMessage(message) {
  const popup = document.getElementById("successPopup");
  const popupMessage = document.getElementById("popupMessage");
  popupMessage.innerHTML = "✓ " + message;
  popup.classList.add("show");
  setTimeout(() => {
    closePopup();
  }, 4000);
}

function closePopup() {
  const popup = document.getElementById("successPopup");
  popup.classList.remove("show");
}

// Set minimum date to today for both forms
const today = new Date().toISOString().split("T")[0];
document.getElementById("villaments-date").setAttribute("min", today);
document.getElementById("villas-date").setAttribute("min", today);

// Property data
const propData = {
  villaments: {
    badge: "ECO LUXURY VILLAMENTS",
    title: "Seek the lifestyle that<br>inspires your life choices",
    description:
      "Close to nature as it is to our hearts. Eco luxury villaments with a breathtaking forest view opening to the Turahalli Forest, the sustainable designs are guided by visionary biophilic architecture.",
    features: [
      { label: "SPANNING", icon: "⚠️", value: "4.5 Acres" },
      { label: "ADORNING", icon: "🌟", value: "250+ TREES" },
      { label: "CENTRAL COURTYARD", icon: "✉️", value: "1 Acre" },
      { label: "SECURED", icon: "🏆", value: "GATED COMMUNITY" },
    ],
    details: {
      top: [
        { category: "EXCLUSIVE", icon: "✅", title: "108 Villaments" },
        { category: "3 & 4 BHK", icon: "✅", title: "Duplex & Triplex" },
        { category: "BUILTUP", icon: "✅", title: "3200 & 3700 Sqft" },
        { category: "TRADITIONAL", icon: "✅", title: "Mud Block Designs" },
      ],
      bottom: [
        { category: "FRONTYARD GARDEN", icon: "✅", title: "210 SQ. FT." },
        { category: "BACKYARD GARDEN", icon: "✅", title: "350 SQ. FT." },
        { category: "TERRACE GARDEN", icon: "✅", title: "700 SQ. FT." },
        { category: "COMMUNITY", icon: "✅", title: "Clubhouse" },
      ],
    },
  },
  villas: {
    badge: "PREMIUM LUXURY VILLAS",
    title: "Experience unparalleled<br>luxury and sophistication",
    description:
      "Discover the pinnacle of luxury living with our exclusive collection of premium villas. Featuring contemporary architecture, private amenities, and breathtaking views that redefine modern elegance.",
    features: [
      { label: "SPANNING", icon: "🏠", value: "2.8 Acres" },
      { label: "LANDSCAPING", icon: "🌳", value: "PREMIUM GARDENS" },
      { label: "PRIVATE POOLS", icon: "🏊", value: "EACH VILLA" },
      { label: "EXCLUSIVITY", icon: "👑", value: "LIMITED EDITION" },
    ],
    details: {
      top: [
        { category: "EXCLUSIVE", icon: "✅", title: "24 Premium Villas" },
        { category: "4 & 5 BHK", icon: "✅", title: "Independent Villas" },
        { category: "BUILTUP", icon: "✅", title: "4500 & 5200 Sqft" },
        { category: "CONTEMPORARY", icon: "✅", title: "Modern Architecture" },
      ],
      bottom: [
        { category: "PRIVATE GARDEN", icon: "✅", title: "800 SQ. FT." },
        { category: "SWIMMING POOL", icon: "✅", title: "Private Pool" },
        { category: "ROOFTOP DECK", icon: "✅", title: "1200 SQ. FT." },
        {
          category: "LUXURY AMENITIES",
          icon: "✅",
          title: "Resort-Style Living",
        },
      ],
    },
  },
};

let propCurrentType = "villaments";
let propDetailsVisible = false;

function propShowContent(type) {
  // Update button states
  document.querySelectorAll(".prop-toggle-btn").forEach((btn) => {
    btn.classList.remove("prop-active");
  });
  event.target.classList.add("prop-active");

  propCurrentType = type;
  propRenderContent();
}

function propRenderContent() {
  const data = propData[propCurrentType];
  const contentArea = document.getElementById("prop-content-area");

  const detailsHTML = propDetailsVisible
    ? `
                <div class="prop-details-section prop-active">
                    <div class="prop-details-grid">
                        ${data.details.top
                          .map(
                            (item) => `
                            <div class="prop-detail-item">
                                <div class="prop-detail-category">${item.category}</div>
                                <div class="prop-detail-icon">${item.icon}</div>
                                <div class="prop-detail-title">${item.title}</div>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                    <div class="prop-details-grid-bottom">
                        ${data.details.bottom
                          .map(
                            (item) => `
                            <div class="prop-detail-item">
                                <div class="prop-detail-category">${item.category}</div>
                                <div class="prop-detail-icon">${item.icon}</div>
                                <div class="prop-detail-title">${item.title}</div>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                </div>
            `
    : "";

  contentArea.innerHTML = `
                <div class="prop-badge">${data.badge}</div>
                
                <h1 class="prop-main-title">${data.title}</h1>
                
                <p class="prop-description">${data.description}</p>
                
                <div class="prop-features-grid">
                    ${data.features
                      .map(
                        (feature) => `
                        <div class="prop-feature">
                            <div class="prop-feature-label">${feature.label}</div>
                            <div class="prop-feature-icon">${feature.icon}</div>
                            <div class="prop-feature-value">${feature.value}</div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
                
                <button class="prop-view-btn" onclick="propToggleDetails()">
                    ${
                      propDetailsVisible
                        ? "HIDE EXCLUSIVES"
                        : "VIEW ALL EXCLUSIVES"
                    }
                </button>
                
                ${detailsHTML}
            `;
}

function propToggleDetails() {
  propDetailsVisible = !propDetailsVisible;
  propRenderContent();

  if (propDetailsVisible) {
    // Smooth scroll to details
    setTimeout(() => {
      document.querySelector(".prop-details-section").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  propRenderContent();
});
