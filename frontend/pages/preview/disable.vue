<script setup>
// Clear preview cookie
const previewCookie = useCookie("__sanity_preview");
previewCookie.value = null;

// Redirect to home
await navigateTo("/");
</script>

<template>
  <div>Disabling preview...</div>
</template>
