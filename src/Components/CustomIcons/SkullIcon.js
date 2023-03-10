import { IconContainer } from "../../Styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSkull } from "@fortawesome/free-solid-svg-icons";
import { invertTheme } from "../../Themes/Dark";

export default function SkullIcon({ theme }) {
  return (
    <IconContainer theme={invertTheme(theme)}>
      <FontAwesomeIcon icon={faSkull} color={theme.bg} />
    </IconContainer>
  );
}
