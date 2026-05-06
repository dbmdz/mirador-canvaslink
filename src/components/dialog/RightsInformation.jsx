import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import { useTranslation } from "mirador";
import PropTypes from "prop-types";

/** Renders the rights information defined in the used manifest */
const RightsInformation = ({ rights }) => {
  const { t } = useTranslation();
  if (!rights.length) {
    return null;
  }
  return (
    <Alert sx={{ mt: 2 }} severity="warning">
      <span>{t("canvasLink.noteRights", { count: rights.length })}: </span>
      {rights.length === 1 ? (
        <Link href={rights[0]} rel="noopener" target="_blank">
          {rights[0]}
        </Link>
      ) : (
        <ul>
          {rights.map((link) => (
            <li key={link}>
              <Link href={link} rel="noopener" target="_blank">
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Alert>
  );
};

RightsInformation.propTypes = {
  rights: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RightsInformation;
