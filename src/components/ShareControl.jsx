import ShareIcon from "@mui/icons-material/Share";
import { MiradorMenuButton } from "mirador";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const ShareControl = ({ config, updateConfig, windowViewType }) => {
  const { dialogOpen, enabled, singleCanvasOnly } = config || {};
  const { t } = useTranslation();
  if (
    !enabled ||
    // Only show in single canvas view if configured
    (singleCanvasOnly && windowViewType !== "single") ||
    // Never show in gallery view
    windowViewType === "gallery"
  ) {
    return null;
  }
  return (
    <MiradorMenuButton
      aria-expanded={dialogOpen}
      aria-label={t("canvasLink.shareLink")}
      onClick={() =>
        updateConfig({
          ...config,
          dialogOpen: !dialogOpen,
        })
      }
    >
      <ShareIcon />
    </MiradorMenuButton>
  );
};

ShareControl.propTypes = {
  config: PropTypes.shape({
    dialogOpen: PropTypes.bool.isRequired,
    enabled: PropTypes.bool.isRequired,
    singleCanvasOnly: PropTypes.bool.isRequired,
  }).isRequired,
  updateConfig: PropTypes.func.isRequired,
  windowViewType: PropTypes.string.isRequired,
};

export default ShareControl;
