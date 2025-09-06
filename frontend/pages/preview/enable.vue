<script setup>
const route = useRoute();
const pathname = route.query["sanity-preview-pathname"] || "/";

// Set preview cookie
const previewCookie = useCookie("__sanity_preview", {
  maxAge: 60 * 60 * 24,
  sameSite: "lax",
});

previewCookie.value = "true";

// Redirect to the target page
await navigateTo(pathname);
</script>

<template>
  <div>Enabling preview mode...</div>
</template>
