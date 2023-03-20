import { useContext, useState, useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import { GameContext } from "../Context/GameContext";
import bgImg from "../../assets/images/passTo.png";
import door from "../../assets/images/door.png";
import BackgroundImage from "../Styles/elements/BackgroundImage";
import { invertTheme, theme } from "../Styles/Theme";
import Column from "../Styles/elements/Column";
import Button from "../Styles/elements/Button";
import Text from "../Styles/elements/Text";

export default function PassToPlayer({ navigation, route }) {
  const { currentGame } = useContext(GameContext);
  const [ready, setReady] = useState(false);
  const currentPlayerName = currentGame.getCurrentPlayer().getName();
  const { previousScreen } = route.params;

  function passVoteToNextPlayer() {
    navigation.navigate("Votes");
  }

  useEffect(() => {
    setReady(false);
  }, [currentGame.getCurrentPlayer()]);

  return (
    <BackgroundImage source={ready ? door : bgImg}>
      <Column modifiers={['grow', 'spaceAround']}>
        {ready ? (
          <>
            <ThemeProvider theme={invertTheme(theme)}>
              <Text modifiers='large'>{currentPlayerName}</Text>
            </ThemeProvider>
            <Button onPress={() => navigation.navigate("PlayerAction")}
              style={{ position: "absolute", bottom: "20%" }}
            >
              <Button.Text>Mostra função</Button.Text>
            </Button>
          </>
        ) : (
          <>
            <ThemeProvider theme={invertTheme(theme)}>
              <Text modifiers={['medium', 'rotated']}
                style={{ position: "absolute", top: "35%" }}
              >
                Passe para {currentPlayerName}</Text>
              <Button
                style={{ position: "absolute", bottom: "20%" }}
                onPress={
                  previousScreen === "Votes" || previousScreen === "Clock"
                    ? () => passVoteToNextPlayer()
                    : () => setReady(true)
                }>
                <Button.Text>Clique quando estiver pronto</Button.Text>
              </Button>
            </ThemeProvider>
          </>
        )}
      </Column>
    </BackgroundImage>
  );
}
