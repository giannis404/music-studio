<script setup>
const route = useRoute();
const config = useRuntimeConfig();

// Get parameters from URL
const secret = route.query["sanity-preview-secret"];
const pathname = route.query["sanity-preview-pathname"] || "/";

// Set preview cookie
const previewCookie = useCookie("__sanity_preview", {
  maxAge: 60 * 60 * 24, // 24 hours
  sameSite: "lax",
});

previewCookie.value = "true";

// Redirect to the page
await navigateTo(pathname);
</script>

<template>
  <div>Enabling preview...</div>
</template>
