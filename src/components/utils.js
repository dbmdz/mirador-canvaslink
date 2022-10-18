export function getShareLink(
  attribution,
  imageUrl,
  provider,
  thumbnailUrl,
  label = ""
) {
  let text = label;
  if (attribution) {
    text += ` (${attribution})`;
  }
  switch (provider) {
    case "envelope":
      return `mailto:?subject=${text}&body=${text}: ${imageUrl}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?title=${text}&u=${imageUrl}`;
    case "pinterest":
      return `http://pinterest.com/pin/create/bookmarklet/?url=${imageUrl}&description=${text}&media=${thumbnailUrl}`;
    case "twitter":
      return `https://twitter.com/intent/tweet?text=${
        text.length > 60 ? `${text.substring(0, 60)}...` : text
      }&url=${imageUrl}&hashtags=iiif`;
    case "whatsapp":
      return `whatsapp://send?text=${text}: ${imageUrl}`;
    default:
      return null;
  }
}
