import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { ScrollIndicatedDialogContent } from "mirador";
import PropTypes from "prop-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import CopyToClipboard from "./dialog/CopyToClipboard";
import RightsInformation from "./dialog/RightsInformation";
import ShareButton from "./dialog/ShareButton";

const supportsClipboard = "clipboard" in navigator;

const ShareCanvasLinkDialog = ({
  canvases,
  config,
  containerId,
  manifestId,
  visibleCanvases,
  label,
  rights,
  updateConfig,
  windowViewType,
}) => {
  const { dialogOpen, enabled, showRightsInformation, getCanvasLink } = config;
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const { t } = useTranslation();

  if (!enabled || !dialogOpen || visibleCanvases.length === 0) {
    return null;
  }
  const closeDialog = () =>
    updateConfig({
      ...config,
      dialogOpen: false,
    });
  const canvasLink = getCanvasLink({
    canvases,
    manifestId,
    visibleCanvases,
    windowViewType,
  });
  const getPreviewUrl = (width) =>
    `${visibleCanvases[0]?.imageServiceIds[0]}/full/${width},/0/default.jpg`;

  return (
    <Dialog
      container={document.querySelector(`#${containerId} .mirador-viewer`)}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      open={dialogOpen}
      onClose={closeDialog}
    >
      <DialogTitle>
        <Box fontWeight="fontWeightBold" component="span">
          {t("canvasLink.shareLink")}
        </Box>
      </DialogTitle>
      <ScrollIndicatedDialogContent dividers>
        {copiedToClipboard && (
          <Alert
            sx={{ mb: 1 }}
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
              />
            ),
            readOnly: true,
          }}
          size="small"
          value={canvasLink}
          variant="outlined"
        />
        {showRightsInformation && <RightsInformation rights={rights} />}
      </ScrollIndicatedDialogContent>
      <DialogActions
        sx={{
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <ButtonGroup
          sx={{
            flexWrap: "wrap",
          }}
        >
          {["envelope", "facebook", "pinterest", "x", "whatsapp"].map((p) => (
            <ShareButton
              canvasLink={canvasLink}
              key={p}
              label={label}
              provider={p}
              thumbnailUrl={getPreviewUrl(250)}
              title={t(`canvasLink.share.${p}`)}
            />
          ))}
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
  canvases: [],
  label: "",
  rights: [],
  visibleCanvases: [],
};

ShareCanvasLinkDialog.propTypes = {
  canvases: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
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
