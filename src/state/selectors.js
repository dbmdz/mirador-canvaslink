import { getWindowConfig } from "mirador/dist/es/src/state/selectors";
import { createSelector } from "reselect";

const defaultConfig = {
  // Open the settings dialog
  dialogOpen: false,
  // Enable share plugin
  enabled: true,
  // Show the rights information defined in the manifest
  showRightsInformation: true,
  // Show only in single canvas view,
  singleCanvasOnly: false,
};

/** Selector to get text display options for a given window */
export const getCanvasLinkOptions = createSelector(
  [getWindowConfig],
  ({ canvasLink }) => ({
    ...defaultConfig,
    ...(canvasLink ?? {}),
  })
);
