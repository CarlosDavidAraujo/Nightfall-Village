import { useContext, useState } from "react";
import { ScrollView } from "react-native";
import { GameContext } from "../Context/GameContext";
import bgImg from "../../assets/images/playersUnited.png";
import RoleCard from "../Components/Cards/RoleCard";
import { ThemeProvider } from "styled-components/native";
import DefaultButton from "../Components/Buttons/DefaultButton";
import { BackgroundImage, DefaultText, SpaceBetweenContainer, SubTitle } from "../Styles";
import { dark } from "../Themes/Dark";
import { SimpleGrid, SectionGrid } from "react-native-super-grid";
import SelectedRolesGrid from "../Components/Containers/SelectedRolesGrid";
import AvailableRolesGrid from "../Components/Containers/AvailableRolesGrid";

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
      <SpaceBetweenContainer>
        <ScrollView style={{ width: "100%" }}>
          <SelectedRolesGrid selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />
          <AvailableRolesGrid roleMap={roleMap} selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />
        </ScrollView>
        <ThemeProvider theme={dark}>
          <DefaultText>{errorMessage}</DefaultText>
        </ThemeProvider>
        <DefaultButton
          title="Confirmar" s
          onPress={() => startGame()}
          style={{ width: "100%", marginTop: 20 }}
        />
      </SpaceBetweenContainer>
    </BackgroundImage>
  );
}
