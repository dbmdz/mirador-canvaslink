import { updateWindow } from "mirador/dist/es/src/state/actions";
import {
  getContainerId,
  getRights,
  getVisibleCanvases,
  getWindowManifests,
  getWindowViewType,
} from "mirador/dist/es/src/state/selectors";

import ShareCanvasLinkDialog from "./components/ShareCanvasLinkDialog";
import ShareControl from "./components/ShareControl";
import translations from "./locales";
import { getCanvasLinkOptions } from "./state/selectors";

export default [
  {
    component: ShareControl,
    config: {
      translations,
    },
    mapDispatchToProps: (dispatch, { windowId }) => ({
      updateOptions: (options) =>
        dispatch(updateWindow(windowId, { canvasLink: options })),
    }),
    mapStateToProps: (state, { windowId }) => ({
      containerId: getContainerId(state),
      options: getCanvasLinkOptions(state, { windowId }),
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
      updateOptions: (options) =>
        dispatch(updateWindow(windowId, { canvasLink: options })),
    }),
    mapStateToProps: (state, { windowId }) => ({
      containerId: getContainerId(state),
      manifestId: getWindowManifests(state, { windowId })[0],
      visibleCanvases: getVisibleCanvases(state, { windowId }),
      options: getCanvasLinkOptions(state, { windowId }),
      rights: getRights(state, { windowId }),
    }),
    mode: "add",
    target: "Window",
  },
];
