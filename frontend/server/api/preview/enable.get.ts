export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  // Get the secret and validate it
  const secret = query["sanity-preview-secret"];

  if (!secret) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing preview secret",
    });
  }

  // Set preview mode cookie
  setCookie(event, "sanity-preview", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  // Redirect to the page being previewed
  const pathname = query["sanity-preview-pathname"] || "/";
  return sendRedirect(event, pathname as string);
});
