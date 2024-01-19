import { updateWindow } from "mirador/dist/es/src/state/actions";
import {
  getCanvases,
  getContainerId,
  getRights,
  getVisibleCanvases,
  getWindowManifests,
  getWindowViewType,
} from "mirador/dist/es/src/state/selectors";

import ShareCanvasLinkDialog from "./components/ShareCanvasLinkDialog";
import ShareControl from "./components/ShareControl";
import translations from "./locales";
import { getPluginConfig } from "./state/selectors";

export default [
  {
    component: ShareControl,
    config: {
      translations,
    },
    mapDispatchToProps: (dispatch, { windowId }) => ({
      updateConfig: (canvasLink) =>
        dispatch(updateWindow(windowId, { canvasLink })),
    }),
    mapStateToProps: (state, { windowId }) => ({
      containerId: getContainerId(state),
      config: getPluginConfig(state, { windowId }),
      windowViewType: getWindowViewType(state, { windowId }),
    }),
    mode: "add",
    target: "WindowTopBarPluginArea",
  },
  {
    component: ShareCanvasLinkDialog,
    config: {
      translations,
    },
    mapDispatchToProps: (dispatch, { windowId }) => ({
      updateConfig: (canvasLink) =>
        dispatch(updateWindow(windowId, { canvasLink })),
    }),
    mapStateToProps: (state, { windowId }) => ({
      canvases: getCanvases(state, { windowId }),
      containerId: getContainerId(state),
      manifestId: getWindowManifests(state, { windowId })[0],
      visibleCanvases: getVisibleCanvases(state, { windowId }),
      config: getPluginConfig(state, { windowId }),
      rights: getRights(state, { windowId }),
      windowViewType: getWindowViewType(state, { windowId }),
    }),
    mode: "add",
    target: "Window",
  },
];
