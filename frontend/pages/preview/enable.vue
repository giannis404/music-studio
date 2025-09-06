<template>
  <div>Enabling preview mode...</div>
</template>

<script setup>
// Enable draft mode
const { $preview } = useNuxtApp();
await $preview.enable();

// Redirect to the page being previewed
const route = useRoute();
const pathname = route.query["sanity-preview-pathname"] || "/";
await navigateTo(pathname);
</script>
