import { ScrollView, View } from "react-native";
import { SimpleGrid } from "react-native-super-grid";
import DefaultButton from "./DefaultButton";
import { useRoute } from "@react-navigation/native";

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
  const canSeeVotes = () => {
    return currentPlayer.isWolf() && route.name === "PlayerAction";
  };
  const playerListWithoutCurrentPlayer = playerList.filter(
    (player) => player !== currentPlayer
  );

  return (
    <View style={{ height: "40%" }}>
      <ScrollView contentContainerStyle={{ padding: 10, width: "100%" }}>
        <SimpleGrid
          itemDimension={100}
          data={playerListWithoutCurrentPlayer}
          renderItem={({ item }) => (
            <DefaultButton
              onPress={() => setTargetPlayer(item)}
              disabled={
                role.skillHasInvalidTargetOn(item, chosenSkill) &&
                route.name === "PlayerAction"
              }
              inverted={inverted === (targetPlayer !== item)}
              title={item.getName()}
              showWolfIcon={item.isWolf() && currentPlayer.isWolf()}
              showVotesIcon={!item.isWolf() && canSeeVotes()}
              showUndeadIcon={
                item.belongsToUndeadsTeam() &&
                currentPlayer.belongsToUndeadsTeam()
              }
              voteCount={item.getVotesCount()}
              style={{ height: 50 }}
            />
          )}
        />
      </ScrollView>
    </View>
  );
}
