# Code Digest

# Folder: src

---

## START: src\components\Navigation.vue

```vue
<template>
  <nav
    class="container-fluid"
    :class="{
      'nav-home': needsTransparentNav,
      'nav-other': !needsTransparentNav,
    }"
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
        <a
          :href="localePath('/')"
          @click="closeMobileMenu"
          :class="{ active: isActive('/') }"
          >{{ t.nav.home }}</a
        >
        <a
          :href="localePath('/about')"
          @click="closeMobileMenu"
          :class="{ active: isActive('/about') }"
          >{{ t.nav.about }}</a
        >
        <a
          :href="localePath('/principles')"
          @click="closeMobileMenu"
          :class="{ active: isActive('/principles') }"
          >{{ t.nav.principles }}</a
        >
        <a
          :href="localePath('/performance')"
          @click="closeMobileMenu"
          :class="{ active: isActive('/performance') }"
          >{{ t.nav.performance }}</a
        >
        <a
          :href="localePath('/overview')"
          @click="closeMobileMenu"
          :class="{ active: isActive('/overview') }"
          >{{ t.nav.overview }}</a
        >
        <a
          :href="localePath('/contact')"
          @click="closeMobileMenu"
          :class="{ active: isActive('/contact') }"
          >{{ t.nav.contact }}</a
        >

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

const props = defineProps({
  transparentNav: {
    type: Boolean,
    default: false,
  },
});

// Mobile menu state
const isMobileMenuOpen = ref(false);

// Current language detection
const currentLang = ref("en");
const currentPath = ref("");
const isPathDetected = ref(false); // NEW: Track if path is loaded

// Check if we're on home page
const needsTransparentNav = computed(() => {
  if (props.transparentNav) return true;
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

const t = computed(() => translations[currentLang.value]);

const localePath = (path) => {
  return `/${currentLang.value}${path === "/" ? "/" : path}`;
};

const switchLanguageUrl = (targetLang) => {
  const path = currentPath.value.replace(/^\/(en|gr)/, "") || "/";
  return `/${targetLang}${path === "/" ? "/" : path}`;
};

// Check if a path is active
const isActive = (path) => {
  // Don't show active state until path is detected
  if (!isPathDetected.value) return false;

  const currentNormalized = currentPath.value.replace(/^\/(en|gr)/, "") || "/";
  const checkPath = path === "/" ? "/" : path;

  if (checkPath === "/") {
    return currentNormalized === "/" || currentNormalized === "";
  }

  return currentNormalized.startsWith(checkPath);
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
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

const handleEscape = (e) => {
  if (e.key === "Escape") {
    closeMobileMenu();
  }
};

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

    // Mark path as detected after setting it
    isPathDetected.value = true;

    document.addEventListener("keydown", handleEscape);
  }
});

onUnmounted(() => {
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
  position: relative;
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

  /* Mobile active link - left border instead of bottom */
  .nav-items a.active::after {
    display: none;
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
nav.nav-home a,
nav.nav-home .hamburger-btn {
  color: white !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

nav.nav-home a:hover {
  color: #42c5be !important;
}

/* Active link on home page */
nav.nav-home a.active {
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

/* Active link on other pages */
nav.nav-other a.active {
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
  object-fit: fill;
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

```

## END: src\components\Navigation.vue

---

## START: src\components\VueTest.vue

```vue
<template>
  <div class="vue-component">
    <h2>🎵 Vue 3 is Working!</h2>
    <p>Current count: {{ count }}</p>
    <button @click="increment" class="btn">Click me! (+1)</button>
    <button @click="reset" class="btn btn-secondary">Reset</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const count = ref(0);

const increment = () => {
  count.value++;
};

const reset = () => {
  count.value = 0;
};
</script>

<style scoped>
.vue-component {
  padding: 20px;
  border: 2px solid #42b883;
  border-radius: 8px;
  margin: 20px 0;
  background: #f9f9f9;
}

.btn {
  background: #42b883;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  font-size: 14px;
}

.btn:hover {
  background: #369870;
}

.btn-secondary {
  background: #6c757d;
}

.btn-secondary:hover {
  background: #545b62;
}
</style>

```

## END: src\components\VueTest.vue

---

## START: src\layouts\BaseLayout.astro

```astro
---
export interface Props {
  title: string;
  description?: string;
}

const { title, description = "Professional Music Studio" } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>

<style is:global>
  @import "../styles/global.css";
</style>
```

## END: src\layouts\BaseLayout.astro

---

## START: src\layouts\MainLayout.astro

```astro
---
import BaseLayout from "./BaseLayout.astro";
import Navigation from "../components/Navigation.vue";

export interface Props {
  title: string;
  description?: string;
  hideFooter?: boolean;
  isHomePage?: boolean;
  hasTopHero?: boolean;
}

const {
  title,
  description,
  hideFooter = true,
  isHomePage = false,
  hasTopHero = false,
} = Astro.props;

const needsPadding = !isHomePage && !hasTopHero;
// Pages with hero sections should have transparent nav
const needsTransparentNav = isHomePage || hasTopHero;
---

<BaseLayout title={title} description={description}>
  <header>
    <Navigation
      client:load
      transparentNav={needsTransparentNav || hasTopHero}
    />
  </header>

  <main class={needsPadding ? "main-with-nav" : ""}>
    <slot />
  </main>

  {
    !hideFooter && (
      <footer class="container">
        <hr />
        <p style="text-align: center;">© 2025 Critical Studio.</p>
      </footer>
    )
  }
</BaseLayout>

<style>
  .main-with-nav {
    padding-top: 178px;
  }
</style>

```

## END: src\layouts\MainLayout.astro

---

## START: src\pages\en\about.astro

```astro
---
import MainLayout from "../../layouts/MainLayout.astro";
---

<MainLayout
  title="About - Critical Studio"
  description="About Critical Studio and our mission"
  hasTopHero={true}
>
  <!-- Hero Section with Logo -->
  <section class="about-hero">
    <div class="hero-logo-container">
      <img
        src="/images/logo-white.png"
        alt="Critical Studio"
        class="hero-logo"
      />
    </div>
  </section>

  <!-- Content Section -->
  <section class="about-content">
    <div class="container">
      <p class="intro-text">
        Critical Studio is a reference shoebox-style interior suitable for
        top-notch audio recording, production and reproduction. It comprises
        part of an autonomous building raised in 2019 close to Corinth canal.
      </p>

      <p>
        The studio combines rigorous acoustic engineering with practical
        flexibility for professional recording, mixing, and critical listening.
      </p>

      <ul>
        <li>Structural Acoustics: Dr. N. Barkas,</li>
        <li>Acoustic Design: Dr. D. Keramidas</li>
        <li>Measurements: I. Papafilis (MSc)</li>
      </ul>
    </div>
  </section>
</MainLayout>

<style>
  /* Hero Section - NO MARGINS, starts from absolute top */
  .about-hero {
    position: relative;
    height: 45vh;
    min-height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden; /* prevent blur overflow */
  }

  .about-hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("/images/studio-interior-2.jpg");
    background-size: cover;
    background-position: center;
    filter: blur(4px); /* adjust blur radius */
    transform: scale(1.1); /* prevent edge cropping after blur */
    z-index: 0;
  }

  .about-hero::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6));
    z-index: 1;
  }

  .about-hero > * {
    position: relative;
    z-index: 2; /* content on top */
  }

  .hero-logo-container {
    text-align: center;
  }

  .hero-logo {
    width: 400px;
    height: auto;
    max-width: 90vw;
    filter: drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.8));
    margin-top: 35%;
  }

  /* Content Section */
  .about-content {
    background: #f8f8f9;
    padding: 3rem 0;
    min-height: calc(100vh - 58vh); /* Fill remaining viewport height */
  }

  .about-content h1 {
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-weight: 300;
    margin-bottom: 2rem;
  }

  .intro-text {
    font-size: clamp(1.3rem, 2.5vw, 1.5rem);
    font-weight: 500; /* Bolder */
    line-height: 1.6;
    margin-bottom: 1.5rem;
    color: #1a1a1a;
  }

  .about-content p {
    font-size: 1.25rem;
    line-height: 1.7;
    color: #1a1a1a;
  }

  .about-content ul {
    list-style: none;
    padding-left: 0;
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .about-content li {
    font-size: 1rem;
    line-height: 1.25;
    color: #1a1a1a;
    margin-bottom: 0.5rem;
    list-style: none;
  }

  /* Mobile adjustments */
  @media (max-width: 768px) {
    .about-hero {
      height: 40vh;
      min-height: 300px;
    }

    .hero-logo {
      width: 250px;
    }

    .about-content {
      padding: 3rem 0;
      min-height: calc(100vh - 52vh);
    }

    .intro-text {
      font-size: 1.2rem;
      text-align: center;
    }

    .about-content p {
      font-size: 1.2rem;
      text-align: center;
    }
  }
</style>

```

## END: src\pages\en\about.astro

---

## START: src\pages\en\contact.astro

```astro
---
import MainLayout from "../../layouts/MainLayout.astro";
---

<MainLayout
  title="Contact - Critical Studio"
  description="Contact Critical Studio for bookings"
>
  <section class="contact-section">
    <div class="contact-content">
      <h1>Contact Critical Studio</h1>
      <p class="contact-subtitle">
        For acoustic consulting or booking the place
      </p>
      <p class="contact-email">
        <a href="mailto:info@criticalstudio.eu">info@criticalstudio.eu</a>
      </p>
    </div>
  </section>
</MainLayout>

<style>
  .contact-section {
    background: #f8f8f9;
    min-height: calc(100vh - 318px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .contact-content {
    text-align: center;
    max-width: 600px;
  }

  .contact-content h1 {
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-weight: 300;
    color: #1a1a1a;
    margin-bottom: 1.5rem;
  }

  .contact-subtitle {
    font-size: 1.25rem;
    color: #1a1a1a;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .contact-email {
    font-size: 1.25rem;
    color: #1a1a1a;
  }

  .contact-email a {
    color: #42c5be;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  .contact-email a:hover {
    color: #369a94;
    text-decoration: underline;
  }

  /* Mobile */
  @media (max-width: 768px) {
    .contact-content h1 {
      font-size: 1.8rem;
    }

    .contact-subtitle,
    .contact-email {
      font-size: 1.1rem;
    }
  }
</style>

```

## END: src\pages\en\contact.astro

---

## START: src\pages\en\index.astro

```astro
---
import MainLayout from "../../layouts/MainLayout.astro";
---

<MainLayout
  title="Critical Studio - Adjustable Acoustics"
  description="Reference shoebox-style recording studio near Corinth canal"
  isHomePage={true}
  hideFooter={true}
>
  <!-- Full Hero Section starts from absolute top -->
  <section class="hero-section">
    <div class="hero-content">
      <p class="hero-subtitle">
        A reference room suitable for top-notch audio recording, production and
        reproduction.
      </p>
      <p class="hero-location">
        Located in an autonomous building near Corinth canal
      </p>
      <a href="/en/contact" class="hero-cta">GET IN TOUCH</a>
    </div>
  </section>

  <!-- Rest of your content stays the same -->
</MainLayout>

<style>
  /* Hero starts from absolute top with no gaps */
  .hero-section {
    height: 100vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)),
      url("/images/studio-hero-bg.jpg");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 0 !important;
    padding: 0 !important;
    top: 0;
    left: 0;
    right: 0;
  }

  .hero-content {
    text-align: center;
    color: white;
    max-width: 800px;
    padding: 0 2rem;
  }

  .hero-title {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 300;
    letter-spacing: 0.2em;
    margin-bottom: 2rem;
    line-height: 1.1;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
    color: white;
  }

  .hero-subtitle {
    font-size: clamp(1.2rem, 2.5vw, 1.6rem);
    font-weight: 400; /* Slightly heavier for better readability */
    line-height: 1.6;
    margin-bottom: 1.5rem;
    opacity: 1; /* Remove opacity that was making it fade */
    color: white;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9); /* Stronger shadow for contrast */
    max-width: 700px; /* Limit width for better reading */
    margin-left: auto;
    margin-right: auto;
  }

  .hero-location {
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    font-weight: 500; /* Make it slightly bolder */
    margin-bottom: 3rem;
    color: #42c5be;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.9); /* Stronger shadow */
  }

  .hero-cta {
    display: inline-block;
    background: transparent;
    color: white;
    padding: 1.2rem 3rem;
    border: 2px solid white;
    text-decoration: none;
    font-weight: 600;
    letter-spacing: 0.15em;
    font-size: 1rem;
    transition: all 0.3s ease;
    text-transform: uppercase;
  }

  .hero-cta:hover {
    background: #42c5be;
    border-color: #42c5be;
    color: white;
  }
</style>

```

## END: src\pages\en\index.astro

---

## START: src\pages\en\overview.astro

```astro
---
import MainLayout from "../../layouts/MainLayout.astro";
---

<MainLayout
  title="Overview - Critical Studio"
  description="Complete overview of Critical Studio capabilities"
>
  <section class="overview-section">
    <div class="container">
      <div class="overview-grid">
        <!-- Card 1: Isolation -->
        <div class="overview-card card-1">
          <div class="card-overlay"></div>
          <div class="card-content">
            <p>
              Isolated from the outside world, Critical Studio can support
              undisrupted recordings of premium quality, monitoring absent of
              disturbances and peace of mind to all humans sitting in.
            </p>
          </div>
        </div>

        <!-- Card 2: Modal Decays -->
        <div class="overview-card card-2">
          <div class="card-overlay"></div>
          <div class="card-content">
            <p>
              Modal decays below the audibility thresholds (alongside the
              control of early reflections) ensure an engaging reproduction
              stage while the direct sound remains uncolored.
            </p>
          </div>
        </div>

        <!-- Card 3: Recording -->
        <div class="overview-card card-3">
          <div class="card-overlay"></div>
          <div class="card-content">
            <p>
              With removing the porous absorbers from the walls, the RT (~0.6<i
                >s</i
              >) is ideal for recording purposes.
            </p>
            <p class="booking-text">
              The interior can be booked for individual projects (rehearsal,
              recording, mixing / mastering).
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</MainLayout>

<style>
  .overview-section {
    background: #f8f8f9;
    padding: 3rem 0;
    min-height: calc(100vh - 318px);
    display: flex;
    align-items: center;
  }

  .overview-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin: 0 auto;
  }

  /* Overview Card Base */
  .overview-card {
    position: relative;
    min-height: 400px;
    border-radius: 8px;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .overview-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  /* Background Images */
  .card-1 {
    background-image: url("/images/overview/overview-1.jpg");
  }

  .card-2 {
    background-image: url("/images/overview/overview-2.jpg");
  }

  .card-3 {
    background-image: url("/images/overview/overview-3.jpg");
  }

  /* Dark Overlay for Readability */
  .card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.75));
    z-index: 1;
  }

  /* Card Content */
  .card-content {
    position: relative;
    z-index: 2;
    padding: 2.5rem;
    text-align: center;
    color: white;
  }

  .card-content p {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 0;
    color: #ffffff; /* Explicit white */
    font-weight: 500; /* Slightly bolder */
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  }

  .booking-text {
    margin-top: 1.5rem;
    font-weight: 600; /* Even bolder for accent */
    color: #42c5be !important;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  }

  /* Mobile Responsive */
  @media (max-width: 768px) {
    .overview-section {
      padding-top: 0;
    }

    .overview-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .overview-card {
      min-height: 350px;
    }

    .card-content {
      padding: 2rem;
    }

    .card-content p {
      font-size: 1rem;
    }
  }
</style>

```

## END: src\pages\en\overview.astro

---

## START: src\pages\en\performance.astro

```astro
---
import MainLayout from "../../layouts/MainLayout.astro";
---

<MainLayout
  title="Performance - Critical Studio"
  description="Studio performance and acoustic measurements"
>
  <section class="performance-content">
    <div class="container">
      <!-- Intro Text -->
      <div class="intro-section">
        <p>
          Assessment of the acoustics takes place in this section. When we
          examine how rooms colour the sound, we look at the time domain
          behavior. In Classical Acoustics the concept has been known as
          reverberation time (RT). In small rooms, we are primarily concerned
          about the low-frequency counterpart; modal decay time (MDT).
        </p>
        <p>
          Modes are known as primary factor of perceived coloration in rooms for
          listening. Uncolored soundstage can only be achieved when the
          resonances are sufficiently damped. The degree of damping for each
          frequency has been determined as a function of MDT (Fazenda et al.,
          2015).
        </p>
      </div>

      <hr style="border-top: 1px solid #1a1a1a;" />

      <!-- MAIN SECTION: PLANES -->
      <div class="main-section">
        <div class="main-section-image">
          <img
            src="/images/performance/performance-planes.jpg"
            alt="Studio construction planes"
          />
        </div>
        <div class="main-section-content">
          <h2>PLANES</h2>
          <p>
            Before revealing the performance in depth, the layers that comprise
            each plane and sub-plane are displayed. Evaluation of the room
            response is then conducted through the interpretation of
            measurements.
          </p>
        </div>
      </div>

      <hr />

      <!-- Subsection: Floor (Image Left) -->
      <div class="subsection image-left">
        <div class="subsection-image">
          <img
            src="/images/performance/performance-floor.jpg"
            alt="Studio floor construction"
          />
        </div>
        <div class="subsection-content">
          <h3>Floor</h3>
          <p>
            A wooden floor is separated from the main slab. In between, the 10<i
              >cm</i
            >
            gap is filled with rockwool.
          </p>
        </div>
      </div>

      <hr />

      <!-- Subsection: Ceiling (Image Right) -->
      <div class="subsection image-right">
        <div class="subsection-content">
          <h3>Ceiling</h3>
          <p>
            The ceiling essentially is a triple-layer construction (slab-drywall-
            tiles). Right above the visible tile ceiling, HVAC tubes take place.
          </p>
        </div>
        <div class="subsection-image">
          <img
            src="/images/performance/performance-ceiling.jpg"
            alt="Studio ceiling construction"
          />
        </div>
      </div>

      <hr />

      <!-- Subsection: Vertical Walls (Image Left) -->
      <div class="subsection image-left">
        <div class="subsection-image">
          <img
            src="/images/performance/performance-vertical-walls.jpg"
            alt="Studio vertical walls"
          />
        </div>
        <div class="subsection-content">
          <h3>Vertical Walls</h3>
          <p>
            Before the floating floor/ceiling took place, floating brick walls
            were assembled. At the certain point the slab to slab distance was 4<i
              >m</i
            >.
          </p>
        </div>
      </div>

      <hr style="border-top: 1px solid #1a1a1a;" />

      <!-- MAIN SECTION: SUBPLANES -->
      <div class="main-section">
        <div class="main-section-image">
          <img
            src="/images/performance/performance-subplanes.jpg"
            alt="Studio acoustic subplanes"
          />
        </div>
        <div class="main-section-content">
          <h2>SUBPLANES</h2>
          <p>
            Panels that occupy 1.3<i>m<sup>2</sup></i> are mounted on the vertical
            walls. The panels are divided into: 1) membrane of two different thicknesses
            and 2) porous 5<i>cm</i> thick with cloth.
          </p>
        </div>
      </div>

      <hr />

      <!-- Subsection: Membrane Absorbers (Image Right) -->
      <div class="subsection image-right">
        <div class="subsection-content">
          <h3>Membrane Absorbers</h3>
          <p>
            Critical Studio boasts significant low-frequency damping thanks to
            uniformly distributed custom-made membrane absorbers (20<i>cm</i> and
            10<i>cm</i>
            thick). The enclosed gaps are filled with rockwool. The masses of the
            front surfaces are increased with viscous material.
          </p>
        </div>
        <div class="subsection-image">
          <img
            src="/images/performance/performance-membrane-absorbers.jpg"
            alt="Membrane absorbers"
          />
        </div>
      </div>

      <hr />

      <!-- Subsection: Porous Absorbers (Image Left) -->
      <div class="subsection image-left">
        <div class="subsection-image">
          <img
            src="/images/performance/performance-porous-absorbers.jpg"
            alt="Porous absorbers"
          />
        </div>
        <div class="subsection-content">
          <h3>Porous Absorbers</h3>
          <p>
            The porous absorbers can quickly be hung/unhung by a single person.
            When mounted, the sound field is suitable for monitoring. When
            removed, the place is transformed into live room.
          </p>
        </div>
      </div>

      <hr style="border-top: 1px solid #1a1a1a;" />

      <!-- MAIN SECTION: MODAL RESPONSE (No Image) -->
      <div class="main-section modal-section">
        <div class="main-section-content-full">
          <h2>MODAL RESPONSE</h2>
          <p class="modal-text" style="font-size: 1.25rem;">
            The effect of the room is depicted below in regards to MDT.
          </p>
        </div>
      </div>

      <hr />

      <!-- Modal Response Pair 1 -->
      <div class="modal-pair">
        <div class="modal-images">
          <img
            src="/images/performance/performance-modal-response-1.jpg"
            alt="Studio without absorbers"
          />
          <img
            src="/images/performance/performance-modal-response-2.jpg"
            alt="Modal decay chart - no absorbers"
          />
        </div>
        <p class="modal-text">
          When the absorbers are absent from the vertical walls, the
          measurements reveal decays perceived as coloration.
        </p>
      </div>

      <hr />

      <!-- Modal Response Pair 2 -->
      <div class="modal-pair">
        <div class="modal-images">
          <img
            src="/images/performance/performance-modal-response-3.jpg"
            alt="Studio with absorbers"
          />
          <img
            src="/images/performance/performance-modal-response-4.jpg"
            alt="Modal decay chart - with absorbers"
          />
        </div>
        <p class="modal-text">
          With the absorbers in place, inaudible decays for musical signals are
          realized.
        </p>
      </div>

      <hr />

      <!-- Modal Response Pair 3 -->
      <div class="modal-pair">
        <div class="modal-images">
          <img
            src="/images/performance/performance-modal-response-5.jpg"
            alt="Membrane absorber backing detail"
          />
          <img
            src="/images/performance/performance-modal-response-6.jpg"
            alt="Modal decay chart - improved"
          />
        </div>
        <p class="modal-text">
          Some kind of discontinuity was detected on the backing of the thicker
          membrane absorbers. Acrylic paste was added to make them airtight,
          lowering further the decay times. The (2, 0, 0) mode at 44<i>Hz</i> achieves
          decay which is severely undetectable.
        </p>
      </div>

      <hr />

      <!-- Modal Response Final -->
      <div class="modal-pair">
        <div class="modal-images">
          <img
            src="/images/performance/performance-modal-response-7.jpg"
            alt="Final modal decay chart"
          />
        </div>
        <p class="modal-text">
          The latter move also improves the response even lower. The (0, 1, 0)
          mode at 29<i>Hz</i> achieves decay that indicates absence of coloration.
        </p>
      </div>
    </div>
  </section>
</MainLayout>

<style>
  .performance-content {
    background: #f8f8f9;
    padding: 1rem 0;
    min-height: calc(100vh - 178px);
  }

  /* Intro Section */
  .intro-section {
    max-width: 900px;
    margin: 0 auto 4rem;
  }

  .intro-section p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #1a1a1a;
    margin-bottom: 1.5rem;
  }

  /* Main Section (Image + Header) */
  .main-section {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 3rem;
    align-items: start;
    margin: 4rem 0 3rem;
  }

  .main-section-image img {
    width: 100%;
    height: 350px;
    object-fit: contain;
    border-radius: 8px;
  }

  .main-section-content h2 {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #1a1a1a;
  }

  .main-section-content p {
    font-size: 1.25rem;
    line-height: 1.7;
    color: #1a1a1a;
    font-weight: 500;
  }

  /* Modal Section (No Image) */
  .modal-section {
    grid-template-columns: 1fr;
    margin: 5rem 0 3rem;
  }

  .main-section-content-full h2 {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #1a1a1a;
  }

  .main-section-content-full p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #1a1a1a;
  }

  /* Subsections */
  .subsection {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
    margin: 3rem 0;
  }

  .subsection-image img {
    width: 100%;
    height: 320px;
    object-fit: contain;
    border-radius: 8px;
  }

  .subsection-content h3 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1a1a1a;
  }

  .subsection-content p {
    font-size: 1.05rem;
    line-height: 1.7;
    color: #1a1a1a;
  }

  /* Modal Response Pairs */
  .modal-pair {
    margin: 3rem 0;
  }

  .modal-images {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .modal-images img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  /* Single image in last pair */
  .modal-pair:last-child .modal-images {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin: 0 auto 2rem;
  }

  .modal-text {
    font-size: 1.25rem;
    line-height: 1.7;
    color: #1a1a1a;
    text-align: left;
    margin: 0 auto;
    font-weight: 500;
    margin-bottom: 0;
  }

  /* Mobile Responsive */
  @media (max-width: 768px) {
    .performance-content {
      padding: 0;
    }

    .intro-section {
      margin-bottom: 3rem;
    }

    .intro-section p {
      font-size: 1rem;
      text-align: center;
    }

    /* Main sections stack */
    .main-section {
      grid-template-columns: 1fr;
      gap: 2rem;
      margin: 3rem 0 2rem;
    }

    .main-section-image img {
      height: 250px;
    }

    .main-section-content h2,
    .main-section-content-full h2 {
      font-size: 2rem;
      text-align: center;
    }

    .main-section-content p,
    .main-section-content-full p {
      text-align: center;
    }

    /* Subsections stack */
    .subsection {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      margin: 2.5rem 0;
    }

    /* Always image first on mobile */
    .subsection.image-right {
      grid-template-areas: "image" "content";
    }

    .subsection.image-right .subsection-image {
      grid-area: image;
    }

    .subsection.image-right .subsection-content {
      grid-area: content;
    }

    .subsection-image img {
      height: 250px;
    }

    .subsection-content h3 {
      font-size: 1.5rem;
      text-align: center;
    }

    .subsection-content p {
      text-align: center;
    }

    /* Modal images stack */
    .modal-images {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .modal-text {
      font-size: 1rem;
    }
  }
</style>

```

## END: src\pages\en\performance.astro

---

## START: src\pages\en\principles.astro

```astro
---
import MainLayout from "../../layouts/MainLayout.astro";
---

<MainLayout
  title="Principles - Critical Studio"
  description="Acoustic principles and studio design"
>
  <section class="principles-content">
    <div class="container">
      <div class="principles-grid">
        <!-- Insulation -->
        <div class="principle-section">
          <h2 style="font-size: 1.5rem">INSULATION</h2>
          <img
            src="/images/principles/principles-insulation.jpg"
            alt="Studio insulation construction"
            class="principle-image"
          />
          <p>
            The double-cell construction offers significant airborne noise
            reduction (58<i>dB</i>). The outer cell consists of sand-filled
            cement blocks.
          </p>
        </div>

        <!-- Room Acoustics -->
        <div class="principle-section">
          <h2 style="font-size: 1.5rem">ROOM ACOUSTICS</h2>
          <img
            src="/images/principles/principles-room-acoustics.jpg"
            alt="Studio room acoustics treatment"
            class="principle-image"
          />
          <p>
            There was a point of ambiguity regarding the inner cell walls; to
            either make them rigid enough (maximizing insulation) or to go for a
            gypsumboard-type material. The first choice was adopted, thus
            leading to the extensive use of custom-made membrane absorbers. The
            subsequent layout comprises a modular hybrid design of porous and
            membrane panels.
          </p>
        </div>
      </div>
    </div>
  </section>
</MainLayout>

<style>
  .principles-content {
    background: #f8f8f9;
    padding: 1rem 0;
  }

  .principles-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .principle-section h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #1a1a1a;
  }

  .principle-image {
    width: 100%;
    height: 320px;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    display: block;
    object-fit: cover;
  }

  .principle-section p {
    font-size: 1rem;
    line-height: 1.7;
    color: #1a1a1a;
  }

  /* Mobile */
  @media (max-width: 768px) {
    .principles-content {
      padding: 0;
    }

    .principles-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    .principle-section h2 {
      font-size: 1.6rem;
      text-align: center;
    }

    .principle-section p {
      text-align: center;
    }
  }
</style>

```

## END: src\pages\en\principles.astro

---

## START: src\pages\gr\about.astro

```astro
---
import MainLayout from "../../layouts/MainLayout.astro";
---

<MainLayout
  title="About - Critical Studio"
  description="About Critical Studio and our mission"
  hasTopHero={true}
>
  <!-- Hero Section with Logo -->
  <section class="about-hero">
    <div class="hero-logo-container">
      <img
        src="/images/logo-white.png"
        alt="Critical Studio"
        class="hero-logo"
      />
    </div>
  </section>

  <!-- Content Section -->
  <section class="about-content">
    <div class="container">
      <p class="intro-text">
        Το Critical Studio αποτελεί χώρο σχεδιασμένο ως πρότυπο δωμάτιο για
        κορυφαία ηχογράφηση, παραγωγή και αναπαραγωγή ήχου. Συνιστά τμήμα
        αυτόνομου κτιρίου που ανεγέρθηκε το 2019, κοντά στη Διώρυγα της
        Κορίνθου.
      </p>

      <p>
        Το στούντιο συνδυάζει ενδελεχή ακουστική μελέτη με πρακτική ευελιξία,
        προσφέροντας ιδανικές συνθήκες για επαγγελματική ηχογράφηση, μίξη και
        κριτική ακρόαση.
      </p>

      <ul>
        <li>Ηχομόνωση: Δρ. Ν. Μπάρκας</li>
        <li>Ακουστική: Δρ. Δ. Κεραμίδας</li>
        <li>Μετρήσεις: Ι. Παπαφίλης (MSc)</li>
      </ul>
    </div>
  </section>
</MainLayout>

<style>
  /* Hero Section - NO MARGINS, starts from absolute top */
  .about-hero {
    position: relative;
    height: 45vh;
    min-height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden; /* prevent blur overflow */
  }

  .about-hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("/images/studio-interior-2.jpg");
    background-size: cover;
    background-position: center;
    filter: blur(4px); /* adjust blur radius */
    transform: scale(1.1); /* prevent edge cropping after blur */
    z-index: 0;
  }

  .about-hero::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6));
    z-index: 1;
  }

  .about-hero > * {
    position: relative;
    z-index: 2; /* content on top */
  }

  .hero-logo-container {
    text-align: center;
  }

  .hero-logo {
    width: 400px;
    height: auto;
    max-width: 90vw;
    filter: drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.8));
    margin-top: 35%;
  }

  /* Content Section */
  .about-content {
    background: #f8f8f9;
    padding: 3rem 0;
    min-height: calc(100vh - 58vh); /* Fill remaining viewport height */
  }

  .about-content h1 {
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-weight: 300;
    margin-bottom: 2rem;
  }

  .about-content ul {
    list-style: none;
    padding-left: 0;
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .about-content li {
    font-size: 1rem;
    line-height: 1.25;
    color: #1a1a1a;
    margin-bottom: 0.5rem;
    list-style: none;
  }

  .intro-text {
    font-size: clamp(1.3rem, 2.5vw, 1.5rem);
    font-weight: 500; /* Bolder */
    line-height: 1.6;
    margin-bottom: 1.5rem;
    color: #1a1a1a;
  }

  .about-content p {
    font-size: 1.25rem;
    line-height: 1.7;
    color: #1a1a1a;
  }

  /* Mobile adjustments */
  @media (max-width: 768px) {
    .about-hero {
      height: 40vh;
      min-height: 300px;
    }

    .hero-logo {
      width: 250px;
    }

    .about-content {
      padding: 3rem 0;
      min-height: calc(100vh - 52vh);
    }

    .intro-text {
      font-size: 1.2rem;
      text-align: center;
    }

    .about-content p {
      font-size: 1.2rem;
      text-align: center;
    }
  }
</style>

```

## END: src\pages\gr\about.astro

---

## START: src\pages\gr\contact.astro

```astro
---
import MainLayout from "../../layouts/MainLayout.astro";
---

<MainLayout
  title="Contact - Critical Studio"
  description="Contact Critical Studio for bookings"
>
  <section class="contact-section">
    <div class="contact-content">
      <h1>Επικοινωνία με το Critical Studio</h1>
      <p class="contact-subtitle">
        Για συμβουλευτική Ακουστικής ή για κρατήσεις του χώρου
      </p>
      <p class="contact-email">
        <a href="mailto:info@criticalstudio.eu">info@criticalstudio.eu</a>
      </p>
    </div>
  </section>
</MainLayout>

<style>
  .contact-section {
    background: #f8f8f9;
    min-height: calc(100vh - 318px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .contact-content {
    text-align: center;
    max-width: 600px;
  }

  .contact-content h1 {
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-weight: 300;
    color: #1a1a1a;
    margin-bottom: 1.5rem;
  }

  .contact-subtitle {
    font-size: 1.25rem;
    color: #1a1a1a;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .contact-email {
    font-size: 1.25rem;
    color: #1a1a1a;
  }

  .contact-email a {
    color: #42c5be;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  .contact-email a:hover {
    color: #369a94;
    text-decoration: underline;
  }

  /* Mobile */
  @media (max-width: 768px) {
    .contact-content h1 {
      font-size: 1.8rem;
    }

    .contact-subtitle,
    .contact-email {
      font-size: 1.1rem;
    }
  }
</style>

```

## END: src\pages\gr\contact.astro

---

## START: src\pages\gr\index.astro

```astro
---
import MainLayout from "../../layouts/MainLayout.astro";
---

<MainLayout
  title="Critical Studio - Επαγγελματική Ηχογράφηση"
  description="Επαγγελματικό στούντιο ηχογράφησης με ακουστική αναφοράς κοντά στη διώρυγα Κορίνθου"
  isHomePage={true}
  hideFooter={true}
>
  <!-- Hero Section -->
  <section class="hero-section">
    <div class="hero-content">
      <p class="hero-subtitle">
        Δωμάτιο Αναφοράς κατάλληλο για κορυφαία ηχογράφηση, παραγωγή και
        αναπαραγωγή ήχου.
      </p>
      <p class="hero-location">
        Στεγάζεται σε αυτόνομο κτίριο κοντά στη διώρυγα της Κορίνθου
      </p>
      <a href="/gr/contact" class="hero-cta">ΕΠΙΚΟΙΝΩΝΙΑ</a>
    </div>
  </section>
</MainLayout>

<style>
  /* Copy the exact same styles from English page */
  .hero-section {
    height: 100vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)),
      url("/images/studio-hero-bg.jpg");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 0 !important;
    padding: 0 !important;
    top: 0;
    left: 0;
    right: 0;
  }

  .hero-content {
    text-align: center;
    color: white;
    max-width: 800px;
    padding: 0 2rem;
  }

  .hero-subtitle {
    font-size: clamp(1.2rem, 2.5vw, 1.6rem);
    font-weight: 400;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    opacity: 1;
    color: white;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9);
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-location {
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    font-weight: 500;
    margin-bottom: 3rem;
    color: #42c5be;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.9);
  }

  .hero-cta {
    display: inline-block;
    background: transparent;
    color: white;
    padding: 1.2rem 3rem;
    border: 2px solid white;
    text-decoration: none;
    font-weight: 600;
    letter-spacing: 0.15em;
    font-size: 1rem;
    transition: all 0.3s ease;
    text-transform: uppercase;
  }

  .hero-cta:hover {
    background: #42c5be;
    border-color: #42c5be;
    color: white;
  }

  /* Features Section */
  .features-section {
    padding: 5rem 0;
    background: #f8f9fa;
  }

  .features-section h2 {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 300;
    margin-bottom: 3rem;
    color: #2c3e50;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .feature-card {
    background: white;
    padding: 2.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    text-align: center;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .feature-icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }

  .feature-card h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #2c3e50;
  }

  .feature-card p {
    font-size: 1rem;
    line-height: 1.6;
    color: #6c757d;
    margin-bottom: 1.5rem;
  }

  .feature-link {
    color: #42c5be;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  .feature-link:hover {
    color: #369a94;
  }

  /* Mobile adjustments */
  @media (max-width: 768px) {
    .hero-section {
      background-attachment: scroll;
    }

    .features-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .feature-card {
      padding: 2rem;
    }
  }
</style>

```

## END: src\pages\gr\index.astro

---

## START: src\pages\gr\overview.astro

```astro
---
import MainLayout from "../../layouts/MainLayout.astro";
---

<MainLayout
  title="Overview - Critical Studio"
  description="Complete overview of Critical Studio capabilities"
>
  <section class="overview-section">
    <div class="container">
      <div class="overview-grid">
        <!-- Card 1: Isolation -->
        <div class="overview-card card-1">
          <div class="card-overlay"></div>
          <div class="card-content">
            <p>
              Απομονωμένο από τον έξω κόσμο, το Critical Studio προσφέρεται για
              ηχογραφήσεις κορυφαίας ποιότητας, monitoring χωρίς αποσπάσεις
              προσοχής και απόλυτη ηρεμία σε όσους βρίσκονται εντός του.
            </p>
          </div>
        </div>

        <!-- Card 2: Modal Decays -->
        <div class="overview-card card-2">
          <div class="card-overlay"></div>
          <div class="card-content">
            <p>
              Οι αποσβέσεις των συντονισμών κάτω από τα κατώφλια ακουστότητας
              (και η διαχείριση των πρώιμων ανακλάσεων), εξασφαλίζουν πειστικό
              και ευκρινές soundstage, ενώ ο απευθείας ήχος παραμένει
              αχρωμάτιστος.
            </p>
          </div>
        </div>

        <!-- Card 3: Recording -->
        <div class="overview-card card-3">
          <div class="card-overlay"></div>
          <div class="card-content">
            <p>
              Με την αφαίρεση των πορωδών απορροφητών από τους τοίχους, ο χρόνος
              αντήχησης (~0.6<i>s</i>) καθίσταται ιδανικός για ηχογραφήσεις.
            </p>
            <p class="booking-text">
              Ο χώρος είναι διαθέσιμος για μεμονωμένα έργα, όπως πρόβες,
              ηχογραφήσεις και μίξεις.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</MainLayout>

<style>
  .overview-section {
    background: #f8f8f9;
    padding: 3rem 0;
    min-height: calc(100vh - 318px);
    display: flex;
    align-items: center;
  }

  .overview-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin: 0 auto;
  }

  /* Overview Card Base */
  .overview-card {
    position: relative;
    min-height: 400px;
    border-radius: 8px;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .overview-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  /* Background Images */
  .card-1 {
    background-image: url("/images/overview/overview-1.jpg");
  }

  .card-2 {
    background-image: url("/images/overview/overview-2.jpg");
  }

  .card-3 {
    background-image: url("/images/overview/overview-3.jpg");
  }

  /* Dark Overlay for Readability */
  .card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.75));
    z-index: 1;
  }

  /* Card Content */
  .card-content {
    position: relative;
    z-index: 2;
    padding: 2.5rem;
    text-align: center;
    color: white;
  }

  .card-content p {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 0;
    color: #ffffff; /* Explicit white */
    font-weight: 500; /* Slightly bolder */
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  }

  .booking-text {
    margin-top: 1.5rem;
    font-weight: 600; /* Even bolder for accent */
    color: #42c5be !important;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  }

  /* Mobile Responsive */
  @media (max-width: 768px) {
    .overview-section {
      padding-top: 0;
    }

    .overview-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .overview-card {
      min-height: 350px;
    }

    .card-content {
      padding: 2rem;
    }

    .card-content p {
      font-size: 1rem;
    }
  }
</style>

```

## END: src\pages\gr\overview.astro

---

## START: src\pages\gr\performance.astro

```astro
---
import MainLayout from "../../layouts/MainLayout.astro";
---

<MainLayout
  title="Performance - Critical Studio"
  description="Studio performance and acoustic measurements"
>
  <section class="performance-content">
    <div class="container">
      <!-- Intro Text -->
      <div class="intro-section">
        <p>
          Αξιολόγηση της ακουστικής πραγματοποιείται στην παρούσα ενότητα. Όταν
          εξετάζουμε πώς ένας χώρος επηρεάζει τον ήχο, εστιάζουμε στη
          συμπεριφορά του στο πεδίο του χρόνου. Στην κλασική ακουστική, η έννοια
          αυτή είναι γνωστή ως χρόνος αντήχησης (reverberation time - RT). Στους
          μικρούς χώρους, το ενδιαφέρον στρέφεται κυρίως στις χαμηλές
          συχνότητες, όπου μιλάμε για τον χρόνο απόσβεσης των συντονισμών (modal
          decay time - MDT).
        </p>
        <p>
          Οι συντονισμοί (modes) αποτελούν βασικό παράγοντα της αντιληπτής
          χρωμάτισης του ήχου μέσα σε έναν χώρο για ακρόαση. Μια ουδέτερη
          ηχητική σκηνή επιτυγχάνεται μόνο όταν οι συντονισμοί αποσβένονται
          επαρκώς. Ο βαθμός απόσβεσης για κάθε συχνότητα έχει προσδιοριστεί
          (Fazenda et al., 2015) ως συνάρτηση του MDT.
        </p>
      </div>

      <hr style="border-top: 1px solid #1a1a1a;" />

      <!-- MAIN SECTION: PLANES -->
      <div class="main-section">
        <div class="main-section-image">
          <img
            src="/images/performance/performance-planes.jpg"
            alt="Studio construction planes"
          />
        </div>
        <div class="main-section-content">
          <h2>ΕΠΙΠΕΔΑ</h2>
          <p>
            Πριν η επίδοση επεξηγηθεί περαιτέρω, παρουσιάζονται οι στρώσεις που
            συνθέτουν κάθε επίπεδο και υποεπίπεδο. Στη συνέχεια, η αξιολόγηση
            του χώρου πραγματοποιείται χάρη στα αποτελέσματα των ακουστικών
            μετρήσεων.
          </p>
        </div>
      </div>

      <hr />

      <!-- Subsection: Floor (Image Left) -->
      <div class="subsection image-left">
        <div class="subsection-image">
          <img
            src="/images/performance/performance-floor.jpg"
            alt="Studio floor construction"
          />
        </div>
        <div class="subsection-content">
          <h3>Δάπεδο</h3>
          <p>
            Το ξύλινο δάπεδο είναι απομονωμένο από την κύρια πλάκα. Το διάκενο
            των 10<i>cm</i> ενδιάμεσα είναι γεμάτο με πετροβάμβακα.
          </p>
        </div>
      </div>

      <hr />

      <!-- Subsection: Ceiling (Image Right) -->
      <div class="subsection image-right">
        <div class="subsection-content">
          <h3>Οροφή</h3>
          <p>
            Η οροφή διαθέτει ουσιαστικά τριπλή στρώση (πλάκα – γυψοσανίδα –
            πλακίδια). Ακριβώς πάνω από την ορατή ψευδοροφή βρίσκονται
            σωληνώσεις του συστήματος εξαερισμού.
          </p>
        </div>
        <div class="subsection-image">
          <img
            src="/images/performance/performance-ceiling.jpg"
            alt="Studio ceiling construction"
          />
        </div>
      </div>

      <hr />

      <!-- Subsection: Vertical Walls (Image Left) -->
      <div class="subsection image-left">
        <div class="subsection-image">
          <img
            src="/images/performance/performance-vertical-walls.jpg"
            alt="Studio vertical walls"
          />
        </div>
        <div class="subsection-content">
          <h3>Κάθετα τοιχώματα</h3>
          <p>
            Πριν τοποθετηθεί το πλωτό δάπεδο και η οροφή, κατασκευάστηκαν πλωτά
            κάθετα τοιχώματα από τούβλο. Στη φάση εκείνη, η απόσταση πλάκας με
            πλάκα (δάπεδο-οροφή) ήταν 4<i>m</i>.
          </p>
        </div>
      </div>

      <hr style="border-top: 1px solid #1a1a1a;" />

      <!-- MAIN SECTION: SUBPLANES -->
      <div class="main-section">
        <div class="main-section-image">
          <img
            src="/images/performance/performance-subplanes.jpg"
            alt="Studio acoustic subplanes"
          />
        </div>
        <div class="main-section-content">
          <h2>YΠΟΕΠΙΠΕΔΑ</h2>
          <p>
            Πάνελ που καταλαμβάνουν επιφάνεια 1.3<i>m²</i> τοποθετούνται στους κάθετους
            τοίχους. Τα πάνελ χωρίζονται σε: 1) διαφραγματικά δύο διαφορετικών παχών
            και 2) πορώδη με υλικό πάχους 5<i>cm</i>, επενδεδυμένα με ύφασμα.
          </p>
        </div>
      </div>

      <hr />

      <!-- Subsection: Membrane Absorbers (Image Right) -->
      <div class="subsection image-right">
        <div class="subsection-content">
          <h3>Διαφραγματικοί Απορροφητές</h3>
          <p>
            Το Critical Studio επιτυγχάνει σημαντική χαμηλόσυχνη απόσβεση, χάρη
            στην ομοιόμορφη κατανομή των ειδικά κατασκευασμένων διαφραγματικών
            πάνελ (πάχους 20<i>cm</i> και 10<i>cm</i>). Τα εσωτερικά κενά
            περιέχουν πετροβάμβακα, ενώ οι εμπρόσθιες επιφάνειες έχουν αυξημένη
            μάζα λόγω της ύπαρξης μεμβράνης.
          </p>
        </div>
        <div class="subsection-image">
          <img
            src="/images/performance/performance-membrane-absorbers.jpg"
            alt="Membrane absorbers"
          />
        </div>
      </div>

      <hr />

      <!-- Subsection: Porous Absorbers (Image Left) -->
      <div class="subsection image-left">
        <div class="subsection-image">
          <img
            src="/images/performance/performance-porous-absorbers.jpg"
            alt="Porous absorbers"
          />
        </div>
        <div class="subsection-content">
          <h3>Πορώδεις Απορροφητές</h3>
          <p>
            Οι πορώδεις απορροφητές μπορούν να τοποθετηθούν ή να αφαιρεθούν
            εύκολα. Όταν βρίσκονται στη θέση τους, το ηχητικό πεδίο είναι
            ιδανικό για στερεοφωνική αναπαραγωγή. Με την αφαίρεσή τους, ο χώρος
            μετατρέπεται σε live room.
          </p>
        </div>
      </div>

      <hr style="border-top: 1px solid #1a1a1a;" />

      <!-- MAIN SECTION: MODAL RESPONSE (No Image) -->
      <div class="main-section modal-section">
        <div class="main-section-content-full">
          <h2>Χαμηλόσυχνη Απόκριση</h2>
          <p class="modal-text" style="font-size: 1.25rem;">
            Το αντίκτυπο του χώρου απεικονίζεται παρακάτω συναρτήσει του MDT.
          </p>
        </div>
      </div>

      <hr />

      <!-- Modal Response Pair 1 -->
      <div class="modal-pair">
        <div class="modal-images">
          <img
            src="/images/performance/performance-modal-response-1.jpg"
            alt="Studio without absorbers"
          />
          <img
            src="/images/performance/performance-modal-response-2.jpg"
            alt="Modal decay chart - no absorbers"
          />
        </div>
        <p class="modal-text">
          Όταν οι διατάξεις απουσιάζουν από τους κατακόρυφους τοίχους, οι
          μετρήσεις δείχνουν συντονισμούς που γίνονται αντιληπτοί ως
          χρωματισμοί.
        </p>
      </div>

      <hr />

      <!-- Modal Response Pair 2 -->
      <div class="modal-pair">
        <div class="modal-images">
          <img
            src="/images/performance/performance-modal-response-3.jpg"
            alt="Studio with absorbers"
          />
          <img
            src="/images/performance/performance-modal-response-4.jpg"
            alt="Modal decay chart - with absorbers"
          />
        </div>
        <p class="modal-text">
          Με τους απορροφητές στη θέση τους, επιτυγχάνονται μη αντιληπτές -για
          σήματα μουσικής- αποσβέσεις.
        </p>
      </div>

      <hr />

      <!-- Modal Response Pair 3 -->
      <div class="modal-pair">
        <div class="modal-images">
          <img
            src="/images/performance/performance-modal-response-5.jpg"
            alt="Membrane absorber backing detail"
          />
          <img
            src="/images/performance/performance-modal-response-6.jpg"
            alt="Modal decay chart - improved"
          />
        </div>
        <p class="modal-text">
          Παρατηρήθηκαν ασφράγιστα σημεία στο πίσω μέρος των παχύτερων
          διαφραγματικών πάνελ. Προστέθηκε ακρυλικό υλικό ώστε να καταστούν
          αεροστεγή, μειώνοντας περαιτέρω τους χρόνους απόσβεσης. Ο συντονισμός
          (2, 0, 0) στα 44<i>Hz</i> παρουσιάζει σημαντικά μη αντιληπτή απόσβεση.
        </p>
      </div>

      <hr />

      <!-- Modal Response Final -->
      <div class="modal-pair">
        <div class="modal-images">
          <img
            src="/images/performance/performance-modal-response-7.jpg"
            alt="Final modal decay chart"
          />
        </div>
        <p class="modal-text">
          Η τελευταία παρέμβαση βελτίωσε ακόμη περισσότερο τη χαμηλόσυχνη
          απόκριση· ο συντονισμός (0, 1, 0) στα 29<i>Hz</i> εμφανίζει πλέον MDT που
          ερμηνεύεται ως απουσία χρωματισμού.
        </p>
      </div>
    </div>
  </section>
</MainLayout>

<style>
  .performance-content {
    background: #f8f8f9;
    padding: 1rem 0;
    min-height: calc(100vh - 178px);
  }

  /* Intro Section */
  .intro-section {
    max-width: 900px;
    margin: 0 auto 4rem;
  }

  .intro-section p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #1a1a1a;
    margin-bottom: 1.5rem;
  }

  /* Main Section (Image + Header) */
  .main-section {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 3rem;
    align-items: start;
    margin: 4rem 0 3rem;
  }

  .main-section-image img {
    width: 100%;
    height: 350px;
    object-fit: contain;
    border-radius: 8px;
  }

  .main-section-content h2 {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #1a1a1a;
  }

  .main-section-content p {
    font-size: 1.25rem;
    line-height: 1.7;
    color: #1a1a1a;
    font-weight: 500;
  }

  /* Modal Section (No Image) */
  .modal-section {
    grid-template-columns: 1fr;
    margin: 5rem 0 3rem;
  }

  .main-section-content-full h2 {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #1a1a1a;
  }

  .main-section-content-full p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #1a1a1a;
  }

  /* Subsections */
  .subsection {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
    margin: 3rem 0;
  }

  .subsection-image img {
    width: 100%;
    height: 320px;
    object-fit: contain;
    border-radius: 8px;
  }

  .subsection-content h3 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1a1a1a;
  }

  .subsection-content p {
    font-size: 1.05rem;
    line-height: 1.7;
    color: #1a1a1a;
  }

  /* Modal Response Pairs */
  .modal-pair {
    margin: 3rem 0;
  }

  .modal-images {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .modal-images img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  /* Single image in last pair */
  .modal-pair:last-child .modal-images {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin: 0 auto 2rem;
  }

  .modal-text {
    font-size: 1.25rem;
    line-height: 1.7;
    color: #1a1a1a;
    text-align: left;
    margin: 0 auto;
    font-weight: 500;
    margin-bottom: 0;
  }

  /* Mobile Responsive */
  @media (max-width: 768px) {
    .performance-content {
      padding: 0;
    }

    .intro-section {
      margin-bottom: 3rem;
    }

    .intro-section p {
      font-size: 1rem;
      text-align: center;
    }

    /* Main sections stack */
    .main-section {
      grid-template-columns: 1fr;
      gap: 2rem;
      margin: 3rem 0 2rem;
    }

    .main-section-image img {
      height: 250px;
    }

    .main-section-content h2,
    .main-section-content-full h2 {
      font-size: 2rem;
      text-align: center;
    }

    .main-section-content p,
    .main-section-content-full p {
      text-align: center;
    }

    /* Subsections stack */
    .subsection {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      margin: 2.5rem 0;
    }

    /* Always image first on mobile */
    .subsection.image-right {
      grid-template-areas: "image" "content";
    }

    .subsection.image-right .subsection-image {
      grid-area: image;
    }

    .subsection.image-right .subsection-content {
      grid-area: content;
    }

    .subsection-image img {
      height: 250px;
    }

    .subsection-content h3 {
      font-size: 1.5rem;
      text-align: center;
    }

    .subsection-content p {
      text-align: center;
    }

    /* Modal images stack */
    .modal-images {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .modal-text {
      font-size: 1rem;
    }
  }
</style>

```

## END: src\pages\gr\performance.astro

---

## START: src\pages\gr\principles.astro

```astro
---
import MainLayout from "../../layouts/MainLayout.astro";
---

<MainLayout
  title="Principles - Critical Studio"
  description="Acoustic principles and studio design"
>
  <section class="principles-content">
    <div class="container">
      <div class="principles-grid">
        <!-- Insulation -->
        <div class="principle-section">
          <h2 style="font-size: 1.5rem">Ηχομόνωση</h2>
          <img
            src="/images/principles/principles-insulation.jpg"
            alt="Studio insulation construction"
            class="principle-image"
          />
          <p>
            Η κατασκευή διπλού κελύφους προσφέρει σημαντική μείωση του
            αερόφερτου θορύβου (58<i>dB</i>). Το εξωτερικό κέλυφος αποτελείται
            από τσιμεντόλιθους γεμισμένους με ξηρή άμμο.
          </p>
        </div>

        <!-- Room Acoustics -->
        <div class="principle-section">
          <h2 style="font-size: 1.5rem">Ακουστική Χώρου</h2>
          <img
            src="/images/principles/principles-room-acoustics.jpg"
            alt="Studio room acoustics treatment"
            class="principle-image"
          />
          <p>
            Υπήρξε ένα σημείο αμφισημίας σχετικά με τα τοιχώματα του εσωτερικού
            κελύφους· αν θα έπρεπε να είναι αρκετά άκαμπτα (με στόχο τη μέγιστη
            ηχομόνωση) ή αν θα έπρεπε να χρησιμοποιηθεί υλικό τύπου γυψοσανίδας.
            Επιλέχθηκε η πρώτη προσέγγιση, γεγονός που οδήγησε στην εκτενή χρήση
            ειδικά κατασκευασμένων διαφραγματικών πάνελ. Η τελική προσαρμογή
            αποτελείται από διαφραγματικούς και πορώδεις απορροφητές.
          </p>
        </div>
      </div>
    </div>
  </section>
</MainLayout>

<style>
  .principles-content {
    background: #f8f8f9;
    padding: 1rem 0;
  }

  .principles-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .principle-section h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #1a1a1a;
  }

  .principle-image {
    width: 100%;
    height: 320px;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    display: block;
    object-fit: cover;
  }

  .principle-section p {
    font-size: 1rem;
    line-height: 1.7;
    color: #1a1a1a;
  }

  /* Mobile */
  @media (max-width: 768px) {
    .principles-content {
      padding: 0;
    }

    .principles-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    .principle-section h2 {
      font-size: 1.6rem;
      text-align: center;
    }

    .principle-section p {
      text-align: center;
    }
  }
</style>

```

## END: src\pages\gr\principles.astro

---

## START: src\pages\index.astro

```astro
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=/en/">
  <title>Critical Studio</title>
  <script>
    // Immediate redirect without showing content
    window.location.replace('/en/');
  </script>
  <style>
    body { margin: 0; padding: 0; background: #000; }
  </style>
</head>
<body>
  <!-- Empty body - user won't see this -->
</body>
</html>
```

## END: src\pages\index.astro

---

## START: src\styles\global.css

```css
/* Import Pico CSS */
@import "@picocss/pico";

/* CRITICAL: Remove all default margins/padding */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  margin: 0;
  padding: 0;
}

body {
  margin: 0 !important;
  padding: 0 !important;
}

body > footer,
body > header,
body > main {
  margin: 0;
  padding: 0;
}

html,
body,
header,
main,
section,
footer {
  background-color: #f8f8f9 !important;
  color: #1a1a1a !important;
}
/* Your existing custom overrides */
:root {
  --pico-primary: #6366f1;
  --pico-primary-hover: #4f46e5;
}

/* Custom styles for music studio */
.music-hero {
  text-align: center;
  padding: 2rem 0;
}

.track-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}
/* 
.container {
  min-height: calc(100vh - 482px);
} */

```

## END: src\styles\global.css

---

## Folder Structure: src

```
/src
├── components
│   ├── Navigation.vue
│   └── VueTest.vue
├── layouts
│   ├── BaseLayout.astro
│   └── MainLayout.astro
├── pages
│   ├── en
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── index.astro
│   │   ├── overview.astro
│   │   ├── performance.astro
│   │   └── principles.astro
│   ├── gr
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── index.astro
│   │   ├── overview.astro
│   │   ├── performance.astro
│   │   └── principles.astro
│   └── index.astro
└── styles
    └── global.css
```

