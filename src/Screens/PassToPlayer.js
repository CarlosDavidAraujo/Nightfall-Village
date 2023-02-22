import { useContext, useState, useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import DefaultButton from "../Components/Buttons/DefaultButton";
import { GameContext } from "../Context/GameContext";
import bgImg from '../../assets/images/passTo.png'
import door from '../../assets/images/door.png';
import { BackgroundImage, RotatedText, ScreenContainer, Title } from "../Styles";
import { dark } from "../Themes/Dark";

export default function PassToPlayer({ navigation, route }) {
  const { currentGame  } = useContext(GameContext);
  const [ready, setReady] = useState(false);
  const currentPlayerName = currentGame.getCurrentPlayer().getName();
  const { previousScreen } = route.params;

  function passVoteToNextPlayer() {
    navigation.navigate('Votes');
  }

  useEffect(() => {
    setReady(false);
  }, [currentGame.getCurrentPlayer()]);

  return (
    <BackgroundImage source={ready ? door : bgImg}>
      <ScreenContainer>
        {ready ? (
          <>
            <ThemeProvider theme={dark}>
              <Title>
                {currentPlayerName}
              </Title>
            </ThemeProvider>
            <DefaultButton
              inverted={true}
              title="Mostrar função"
              onPress={() => navigation.navigate("PlayerAction")}
              style={{ position: 'absolute', bottom: '20%' }}
            />
          </>
        ) : (
          <>
            <ThemeProvider theme={dark}>
              <RotatedText style={{ position: 'absolute', top: '39.5%' }}>
                Passe para {currentPlayerName}
              </RotatedText>
            </ThemeProvider>
            <DefaultButton
              inverted={true}
              title="Clique quando estiver pronto"
              onPress={previousScreen === 'Votes' || previousScreen === 'Clock'? () => passVoteToNextPlayer() : () => setReady(true)}
              style={{ position: 'absolute', bottom: '20%' }}
            />
          </>
        )}
      </ScreenContainer>
    </BackgroundImage>
  );
}

