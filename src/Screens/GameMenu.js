import { ThemeProvider } from "styled-components/native";
import bgImg from "../../assets/images/homeScreen.png";
import DefaultButton from "../Components/Buttons/DefaultButton";
import { SpaceAroundContainer, Title } from "../Styles";
import { BackgroundImage } from "../Styles";
import { dark } from "../Themes/Dark";

export default function GameMenu({ navigation }) {
  return (
    <BackgroundImage source={bgImg}>
      <SpaceAroundContainer>
        <ThemeProvider theme={dark}>
          <Title>Nightfall Village</Title>
          <DefaultButton
            onPress={() => navigation.navigate("DefinePlayers")}
            title="Iniciar Novo Jogo"
          />
        </ThemeProvider>
      </SpaceAroundContainer>
    </BackgroundImage>
  );
}
