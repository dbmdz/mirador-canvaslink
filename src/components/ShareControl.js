import ShareIcon from "@material-ui/icons/Share";
import { MiradorMenuButton } from "mirador/dist/es/src/components/MiradorMenuButton";
import PropTypes from "prop-types";
import React from "react";

const ShareControl = ({ containerId, options, t, updateOptions }) => {
  const { dialogOpen, enabled } = options;
  if (!enabled) {
    return null;
  }
  return (
    <MiradorMenuButton
      aria-expanded={dialogOpen}
      aria-label={t("canvasLink.shareLink")}
      containerId={containerId}
      onClick={() =>
        updateOptions({
          ...options,
          dialogOpen: !dialogOpen,
        })
      }
    >
      <ShareIcon />
    </MiradorMenuButton>
  );
};

ShareControl.propTypes = {
  containerId: PropTypes.string.isRequired,
  options: PropTypes.shape({
    dialogOpen: PropTypes.bool.isRequired,
    enabled: PropTypes.bool.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
  updateOptions: PropTypes.func.isRequired,
};

export default ShareControl;
