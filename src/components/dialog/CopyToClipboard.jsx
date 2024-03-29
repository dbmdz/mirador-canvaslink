import InputAdornment from "@material-ui/core/InputAdornment";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { MiradorMenuButton } from "mirador/dist/es/src/components/MiradorMenuButton";
import PropTypes from "prop-types";
import React from "react";

const CopyToClipboard = ({ onCopy, supported, t }) => {
  if (!supported) {
    return null;
  }
  return (
    <InputAdornment position="end">
      <MiradorMenuButton
        aria-label={t("canvasLink.copyToClipboard")}
        edge="end"
        onClick={onCopy}
      >
        <FileCopyIcon fontSize="small" />
      </MiradorMenuButton>
    </InputAdornment>
  );
};

CopyToClipboard.propTypes = {
  onCopy: PropTypes.func.isRequired,
  supported: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default CopyToClipboard;
