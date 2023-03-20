import { useContext, useState } from "react";
import { GameContext } from "../Context/GameContext";
import BackgroundImage from "../Styles/elements/BackgroundImage";
import PlayersButtonList from "../Components/Buttons/PlayersButtonList";
import votationImg from "../../assets/images/votation2.png";
import { ThemeProvider } from "styled-components/native";
import { invertTheme, theme } from "../Styles/Theme";
import Column from "../Styles/elements/Column";
import Text from "../Styles/elements/Text";
import Button from "../Styles/elements/Button";
import Row from "../Styles/elements/Row";

export default function Votes({ navigation }) {
  const { currentGame } = useContext(GameContext);
  const currentTurn = currentGame.getCurrentTurn();
  const currentPlayer = currentGame.getCurrentPlayer();
  const [targetPlayer, setTargetPlayer] = useState();
  const playerList = currentGame.getAlivePlayers();

  function handleVote() {
    currentPlayer.voteOn(targetPlayer);
    passVotation();
  }

  function passVotation() {
    currentGame.incrementCurrentPlayerIndex();

    if (currentGame.noNextPlayer()) {
      currentGame.endDay();
      return navigation.navigate("VillageNews", { previousScreen: "Votes" });
    }

    navigation.navigate("PassToPlayer", {
      previousScreen: "Votes",
    });
  }

  return (
    <ThemeProvider theme={invertTheme(theme)}>
      <BackgroundImage source={votationImg}>
        <Column modifiers={['spaceAround', 'grow']}>
          {currentPlayer.hasDisabledVote(currentTurn) ? (
            <>
              <Text modifiers='medium' style={{ marginTop: 160 }}>
                Seus votos estão bloqueados neste turno
              </Text>
              <Button onPress={() => passVotation()}>
                <Button.Text>Passar a vez</Button.Text>
              </Button>
            </>
          ) : (
            <>
              <Text modifiers='medium' style={{ marginTop: 160 }}>
                {currentPlayer.getName()}, escolha seu voto
              </Text>
              <PlayersButtonList
                playerList={playerList}
                currentPlayer={currentPlayer}
                targetPlayer={targetPlayer}
                setTargetPlayer={setTargetPlayer}
                inverted={true}
              />
              <Row modifiers={['grow', 'spaceAround']}>
                <Button onPress={() => passVotation()}>
                  <Button.Text>Abster-se</Button.Text>
                </Button>
                <Button onPress={() => handleVote()} disabled={!targetPlayer}>
                  <Button.Text>Confirmar</Button.Text>
                </Button>
              </Row>
            </> 
          )}
        </Column>
      </BackgroundImage>
    </ThemeProvider >
  );
}
