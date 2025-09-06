<!-- frontend/pages/preview/enable.vue -->
<script setup>
// Get the query parameters that Sanity sends
const route = useRoute();
const { $sanity } = useNuxtApp();

// Enable preview with the secret from Sanity
if (process.client) {
  const secret = route.query["sanity-preview-secret"];
  const perspective = route.query["sanity-preview-perspective"];
  const pathname = route.query["sanity-preview-pathname"] || "/";

  if (secret) {
    // Enable preview mode with the secret
    await $sanity.preview.enable(secret);
    // Redirect to the target page
    await navigateTo(pathname);
  } else {
    // No secret, just redirect home
    await navigateTo("/");
  }
}
</script>

<template>
  <div>Enabling preview mode...</div>
</template>
