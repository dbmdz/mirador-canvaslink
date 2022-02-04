import { updateWindow } from "mirador/dist/es/src/state/actions";
import {
  getContainerId,
  getCurrentCanvas,
  getRequiredStatement,
  getRights,
  getWindowViewType,
} from "mirador/dist/es/src/state/selectors";
import translations from "./locales";
import ShareCanvasLink from './components/ShareCanvasLink';
import ShareControl from './components/ShareControl';
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
     
    }),
    mode: "add",
    target: "WindowTopBarPluginArea",
  },
  {
    component: ShareCanvasLink,
    config: {
      translations,
    },
    mapDispatchToProps: (dispatch, { windowId }) => ({
      updateOptions: (options) =>
        dispatch(updateWindow(windowId, { canvasLink: options })),
    }),
    mapStateToProps: (state, { windowId }) => ({
      containerId: getContainerId(state),
      currentCanvas: getCurrentCanvas(state, { windowId }),
      options: getCanvasLinkOptions(state, { windowId }),
    }),
    mode: "add",
    target: "Window",
  },

];

