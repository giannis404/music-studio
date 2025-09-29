<template>
  <nav
    class="container-fluid"
    :class="{ 'nav-home': isHomePage, 'nav-other': !isHomePage }"
  >
    <ul>
      <li>
        <a :href="localePath('/')" class="logo">
          <!-- <img
            src="/images/logo-yellow.png"
            style="height: 120px; position: absolute; top: 0; left: 24px"
          /> -->
          <img
            src="/images/logo-yellow.png"
            style="
              position: absolute;
              top: 0;
              left: 24px;
              height: auto;
              max-height: 100px;
              width: auto;
              max-width: 100%;
            "
          />
        </a>
      </li>
    </ul>
    <ul>
      <li>
        <a :href="localePath('/')">{{ t.nav.home }}</a>
      </li>
      <li>
        <a :href="localePath('/about')">{{ t.nav.about }}</a>
      </li>
      <li>
        <a :href="localePath('/principles')">{{ t.nav.principles }}</a>
      </li>
      <li>
        <a :href="localePath('/performance')">{{ t.nav.performance }}</a>
      </li>
      <li>
        <a :href="localePath('/overview')">{{ t.nav.overview }}</a>
      </li>
      <li>
        <a :href="localePath('/contact')">{{ t.nav.contact }}</a>
      </li>
      <li>
        <!-- Language switcher -->
        <details class="dropdown">
          <summary>{{ currentLang === "gr" ? "GR" : "EN" }}</summary>
          <ul dir="rtl">
            <li><a :href="switchLanguageUrl('en')">English</a></li>
            <li><a :href="switchLanguageUrl('gr')">Ελληνικά</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";

// Current language detection
const currentLang = ref("en");
const currentPath = ref("");

// Check if we're on home page
const isHomePage = computed(() => {
  const path = currentPath.value;
  return path === "/en/" || path === "/gr/" || path === "/en" || path === "/gr";
});

// Translations (keep your existing translations)
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

// Helper functions (keep your existing functions)
const localePath = (path) => {
  return `/${currentLang.value}${path === "/" ? "/" : path}`;
};

const switchLanguageUrl = (targetLang) => {
  const path = currentPath.value.replace(/^\/(en|gr)/, "") || "/";
  return `/${targetLang}${path === "/" ? "/" : path}`;
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
  }
});
</script>

<style scoped>
.logo {
  text-decoration: none !important;
}

.dropdown summary {
  cursor: pointer;
}

/* BASE NAVIGATION STYLES */
nav.container-fluid {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 0;
  border: none !important;
  box-shadow: none !important;
  height: 130px; /* Explicit height */
}

/* HOME PAGE - Transparent over hero */
nav.nav-home {
  backdrop-filter: none !important;
}

nav.nav-home a[href] {
  color: white !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

nav.nav-home a[href]:hover {
  color: #42c5be !important;
}

nav.nav-home .dropdown summary {
  color: white !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

/* OTHER PAGES - Black background */
nav.nav-other {
  background: rgba(0, 0, 0, 0.95) !important;
  backdrop-filter: none !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

nav.nav-other a[href] {
  color: white !important;
  text-shadow: none;
}

nav.nav-other a[href]:hover {
  color: #42c5be !important;
}

nav.nav-other .dropdown summary {
  color: white !important;
  text-shadow: none;
}

/* DROPDOWN STYLES */
.dropdown ul {
  background: rgba(0, 0, 0, 0.9) !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dropdown ul a {
  color: white !important;
  text-shadow: none;
}

.dropdown ul a:hover {
  color: #42c5be !important;
}

/* GENERAL STYLES */
nav a[href] {
  font-weight: 500;
  transition: color 0.2s ease;
}
</style>
