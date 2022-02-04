import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CopyToClipboard from "./CopyToClipboard";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import ShareButton from "./ShareButton";
import ScrollIndicatedDialogContent from "mirador/dist/es/src/containers/ScrollIndicatedDialogContent";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import PropTypes from "prop-types";
import React, { useRef, useState } from "react";


const ShareCanvasLink = ({
    currentCanvas,
    options,
    label,
    t,
    updateOptions,
}) => {
const { dialogOpen } = options;
const inputRef = useRef();
const [quality, setQuality] = useState("default");
const [rotation, setRotation] = useState(0);
/*const [size, setSize] = useState(100); */
const supportsClipboard = "clipboard" in navigator;
//const imageUrl = `${currentCanvas.imageServiceIds[0]}/full/pct:${size}/${rotation}/${quality}.jpg`;
const imageUrl = `${currentCanvas.id}/view`;
const getPreviewUrl = (width) =>
    `${currentCanvas.imageServiceIds[0]}/full/${width},/${rotation}/${quality}.jpg`;
const closeDialog = () =>
      updateOptions({
        ...options,
        dialogOpen: false,
      });

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
          <Box fontWeight="fontWeightBold">
            {t("canvasLink.shareLink")}
          </Box>
        </Typography>
      </DialogTitle>
      <ScrollIndicatedDialogContent dividers>
      <TextField
          fullWidth
          InputProps={{
            endAdornment: (
              <CopyToClipboard
                onCopy={() => {
                  inputRef?.current?.select();
                  navigator.clipboard.writeText(imageUrl);
                }}
                supported={supportsClipboard}
                t={t}
              />
            ),
            readOnly: true,
          }}
          inputRef={inputRef}
          size="small"
          value={imageUrl}
          variant="outlined"
        />
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
          {t("canvasLink.closeDialog")}
        </Button>
      </DialogActions>
   </Dialog>
);
};

ShareCanvasLink.PropTypes = {
    currentCanvas:PropTypes.shape({
        imageServiceIds: PropTypes.arrayOf(PropTypes.string).isRequired,    
    }).isRequired, 
    //currentCanvas: PropTypes.object.isRequired,
    options: PropTypes.shape({
      active: PropTypes.bool.isRequired,
      enabled: PropTypes.bool.isRequired,
    }).isRequired,
    label: PropTypes.string.isRequired,
    updateOptions: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

ShareCanvasLink.defaultProps = {

};

export default ShareCanvasLink;
