<script setup>
const route = useRoute();
const config = useRuntimeConfig();

onMounted(() => {
  const secret = route.query["sanity-preview-secret"];
  const pathname = route.query["sanity-preview-pathname"] || "/";

  // Validate secret
  if (secret !== config.public.sanityPreviewSecret) {
    throw createError({ statusCode: 401, statusMessage: "Invalid secret" });
  }

  // Set preview cookie and redirect
  const previewCookie = useCookie("__sanity_preview", {
    maxAge: 60 * 60 * 24, // 24 hours
    sameSite: "none",
    secure: true,
  });

  previewCookie.value = "true";

  // Redirect to the page
  navigateTo(pathname);
});
</script>

<template>
  <div>Enabling preview mode...</div>
</template>
