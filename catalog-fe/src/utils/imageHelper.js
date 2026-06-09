export function getImageUrl(path) {
  if (!path) return null;

  let cleanPath = path;

  // Detect and strip localhost or 127.0.0.1 domain
  if (cleanPath.startsWith("http")) {
    try {
      const url = new URL(cleanPath);
      if (
        url.hostname === "localhost" ||
        url.hostname === "127.0.0.1" ||
        url.hostname.includes("127.0.0.1") ||
        url.hostname.includes("localhost")
      ) {
        cleanPath = url.pathname;
      } else {
        return cleanPath;
      }
    } catch (e) {
      cleanPath = cleanPath.replace(/https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/gi, "");
    }
  }

  // Remove leading slash
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.substring(1);
  }

  // Remove leading storage/ if present
  if (cleanPath.startsWith('storage/')) {
    cleanPath = cleanPath.substring(8);
  }

  const baseUrl =
    import.meta.env.VITE_API_BASE_URL ||
    "https://api.bizponsel.com";

  return `${baseUrl}/storage/${cleanPath}`;
}
