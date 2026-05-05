import FileCopyIcon from "@mui/icons-material/FileCopy";
import InputAdornment from "@mui/material/InputAdornment";
import { MiradorMenuButton, useTranslation } from "mirador";
import PropTypes from "prop-types";

const CopyToClipboard = ({ onCopy, supported }) => {
  const { t } = useTranslation();
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
};

export default CopyToClipboard;
