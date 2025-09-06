<template>
  <div>Disabling preview mode...</div>
</template>

<script setup>
// Disable draft mode
const { $preview } = useNuxtApp();
await $preview.disable();

// Redirect to home
await navigateTo("/");
</script>
