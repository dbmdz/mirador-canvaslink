import { updateWindow } from "mirador/dist/es/src/state/actions";
import {
  getCanvases,
  getContainerId,
  getRights,
  getVisibleCanvases,
  getWindow,
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
    mapStateToProps: (state, { windowId }) => {
      const { manifestId, view: windowViewType } = getWindow(state, {
        windowId,
      });
      return {
        canvases: getCanvases(state, { windowId }),
        containerId: getContainerId(state),
        manifestId,
        visibleCanvases: getVisibleCanvases(state, { windowId }),
        config: getPluginConfig(state, { windowId }),
        rights: getRights(state, { windowId }),
        windowViewType,
      };
    },
    mode: "add",
    target: "Window",
  },
];
