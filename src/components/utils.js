const getFacebookLink = (text, canvasLink) => {
  const url = new URL("/sharer/sharer.php", "https://www.facebook.com");
  url.searchParams.set("title", text);
  url.searchParams.set("u", canvasLink);
  return url.toString();
};

const getPinterestLink = (text, canvasLink, thumbnailUrl) => {
  const url = new URL("/pin/create/bookmarklet", "https://pinterest.com");
  url.searchParams.set("description", text);
  url.searchParams.set("url", canvasLink);
  url.searchParams.set("media", thumbnailUrl);
  return url.toString();
};

const getXLink = (text, canvasLink) => {
  const url = new URL("/intent/post", "https://x.com");
  url.searchParams.set(
    "text",
    text.length > 60 ? `${text.substring(0, 60)}...` : text,
  );
  url.searchParams.set("url", canvasLink);
  url.searchParams.set("hashtags", "iiif");
  return url.toString();
};

/** Constructs a share link for the given content and provider */
const getShareLink = (
  attribution,
  canvasLink,
  label,
  provider,
  thumbnailUrl,
) => {
  let text = label;
  if (attribution) {
    text += ` (${attribution})`;
  }
  switch (provider) {
    case "envelope":
      return `mailto:?subject=${text}&body=${text}: ${canvasLink}`;
    case "facebook":
      return getFacebookLink(text, canvasLink);
    case "pinterest":
      return getPinterestLink(text, canvasLink, thumbnailUrl);
    case "whatsapp":
      return `whatsapp://send?text=${text}: ${canvasLink}`;
    case "x":
      return getXLink(text, canvasLink);
    default:
      return null;
  }
};

export { getShareLink };
