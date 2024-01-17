import Mirador from "mirador/dist/es/src/index";

import canvasLinkPlugin from "../../src";

const config = {
  catalog: [
    {
      manifestId:
        "https://api.digitale-sammlungen.de/iiif/presentation/v2/bsb00135902/manifest",
      provider: "Bavarian State Library",
    },
    {
      manifestId:
        "https://api.digitale-sammlungen.de/iiif/presentation/v2/bsb10532463_00005_u001/manifest",
      provider: "Bavarian State Library",
    },
    {
      manifestId:
        "https://api.digitale-sammlungen.de/iiif/presentation/v2/bsb00034024/manifest",
      provider: "Bavarian State Library",
    },
  ],
  id: "demo",
  window: {
    allowFullscreen: true,
    canvasLink: {
      active: true,
      enabled: true,
      singleCanvasOnly: false,
      getCanvasLink: ({ manifestId, visibleCanvases }) => {
        const objectId = manifestId.split("/").slice(-2)[0];
        const canvasIndices = visibleCanvases.map(
          (canvas) => canvas.id.split("/").slice(-1)[0],
        );
        return `https://digitale-sammlungen.de/view/${objectId}?page=${canvasIndices.join(
          ",",
        )}`;
      },
    },
  },
  windows: [
    {
      canvasIndex: 8,
      manifestId:
        "https://api.digitale-sammlungen.de/iiif/presentation/v2/bsb00034024/manifest",
      view: "single",
    },
  ],
};

Mirador.viewer(config, [...canvasLinkPlugin]);
