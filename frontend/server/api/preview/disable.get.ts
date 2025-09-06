export default defineEventHandler(async (event) => {
  // Remove preview mode cookie
  deleteCookie(event, "sanity-preview");

  // Redirect to home
  return sendRedirect(event, "/");
});
