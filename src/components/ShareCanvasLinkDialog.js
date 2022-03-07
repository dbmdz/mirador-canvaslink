import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import ScrollIndicatedDialogContent from "mirador/dist/es/src/containers/ScrollIndicatedDialogContent";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";

import CopyToClipboard from "./CopyToClipboard";
import RightsInformation from "./RightsInformation";
import ShareButton from "./ShareButton";
import makeStyles from "@material-ui/core/styles/makeStyles";

const supportsClipboard = "clipboard" in navigator;

const ShareCanvasLinkDialog = ({
  currentCanvas,
  label,
  options,
  rights,
  t,
  updateOptions,
}) => {
  const { dialogOpen, enabled, showRightsInformation } = options;
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  if (!enabled || !dialogOpen || !currentCanvas) {
    return null;
  }
  const closeDialog = () =>
    updateOptions({
      ...options,
      dialogOpen: false,
    });
  const imageUrl = `${currentCanvas?.id}/view`;
  const getPreviewUrl = (width) =>
    `${currentCanvas?.imageServiceIds[0]}/full/${width},/0/default.jpg`;
  const useStyles = makeStyles((theme) => ({
    alert: {
      marginBottom: theme.spacing(1),
    },
  }));
  return (
    <Dialog
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
                  navigator.clipboard.writeText(imageUrl);
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
          value={imageUrl}
          variant="outlined"
        />
        {showRightsInformation && <RightsInformation t={t} rights={rights} />}
      </ScrollIndicatedDialogContent>
      <DialogActions>
        {["envelope", "facebook", "pinterest", "twitter", "whatsapp"].map(
          (p) => (
            <ShareButton
              imageUrl={imageUrl}
              label={label}
              provider={p}
              thumbnailUrl={getPreviewUrl(250)}
              title={t(`canvasLink.share.${p}`)}
            />
          )
        )}
        <div style={{ flex: "1 0 0" }} />
        <Button color="primary" onClick={closeDialog}>
          {t("canvasLink.close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ShareCanvasLinkDialog.propTypes = {
  currentCanvas: PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageServiceIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  label: PropTypes.string.isRequired,
  options: PropTypes.shape({
    dialogOpen: PropTypes.bool.isRequired,
    enabled: PropTypes.bool.isRequired,
    showRightsInformation: PropTypes.bool.isRequired,
  }).isRequired,
  rights: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired,
  updateOptions: PropTypes.func.isRequired,
};

ShareCanvasLinkDialog.defaultProps = {
  currentCanvas: undefined,
  rights: [],
};

export default ShareCanvasLinkDialog;
