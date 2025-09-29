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
