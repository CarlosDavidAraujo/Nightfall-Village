import { useContext, useState } from "react";
import { ScrollView } from "react-native";
import { GameContext } from "../Context/GameContext";
import bgImg from "../../assets/images/playersUnited.png";
import { ThemeProvider } from "styled-components/native";
import BackgroundImage from "../Styles/elements/BackgroundImage";
import SelectedRolesGrid from "../Components/Containers/SelectedRolesGrid";
import AvailableRolesGrid from "../Components/Containers/AvailableRolesGrid";
import Column from "../Styles/elements/Column";
import Button from "../Styles/elements/Button";
import Text from "../Styles/elements/Text";
import { invertTheme, theme } from "../Styles/Theme";

export default function DefineRoles({ navigation }) {
  const { currentGame } = useContext(GameContext);
  const [errorMessage, setErrorMessage] = useState();
  const roleMap = currentGame.getRoleMap();
  const rolePreset = currentGame.getRolePreset();
  const [selectedRoles, setSelectedRoles] = useState([
    { role: rolePreset[0], count: 2 },
    { role: rolePreset[1], count: 1 },
    { role: rolePreset[2], count: 1 },
  ]);

  const startGame = () => {
    let totalRoles = 0;
    selectedRoles.forEach((selectedRole) => {
      const { count } = selectedRole;
      totalRoles = totalRoles + count;
    });
    if (totalRoles !== currentGame.getAlivePlayers().length) {
      return setErrorMessage(
        "A quantidade de jogadores e papéis devem ser iguais"
      );
    }
    currentGame.assignRoleToPlayer(selectedRoles);
    navigation.navigate("PassToPlayer", {
      previousScreen: "DefineRoles",
    });
  };

  return (
    <BackgroundImage source={bgImg}>
      <Column modifiers={['grow', 'spaceBetween']}>
        <ScrollView style={{ width: "100%" }}>
          <SelectedRolesGrid selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />
          <AvailableRolesGrid roleMap={roleMap} selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />
        </ScrollView>
        <ThemeProvider theme={invertTheme(theme)}>
          <Text style={{ marginTop: 20 }}>{errorMessage}</Text>
        </ThemeProvider>
        <Button onPress={() => startGame()}
          modifiers='grow'
          style={{ marginTop: 20 }}>
          <Button.Text>Confirmar</Button.Text>
        </Button>
      </Column>
    </BackgroundImage>
  );
}
