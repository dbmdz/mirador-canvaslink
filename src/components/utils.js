export function getShareLink(
  attribution,
  canvasLink,
  label,
  provider,
  thumbnailUrl
) {
  let text = label;
  if (attribution) {
    text += ` (${attribution})`;
  }
  switch (provider) {
    case "envelope":
      return `mailto:?subject=${text}&body=${text}: ${canvasLink}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?title=${text}&u=${canvasLink}`;
    case "pinterest":
      return `http://pinterest.com/pin/create/bookmarklet/?url=${canvasLink}&description=${text}&media=${thumbnailUrl}`;
    case "twitter":
      return `https://twitter.com/intent/tweet?text=${
        text.length > 60 ? `${text.substring(0, 60)}...` : text
      }&url=${canvasLink}&hashtags=iiif`;
    case "whatsapp":
      return `whatsapp://send?text=${text}: ${canvasLink}`;
    default:
      return null;
  }
}
