import CropIcon from "@material-ui/icons/Crop";
import { MiradorMenuButton } from "mirador/dist/es/src/components/MiradorMenuButton";
import PropTypes from "prop-types";
import React from "react";

import ShareIcon from "@material-ui/icons/Share";
const ShareControl = ({
  containerId,
  options,
  t,
  updateOptions,
}) => {
  const { active, dialogOpen } = options;
  return (
    <MiradorMenuButton
      aria-expanded={active}
      aria-haspopup
      aria-label={
        active ? t("canvasLink.deactivate") : t("canvasLink.activate")
      }
      color={active ? "primary" : ""}
      containerId={containerId}
      onClick={() =>
        updateOptions({
          ...options,
          active: !active,
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
    active: PropTypes.bool.isRequired,
    enabled: PropTypes.bool.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
  updateOptions: PropTypes.func.isRequired,
};

export default ShareControl;
