# Code Digest

# Folder: src

---

## START: src\components\Navigation.vue

```vue
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
import BaseLayout from './BaseLayout.astro';
import Navigation from '../components/Navigation.vue';

export interface Props {
  title: string;
  description?: string;
  hideFooter?: boolean;
  isHomePage?: boolean; // Defaults to false - most pages are NOT home
}

const { title, description, hideFooter = false, isHomePage = false } = Astro.props;
---

<BaseLayout title={title} description={description}>
  <header>
    <Navigation client:load />
  </header>
  
  <!-- Default behavior: add padding (for non-home pages) -->
  <main class={!isHomePage ? 'main-with-nav' : ''}>
    <slot />
  </main>
  
  <!-- Default behavior: show footer (unless explicitly hidden) -->
  {!hideFooter && (
    <footer class="container">
      <hr>
      <p style="text-align: center; color: var(--pico-muted-color);">
        © 2025 Critical Studio.
      </p>
    </footer>
  )}
</BaseLayout>

<style>
/* Default: push content down for non-home pages */
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
import MainLayout from '../../layouts/MainLayout.astro';
---

<MainLayout title="About - Critical Studio" description="About Critical Studio and our mission">
  <section class="container">
    <h1>About Critical Studio</h1>
    <p>Professional recording studio with state-of-the-art acoustics and equipment.</p>
    <div style="background: var(--pico-muted-background-color); padding: 2rem; border-radius: 8px; margin: 2rem 0;">
      <h3>🚧 Coming Soon</h3>
      <p>Studio story, team information, and mission details will be added here.</p>
    </div>
  </section>
</MainLayout>
```

## END: src\pages\en\about.astro

---

## START: src\pages\en\contact.astro

```astro
---
import MainLayout from '../../layouts/MainLayout.astro';
---

<MainLayout title="Contact - Critical Studio" description="Contact Critical Studio for bookings">
  <section class="container">
    <h1>Contact Critical Studio</h1>
    <div class="grid">
      <div>
        <h2>For acoustic consulting or booking the place</h2>
        <p><strong>Email:</strong> info@criticalstudio.eu</p>
        <p><strong>Location:</strong> Close to Corinth canal</p>
      </div>
      <div>
        <form>
          <div class="grid">
            <input type="text" placeholder="First Name" required>
            <input type="text" placeholder="Last Name" required>
          </div>
          <input type="email" placeholder="Email *" required>
          <textarea placeholder="Message" rows="5"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  </section>
</MainLayout>
```

## END: src\pages\en\contact.astro

---

## START: src\pages\en\index.astro

```astro
---
import MainLayout from '../../layouts/MainLayout.astro';
---

<MainLayout title="Critical Studio - Professional Recording" description="Reference shoebox-style recording studio near Corinth canal" isHomePage={true} hideFooter={true}>
  
  <!-- Full Hero Section starts from absolute top -->
  <section class="hero-section">
    <div class="hero-content">
      <p class="hero-subtitle">A reference shoebox-style interior suitable for top-notch audio recording, production and reproduction.</p>
      <p class="hero-location">Located in an autonomous building near Corinth canal</p>
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
                    url('/images/studio-hero-bg.jpg');
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
  color: #42C5BE;
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
  background: #42C5BE;
  border-color: #42C5BE;
  color: white;
}
</style>
```

## END: src\pages\en\index.astro

---

## START: src\pages\en\overview.astro

```astro
---
import MainLayout from '../../layouts/MainLayout.astro';
---

<MainLayout title="Overview - Critical Studio" description="Complete overview of studio capabilities">
  <section class="container">
    <h1>Studio Overview</h1>
    <p>Complete overview of our studio capabilities, equipment, and booking information.</p>
    <div style="background: var(--pico-muted-background-color); padding: 2rem; border-radius: 8px; margin: 2rem 0;">
      <h3>🎛️ Studio Features</h3>
      <p>Equipment list, room configurations, and studio capabilities overview will be added here.</p>
      <ul>
        <li>Recording capabilities</li>
        <li>Monitoring systems</li>
        <li>Available equipment</li>
        <li>Room configurations</li>
      </ul>
    </div>
  </section>
</MainLayout>
```

## END: src\pages\en\overview.astro

---

## START: src\pages\en\performance.astro

```astro
---
import MainLayout from '../../layouts/MainLayout.astro';
---

<MainLayout title="Performance - Critical Studio" description="Studio performance and acoustic measurements">
  <section class="container">
    <h1>Studio Performance</h1>
    <p>Detailed acoustic measurements and performance analysis of our recording environment.</p>
    <div style="background: var(--pico-muted-background-color); padding: 2rem; border-radius: 8px; margin: 2rem 0;">
      <h3>📊 Acoustic Data</h3>
      <p>Modal response charts, frequency analysis, and reverberation time measurements will be displayed here.</p>
      <ul>
        <li>Modal decay analysis</li>
        <li>Frequency response curves</li>
        <li>RT60 measurements</li>
        <li>Background noise levels</li>
      </ul>
    </div>
  </section>
</MainLayout>
```

## END: src\pages\en\performance.astro

---

## START: src\pages\en\principles.astro

```astro
---
import MainLayout from '../../layouts/MainLayout.astro';
---

<MainLayout title="Principles - Critical Studio" description="Acoustic principles and studio design">
  <section class="container">
    <h1>Acoustic Principles</h1>
    <p>The technical foundation behind our studio design and acoustic engineering.</p>
    <div style="background: var(--pico-muted-background-color); padding: 2rem; border-radius: 8px; margin: 2rem 0;">
      <h3>🔧 Technical Details</h3>
      <p>Insulation, room acoustics, membrane absorbers, and acoustic treatment details will be added here.</p>
      <ul>
        <li>Double-cell construction</li>
        <li>Custom membrane absorbers</li>
        <li>Frequency response optimization</li>
        <li>Modal analysis and treatment</li>
      </ul>
    </div>
  </section>
</MainLayout>
```

## END: src\pages\en\principles.astro

---

## START: src\pages\gr\about.astro

```astro
---
import MainLayout from '../../layouts/MainLayout.astro';
---

<MainLayout title="Σχετικά - Critical Studio" description="Σχετικά με το Critical Studio και την αποστολή μας">
  <section class="container">
    <h1>Σχετικά με το Critical Studio</h1>
    <p>Επαγγελματικό στούντιο ηχογράφησης με ακουστική και εξοπλισμό αιχμής.</p>
    <div style="background: var(--pico-muted-background-color); padding: 2rem; border-radius: 8px; margin: 2rem 0;">
      <h3>🚧 Έρχεται Σύντομα</h3>
      <p>Η ιστορία του στούντιο, πληροφορίες ομάδας και λεπτομέρειες αποστολής θα προστεθούν εδώ.</p>
    </div>
  </section>
</MainLayout>
```

## END: src\pages\gr\about.astro

---

## START: src\pages\gr\contact.astro

```astro
---
import MainLayout from '../../layouts/MainLayout.astro';
---

<MainLayout title="Contact - Critical Studio" description="Contact Critical Studio for bookings">
  <section class="container">
    <h1>Contact Critical Studio</h1>
    <div class="grid">
      <div>
        <h2>For acoustic consulting or booking the place</h2>
        <p><strong>Email:</strong> info@criticalstudio.eu</p>
        <p><strong>Location:</strong> Close to Corinth canal</p>
      </div>
      <div>
        <form>
          <div class="grid">
            <input type="text" placeholder="First Name" required>
            <input type="text" placeholder="Last Name" required>
          </div>
          <input type="email" placeholder="Email *" required>
          <textarea placeholder="Message" rows="5"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  </section>
</MainLayout>
```

## END: src\pages\gr\contact.astro

---

## START: src\pages\gr\index.astro

```astro
---
import MainLayout from '../../layouts/MainLayout.astro';
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
      <p class="hero-subtitle">Ένα εσωτερικό αναφοράς shoebox-style κατάλληλο για κορυφαία ηχογράφηση, παραγωγή και αναπαραγωγή ήχου.</p>
      <p class="hero-location">Στεγάζεται σε αυτόνομο κτίριο κοντά στη διώρυγα Κορίνθου</p>
      <a href="/gr/contact" class="hero-cta">ΕΠΙΚΟΙΝΩΝΙΑ</a>
    </div>
  </section>

  <!-- Professional Features Section -->
  <section class="features-section">
    <div class="container">
      <h2>Επαγγελματικό Περιβάλλον Ήχου</h2>
      <div class="features-grid">
        <article class="feature-card">
          <div class="feature-icon">🏗️</div>
          <h3>Ακουστική Μηχανική</h3>
          <p>Σχεδιασμός αναφοράς shoebox με ακριβή ακουστική επεξεργασία για βέλτιστες συνθήκες ηχογράφησης.</p>
          <a href="/gr/principles" class="feature-link">Μάθετε Περισσότερα →</a>
        </article>
        <article class="feature-card">
          <div class="feature-icon">📊</div>
          <h3>Μετρημένη Απόδοση</h3>
          <p>Επιβεβαιωμένα δεδομένα ακουστικής απόδοσης που εξασφαλίζουν επαγγελματικά πρότυπα ηχογράφησης.</p>
          <a href="/gr/performance" class="feature-link">Δείτε Δεδομένα →</a>
        </article>
        <article class="feature-card">
          <div class="feature-icon">🎛️</div>
          <h3>Επαγγελματική Εγκατάσταση</h3>
          <p>Εξοπλισμός αιχμής σε ακουστικά βελτιστοποιημένο αυτόνομο κτίριο.</p>
          <a href="/gr/overview" class="feature-link">Λεπτομέρειες Στούντιο →</a>
        </article>
      </div>
    </div>
  </section>

</MainLayout>

<style>
/* Copy the exact same styles from English page */
.hero-section {
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), 
                    url('/images/studio-hero-bg.jpg');
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
  color: #42C5BE;
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
  background: #42C5BE;
  border-color: #42C5BE;
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
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
  color: #42C5BE;
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
import MainLayout from '../../layouts/MainLayout.astro';
---

<MainLayout title="Overview - Critical Studio" description="Complete overview of studio capabilities">
  <section class="container">
    <h1>Studio Overview</h1>
    <p>Complete overview of our studio capabilities, equipment, and booking information.</p>
    <div style="background: var(--pico-muted-background-color); padding: 2rem; border-radius: 8px; margin: 2rem 0;">
      <h3>🎛️ Studio Features</h3>
      <p>Equipment list, room configurations, and studio capabilities overview will be added here.</p>
      <ul>
        <li>Recording capabilities</li>
        <li>Monitoring systems</li>
        <li>Available equipment</li>
        <li>Room configurations</li>
      </ul>
    </div>
  </section>
</MainLayout>
```

## END: src\pages\gr\overview.astro

---

## START: src\pages\gr\performance.astro

```astro
---
import MainLayout from '../../layouts/MainLayout.astro';
---

<MainLayout title="Performance - Critical Studio" description="Studio performance and acoustic measurements">
  <section class="container">
    <h1>Studio Performance</h1>
    <p>Detailed acoustic measurements and performance analysis of our recording environment.</p>
    <div style="background: var(--pico-muted-background-color); padding: 2rem; border-radius: 8px; margin: 2rem 0;">
      <h3>📊 Acoustic Data</h3>
      <p>Modal response charts, frequency analysis, and reverberation time measurements will be displayed here.</p>
      <ul>
        <li>Modal decay analysis</li>
        <li>Frequency response curves</li>
        <li>RT60 measurements</li>
        <li>Background noise levels</li>
      </ul>
    </div>
  </section>
</MainLayout>
```

## END: src\pages\gr\performance.astro

---

## START: src\pages\gr\principles.astro

```astro
---
import MainLayout from '../../layouts/MainLayout.astro';
---

<MainLayout title="Principles - Critical Studio" description="Acoustic principles and studio design">
  <section class="container">
    <h1>Acoustic Principles</h1>
    <p>The technical foundation behind our studio design and acoustic engineering.</p>
    <div style="background: var(--pico-muted-background-color); padding: 2rem; border-radius: 8px; margin: 2rem 0;">
      <h3>🔧 Technical Details</h3>
      <p>Insulation, room acoustics, membrane absorbers, and acoustic treatment details will be added here.</p>
      <ul>
        <li>Double-cell construction</li>
        <li>Custom membrane absorbers</li>
        <li>Frequency response optimization</li>
        <li>Modal analysis and treatment</li>
      </ul>
    </div>
  </section>
</MainLayout>
```

## END: src\pages\gr\principles.astro

---

## START: src\pages\index.astro

```astro
---
// Root redirect to /en/
return Astro.redirect('/en/');
---
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

