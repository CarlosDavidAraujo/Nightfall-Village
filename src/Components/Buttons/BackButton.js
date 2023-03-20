import DefaultButton from "./DefaultButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../Styles/Theme";
import Button from "../../Styles/elements/Button";

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <Button onPress={() => navigation.goBack()}>
      <FontAwesomeIcon icon={faArrowLeft} color={theme.colors.secondary} />
    </Button>
  );
}