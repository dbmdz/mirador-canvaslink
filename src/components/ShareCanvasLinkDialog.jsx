import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import ns from "mirador/dist/es/src/config/css-ns";
import ScrollIndicatedDialogContent from "mirador/dist/es/src/containers/ScrollIndicatedDialogContent";
import PropTypes from "prop-types";
import React, { useState } from "react";

import CopyToClipboard from "./dialog/CopyToClipboard";
import RightsInformation from "./dialog/RightsInformation";
import ShareButton from "./dialog/ShareButton";

const useStyles = makeStyles((theme) => ({
  actions: {
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  actionButtons: {
    flexWrap: "wrap",
  },
  alert: {
    marginBottom: theme.spacing(1),
  },
}));

const supportsClipboard = "clipboard" in navigator;

const ShareCanvasLinkDialog = ({
  config,
  containerId,
  manifestId,
  visibleCanvases,
  label,
  rights,
  t,
  updateConfig,
  windowViewType,
}) => {
  const { dialogOpen, enabled, showRightsInformation, getCanvasLink } = config;
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const { actions, actionButtons, alert } = useStyles();

  if (!enabled || !dialogOpen || visibleCanvases.length === 0) {
    return null;
  }
  const closeDialog = () =>
    updateConfig({
      ...config,
      dialogOpen: false,
    });
  const canvasLink = getCanvasLink({
    manifestId,
    visibleCanvases,
    windowViewType,
  });
  const getPreviewUrl = (width) =>
    `${visibleCanvases[0]?.imageServiceIds[0]}/full/${width},/0/default.jpg`;

  return (
    <Dialog
      container={document.querySelector(`#${containerId} .${ns("viewer")}`)}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      open={dialogOpen}
      onClose={closeDialog}
    >
      <DialogTitle disableTypography>
        <Typography variant="h4">
          <Box fontWeight="fontWeightBold">{t("canvasLink.shareLink")}</Box>
        </Typography>
      </DialogTitle>
      <ScrollIndicatedDialogContent dividers>
        {copiedToClipboard && (
          <Alert
            className={alert}
            closeText={t("canvasLink.close")}
            onClose={() => setCopiedToClipboard(false)}
            severity="success"
          >
            {t("canvasLink.copiedToClipboard")}
          </Alert>
        )}
        <TextField
          fullWidth
          InputProps={{
            endAdornment: (
              <CopyToClipboard
                onCopy={() => {
                  navigator.clipboard.writeText(canvasLink);
                  setCopiedToClipboard(true);
                  setTimeout(() => setCopiedToClipboard(false), 3000);
                }}
                supported={supportsClipboard}
                t={t}
              />
            ),
            readOnly: true,
          }}
          size="small"
          value={canvasLink}
          variant="outlined"
        />
        {showRightsInformation && <RightsInformation t={t} rights={rights} />}
      </ScrollIndicatedDialogContent>
      <DialogActions className={actions}>
        <ButtonGroup className={actionButtons}>
          {["envelope", "facebook", "pinterest", "twitter", "whatsapp"].map(
            (p) => (
              <ShareButton
                canvasLink={canvasLink}
                label={label}
                provider={p}
                thumbnailUrl={getPreviewUrl(250)}
                title={t(`canvasLink.share.${p}`)}
              />
            ),
          )}
        </ButtonGroup>
        <div style={{ flex: "1 0 0" }} />
        <Button color="primary" onClick={closeDialog}>
          {t("canvasLink.close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ShareCanvasLinkDialog.defaultProps = {
  label: "",
  rights: [],
  visibleCanvases: [],
};

ShareCanvasLinkDialog.propTypes = {
  config: PropTypes.shape({
    dialogOpen: PropTypes.bool.isRequired,
    enabled: PropTypes.bool.isRequired,
    showRightsInformation: PropTypes.bool.isRequired,
    getCanvasLink: PropTypes.func.isRequired,
  }).isRequired,
  containerId: PropTypes.string.isRequired,
  label: PropTypes.string,
  manifestId: PropTypes.string.isRequired,
  rights: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired,
  updateConfig: PropTypes.func.isRequired,
  visibleCanvases: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      imageServiceIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ),
  windowViewType: PropTypes.string.isRequired,
};

export default ShareCanvasLinkDialog;
