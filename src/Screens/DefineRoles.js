import { useContext, useState } from "react";
import { ScrollView } from "react-native";
import { GameContext } from "../Context/GameContext";
import bgImg from "../../assets/images/playersUnited.png";
import RoleCard from "../Components/Cards/RoleCard";
import { ThemeProvider } from "styled-components/native";
import DefaultButton from "../Components/Buttons/DefaultButton";
import {
  BackgroundImage,
  DefaultText,
  SpaceBetweenContainer,
  SubTitle,
} from "../Styles";
import { dark } from "../Themes/Dark";
import { SimpleGrid } from "react-native-super-grid";

export default function DefineRoles({ navigation }) {
  const { currentGame } = useContext(GameContext);
  const [errorMessage, setErrorMessage] = useState();
  const roleMap = currentGame.getRoleMap();
  const [selectedRoles, setSelectedRoles] = useState([
    { role: roleMap[0], count: 2 },
    { role: roleMap[1], count: 1 },
    { role: roleMap[2], count: 1 },
  ]);
  const allRolesNotSelected = roleMap.filter((role) => {
    return !selectedRoles.some(
      (selectedRole) => selectedRole.role.getName() === role.getName()
    );
  });

  const handleIncreaseRoleCount = (roleIndex) => {
    setSelectedRoles((prevSelectedRoles) => {
      const newSelectedRoles = [...prevSelectedRoles];
      const { role } = newSelectedRoles[roleIndex];
      const roleObject = roleMap.find((r) => r.getName() === role.getName());
      const newCount = newSelectedRoles[roleIndex].count + 1;
      newSelectedRoles[roleIndex] = {
        role: roleObject,
        count: newCount,
      };
      return newSelectedRoles;
    });
  };

  const handleDecreaseRoleCount = (roleIndex) => {
    setSelectedRoles((prevSelectedRoles) => {
      const newSelectedRoles = [...prevSelectedRoles];
      const { role } = newSelectedRoles[roleIndex];
      const roleObject = roleMap.find((r) => r.getName() === role.getName());
      const newCount = newSelectedRoles[roleIndex].count - 1;
      if (newCount >= 0) {
        newSelectedRoles[roleIndex] = {
          role: roleObject,
          count: newCount,
        };
      }
       newCount === 0 && newSelectedRoles.splice(roleIndex, 1)
       return newSelectedRoles;
    });
  };

  const handleAddRole = (role) => {
    const index = selectedRoles.findIndex(
      (element) => element.role.getName() === role.getName()
    );
    if (index === -1) {
      setSelectedRoles([...selectedRoles, { role: role, count: 1 }]);
    }
  };

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
          <ThemeProvider theme={dark}>
            <SubTitle>Papéis Adicionados</SubTitle>
          </ThemeProvider>
          <SimpleGrid
            itemDimension={110}
            data={selectedRoles}
            spacing={5}
            renderItem={({ item, index }) => (
              <RoleCard
                role={item.role}
                count={item.count}
                onIncrease={() => handleIncreaseRoleCount(index)}
                onDecrease={() => handleDecreaseRoleCount(index)}
                selected={true}
              />
            )}
          />
          <ThemeProvider theme={dark}>
            <SubTitle style={{ marginTop: 50, marginBottom: 10 }}>
              Adicionar Papéis
            </SubTitle>
          </ThemeProvider>
          <SimpleGrid
            itemDimension={110}
            data={allRolesNotSelected}
            spacing={5}
            renderItem={({ item }) => (
              <RoleCard role={item} onPress={() => handleAddRole(item)} />
            )}
          />
        </ScrollView>
        <ThemeProvider theme={dark}>
          <DefaultText>{errorMessage}</DefaultText>
        </ThemeProvider>
        <DefaultButton
          title="Confirmar"
          onPress={() => startGame()}
          style={{ width: "100%", marginTop: 20 }}
        />
      </SpaceBetweenContainer>
    </BackgroundImage>
  );
}
