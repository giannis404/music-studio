<template>
  <nav
    class="container-fluid"
    :class="{ 'nav-home': isHomePage, 'nav-other': !isHomePage }"
  >
    <!-- Desktop & Mobile Header -->
    <div class="nav-header">
      <!-- Logo -->
      <a :href="localePath('/')" class="logo">
        <img
          src="/images/logo-white.png"
          alt="Critical Studio"
          class="logo-img"
        />
      </a>

      <!-- Mobile Hamburger Button -->
      <button
        class="hamburger-btn"
        @click="toggleMobileMenu"
        :class="{ active: isMobileMenuOpen }"
        aria-label="Toggle navigation menu"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>

    <!-- Navigation Links -->
    <div class="nav-links" :class="{ 'mobile-open': isMobileMenuOpen }">
      <div class="nav-items">
        <a :href="localePath('/')" @click="closeMobileMenu">{{ t.nav.home }}</a>
        <a :href="localePath('/about')" @click="closeMobileMenu">{{
          t.nav.about
        }}</a>
        <a :href="localePath('/principles')" @click="closeMobileMenu">{{
          t.nav.principles
        }}</a>
        <a :href="localePath('/performance')" @click="closeMobileMenu">{{
          t.nav.performance
        }}</a>
        <a :href="localePath('/overview')" @click="closeMobileMenu">{{
          t.nav.overview
        }}</a>
        <a :href="localePath('/contact')" @click="closeMobileMenu">{{
          t.nav.contact
        }}</a>

        <!-- Language Switcher -->
        <div class="language-switcher">
          <a
            :href="switchLanguageUrl(currentLang === 'en' ? 'gr' : 'en')"
            class="flag-toggle"
            @click="closeMobileMenu"
            :title="
              currentLang === 'en' ? 'Switch to Greek' : 'Switch to English'
            "
          >
            <!-- Show opposite flag of current language -->
            <img
              v-if="currentLang === 'en'"
              src="/icons/flag-gr.svg"
              alt="Greek"
              class="flag-image"
            />
            <img
              v-else
              src="/icons/flag-en.svg"
              alt="English"
              class="flag-image"
            />
          </a>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div
      class="mobile-overlay"
      :class="{ active: isMobileMenuOpen }"
      @click="closeMobileMenu"
    ></div>
  </nav>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";

// Mobile menu state
const isMobileMenuOpen = ref(false);

// Current language detection
const currentLang = ref("en");
const currentPath = ref("");

// Check if we're on home page
const isHomePage = computed(() => {
  const path = currentPath.value;
  return path === "/en/" || path === "/gr/" || path === "/en" || path === "/gr";
});

// Translations
const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      principles: "Principles",
      performance: "Performance",
      overview: "Overview",
      contact: "Contact",
    },
  },
  gr: {
    nav: {
      home: "Αρχική",
      about: "Σχετικά",
      principles: "Αρχές",
      performance: "Επίδοση",
      overview: "Επισκόπηση",
      contact: "Επικοινωνία",
    },
  },
};

// Current translations
const t = computed(() => translations[currentLang.value]);

// Helper functions
const localePath = (path) => {
  return `/${currentLang.value}${path === "/" ? "/" : path}`;
};

const switchLanguageUrl = (targetLang) => {
  const path = currentPath.value.replace(/^\/(en|gr)/, "") || "/";
  return `/${targetLang}${path === "/" ? "/" : path}`;
};

// Mobile menu functions
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;

  // Prevent body scroll when menu is open
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = "";
};

// Close menu on escape key
const handleEscape = (e) => {
  if (e.key === "Escape") {
    closeMobileMenu();
  }
};

// Detect current language and path on mount
onMounted(() => {
  if (typeof window !== "undefined") {
    const pathname = window.location.pathname;

    const langMatch = pathname.match(/^\/?(en|gr)/);
    if (langMatch) {
      currentLang.value = langMatch[1];
      currentPath.value = pathname;
    } else {
      currentLang.value = "en";
      currentPath.value = "/en/";
    }

    // Add escape key listener
    document.addEventListener("keydown", handleEscape);
  }
});

onUnmounted(() => {
  // Cleanup
  document.body.style.overflow = "";
  document.removeEventListener("keydown", handleEscape);
});
</script>

<style scoped>
/* BASE NAVIGATION STYLES */
nav.container-fluid {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  border: none !important;
  box-shadow: none !important;
  height: auto;
  min-height: 80px;
}

/* Navigation Header */
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

/* Logo Styles */
.logo {
  text-decoration: none !important;
  z-index: 1002;
}

.logo-img {
  height: auto;
  max-height: 100px;
  width: auto;
  max-width: 150px;
  transition: all 0.3s ease;
}

/* Desktop Navigation Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-items {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-items a {
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.3s ease;
  white-space: nowrap;
}

/* Hamburger Button - FIXED ANIMATION */
.hamburger-btn {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 30px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1002;
  position: relative;
}

.hamburger-line {
  width: 30px;
  height: 3px;
  background-color: currentColor;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform-origin: center;
  position: absolute;
}

.hamburger-line:nth-child(1) {
  top: 0;
}

.hamburger-line:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.hamburger-line:nth-child(3) {
  bottom: 0;
}

/* PERFECT X ANIMATION */
.hamburger-btn.active .hamburger-line:nth-child(1) {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.hamburger-btn.active .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: translateY(-50%) scaleX(0);
}

.hamburger-btn.active .hamburger-line:nth-child(3) {
  bottom: 50%;
  transform: translateY(50%) rotate(-45deg);
}

.dropdown summary {
  cursor: pointer;
  list-style: none;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.dropdown summary:hover {
  background: rgba(255, 255, 255, 0.2);
}

.dropdown ul {
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(0, 0, 0, 0.95) !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 0.5rem 0;
  min-width: 120px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dropdown ul li {
  list-style: none;
  margin: 0;
}

.dropdown ul a {
  display: block;
  padding: 0.5rem 1rem;
  color: white !important;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.dropdown ul a:hover {
  background: rgba(66, 197, 190, 0.2);
  color: #42c5be !important;
}

/* Mobile Overlay - FIXED Z-INDEX */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 998; /* LOWER than nav-links */
}

.mobile-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* DESKTOP STYLES */
@media (min-width: 769px) {
  .nav-links {
    position: static;
    transform: none;
    background: none;
    width: auto;
    height: auto;
    padding: 0;
    box-shadow: none;
  }

  nav.container-fluid {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

/* MOBILE STYLES - FIXED CLICKING */
@media (max-width: 768px) {
  nav.container-fluid {
    padding: 1rem;
  }

  .logo-img {
    max-height: 70px;
  }

  /* Show hamburger button */
  .hamburger-btn {
    display: flex;
  }

  /* FIXED: Higher z-index for clickable links */
  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 100px 2rem 2rem;
    transition: right 0.3s ease;
    overflow-y: auto;
    box-shadow: -4px 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1001; /* HIGHER than overlay */
  }

  .nav-links.mobile-open {
    right: 0;
  }

  .nav-items {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    width: 100%;
    z-index: 1001; /* Ensure links are clickable */
  }

  .nav-items a {
    font-size: 1.1rem;
    padding: 0.5rem 0;
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    z-index: 1001; /* Individual link z-index */
  }

  .language-switcher {
    margin-top: 1rem;
    width: 100%;
    z-index: 1001;
  }

  .dropdown summary {
    width: 100%;
    text-align: left;
  }

  .dropdown ul {
    position: static;
    width: 100%;
    margin-top: 0.5rem;
    box-shadow: none;
    border: 1px solid rgba(255, 255, 255, 0.2);
    z-index: 1002;
  }
}

/* HOME PAGE STYLES */
nav.nav-home {
  backdrop-filter: none !important;
}

nav.nav-home a,
nav.nav-home .hamburger-btn {
  color: white !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

nav.nav-home a:hover {
  color: #42c5be !important;
}

nav.nav-home .dropdown summary {
  color: white !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

/* OTHER PAGES STYLES */
nav.nav-other {
  background: rgba(0, 0, 0, 0.95) !important;
  backdrop-filter: blur(10px) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

nav.nav-other a,
nav.nav-other .hamburger-btn {
  color: white !important;
  text-shadow: none;
}

nav.nav-other a:hover {
  color: #42c5be !important;
}

nav.nav-other .dropdown summary {
  color: white !important;
  text-shadow: none;
}

/* Language Switcher */
.language-switcher {
  display: inline-block;
}

.flag-toggle {
  display: block;
  width: 36px;
  height: 24px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 0;
  margin: 0;
  line-height: 0;
}

.flag-toggle:hover {
  border-color: #42c5be;
  box-shadow: 0 4px 8px rgba(66, 197, 190, 0.3);
}

.flag-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: fill; /* CHANGED FROM 'cover' TO 'fill' */
  margin: 0;
  padding: 0;
}

/* Desktop */
@media (min-width: 769px) {
  .language-switcher {
    margin-left: 1rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .language-switcher {
    margin-top: 2rem;
    padding-top: 1.5rem;
    text-align: center;
  }

  .flag-toggle {
    width: 54px;
    height: 36px;
    display: inline-block;
  }
}

/* Home page */
nav.nav-home .flag-toggle {
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(0, 0, 0, 0.1);
}

nav.nav-home .flag-toggle:hover {
  border-color: #42c5be;
}

/* Other pages */
nav.nav-other .flag-toggle {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.05);
}

nav.nav-other .flag-toggle:hover {
  border-color: #42c5be;
}
</style>
