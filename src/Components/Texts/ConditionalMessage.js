import { View } from "react-native";
import { DefaultText } from "../../Styles";

export default function ConditionalMessage({
  showChooseSkill,
  showSelectPlayer,
  selectPlayerMessage,
  showAlert,
  alertMessage,
}) {
  return (
    <View>
      {showChooseSkill && <DefaultText>Selecione uma habilidade</DefaultText>}
      {showSelectPlayer && <DefaultText>{selectPlayerMessage}</DefaultText>}
      {showAlert && <DefaultText>{alertMessage}</DefaultText>}
    </View>
  );
}
