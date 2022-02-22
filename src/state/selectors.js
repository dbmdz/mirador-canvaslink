import { getWindowConfig } from "mirador/dist/es/src/state/selectors";
import { createSelector } from "reselect";

const defaultConfig = {
  // Open the settings dialog
  dialogOpen: false,
  // Enable share plugin
  enabled: true,
};

/** Selector to get text display options for a given window */
export const getCanvasLinkOptions = createSelector(
  [getWindowConfig],
  ({ canvasLink }) => ({
    ...defaultConfig,
    ...(canvasLink ?? {}),
  })
);
