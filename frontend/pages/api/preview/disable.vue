<script setup>
onMounted(() => {
  // Clear preview cookie
  const previewCookie = useCookie("__sanity_preview");
  previewCookie.value = null;

  // Redirect to home
  navigateTo("/");
});
</script>

<template>
  <div>Disabling preview mode...</div>
</template>
