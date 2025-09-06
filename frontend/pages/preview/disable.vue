<script setup>
const previewCookie = useCookie("__sanity_preview");
previewCookie.value = null;

await navigateTo("/");
</script>

<template>
  <div>Disabling preview mode...</div>
</template>
