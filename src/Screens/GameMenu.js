import { ThemeProvider } from "styled-components/native";
import bgImg from "../../assets/images/homeScreen.png";
import BackgroundImage from "../Styles/elements/BackgroundImage";
import Button from "../Styles/elements/Button";
import Column from "../Styles/elements/Column";
import Text from "../Styles/elements/Text";
import { invertTheme, theme } from "../Styles/Theme";

function GameMenu({ navigation }) {
  return (
    <BackgroundImage source={bgImg}>
      <Column modifiers={['grow', 'spaceAround']}>
        <ThemeProvider theme={invertTheme(theme)}>
          <Text modifiers='large'>Nightfall Village</Text>
        </ThemeProvider>
        <Button onPress={() => navigation.navigate("DefinePlayers")}>
          <Button.Text>Iniciar Novo Jogo</Button.Text>
        </Button>
      </Column>
    </BackgroundImage>
  );
}

export default GameMenu;
