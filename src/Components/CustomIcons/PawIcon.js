import { IconContainer } from "../../Styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { invertTheme } from "../../Styles/Theme";

export default function PawIcon({ theme }) {
  return (
    <IconContainer theme={invertTheme(theme)}>
      <FontAwesomeIcon icon={faPaw} color={theme.bg} />
    </IconContainer>
  );
}
