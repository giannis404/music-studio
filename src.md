# Code Digest

# Folder: src

---

## START: src\components\Navigation.vue

```vue
<template>
  <nav class="container-fluid">
    <ul>
      <li>
        <a href="/" class="logo">
          <strong>🎵 Critical Studio</strong>
        </a>
      </li>
    </ul>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/principles">Principles</a></li>
      <li><a href="/performance">Performance</a></li>
      <li><a href="/overview">Overview</a></li>
      <li><a href="/contact">Contact</a></li>
      <li>
        <!-- Language switcher -->
        <details class="dropdown">
          <summary>EN</summary>
          <ul dir="rtl">
            <li><a href="/en">English</a></li>
            <li><a href="/gr">Ελληνικά</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.logo {
  text-decoration: none !important;
}

.dropdown summary {
  cursor: pointer;
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
}

const { title, description } = Astro.props;
---

<BaseLayout title={title} description={description}>
  <header>
    <Navigation client:load />
  </header>
  
  <main class="container">
    <slot />
  </main>
  
  <footer class="container">
    <hr>
    <p style="text-align: center; color: var(--pico-muted-color);">
      © 2025 Music Studio.
    </p>
  </footer>
</BaseLayout>
```

## END: src\layouts\MainLayout.astro

---

## START: src\pages\about.astro

```astro
---
import MainLayout from '../layouts/MainLayout.astro';
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

## END: src\pages\about.astro

---

## START: src\pages\contact.astro

```astro
---
import MainLayout from '../layouts/MainLayout.astro';
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

## END: src\pages\contact.astro

---

## START: src\pages\index.astro

```astro
---
import MainLayout from '../layouts/MainLayout.astro';
---

<MainLayout title="Critical Studio - Professional Recording" description="Professional music recording studio with state-of-the-art acoustic engineering">
  
  <!-- Hero Section -->
  <section class="music-hero">
    <h1>Critical Studio</h1>
    <p>Professional recording studio with reference-quality acoustics.</p>
    <a href="/contact" role="button">Book a Session</a>
  </section>

  <!-- Quick Overview -->
  <section class="container">
    <div class="grid">
      <article>
        <h3>🏗️ Acoustic Design</h3>
        <p>Custom-built reference monitoring environment with precise acoustic treatment.</p>
        <a href="/principles">Learn More</a>
      </article>
      <article>
        <h3>📊 Performance</h3>
        <p>Measured and verified acoustic performance for professional recording.</p>
        <a href="/performance">View Data</a>
      </article>
      <article>
        <h3>🎛️ Professional Setup</h3>
        <p>State-of-the-art equipment in an acoustically optimized environment.</p>
        <a href="/overview">Studio Details</a>
      </article>
    </div>
  </section>

</MainLayout>
```

## END: src\pages\index.astro

---

## START: src\pages\overview.astro

```astro
---
import MainLayout from '../layouts/MainLayout.astro';
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

## END: src\pages\overview.astro

---

## START: src\pages\performance.astro

```astro
---
import MainLayout from '../layouts/MainLayout.astro';
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

## END: src\pages\performance.astro

---

## START: src\pages\principles.astro

```astro
---
import MainLayout from '../layouts/MainLayout.astro';
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

## END: src\pages\principles.astro

---

## START: src\styles\global.css

```css
/* Import Pico CSS */
@import "@picocss/pico";

/* Your custom overrides go here */
:root {
  /* Music studio color theme */
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
│   ├── about.astro
│   ├── contact.astro
│   ├── index.astro
│   ├── overview.astro
│   ├── performance.astro
│   └── principles.astro
└── styles
    └── global.css
```

