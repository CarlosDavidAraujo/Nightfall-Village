import { ScrollView, View } from "react-native";
import { SimpleGrid } from "react-native-super-grid";
import DefaultButton from "./DefaultButton";
import { useRoute } from "@react-navigation/native";
import Button from "../../Styles/elements/Button";
import { ThemeProvider } from "styled-components/native";
import { invertTheme, theme } from "../../Styles/Theme";
import { faPaw, faSkull } from "@fortawesome/free-solid-svg-icons";
import AwesomeIcon from "../../Styles/elements/FontAwesomeIcon";
import Text from "../../Styles/elements/Text";

export default function PlayersButtonList({
  playerList,
  currentPlayer,
  targetPlayer,
  setTargetPlayer,
  chosenSkill,
  inverted,
}) {
  const route = useRoute();
  const role = currentPlayer.getRole();
  const currentPlayerCanSeeVotes = () => {
    return currentPlayer.isWolf() && route.name === "PlayerAction";
  };
  const playerListWithoutCurrentPlayer = playerList.filter(
    (player) => player !== currentPlayer
  );

  const newTheme = inverted? invertTheme(theme) : theme

  return (
    <View style={{ height: "40%" }}>
      <ScrollView contentContainerStyle={{ padding: 10, width: "100%" }}>
        <SimpleGrid
          itemDimension={100}
          data={playerListWithoutCurrentPlayer}
          renderItem={({ item }) => (
            <ThemeProvider theme={targetPlayer == item ? invertTheme(theme) : theme}>
              <Button modifiers={['large']}
                onPress={() => setTargetPlayer(item)}
                disabled={
                  role.skillHasInvalidTargetOn(item, chosenSkill) &&
                  route.name === "PlayerAction"
                }
              >
                <Button.Text>{item.getName()}</Button.Text>
                {item.isWolf() && currentPlayer.isWolf() && <Button.IconContainer><AwesomeIcon icon={faPaw} /></Button.IconContainer>}
                {item.belongsToUndeadsTeam() && currentPlayer.belongsToUndeadsTeam() && <Button.IconContainer><AwesomeIcon icon={faSkull} /></Button.IconContainer>}
                {!item.isWolf() && currentPlayerCanSeeVotes() && <Button.IconContainer><Text>{item.getVotesCount()}</Text></Button.IconContainer>}
              </Button>
            </ThemeProvider>
          )}
        />
      </ScrollView>
    </View>
  );
}
