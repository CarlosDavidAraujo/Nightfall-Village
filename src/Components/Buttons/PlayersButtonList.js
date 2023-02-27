import { ScrollView, View } from "react-native"
import { SimpleGrid } from "react-native-super-grid";
import DefaultButton from "./DefaultButton";
import { useRoute } from "@react-navigation/native";

export default function PlayersButtonList({currentGame, playerList, currentPlayer, targetPlayer, setTargetPlayer, chosenSkill, inverted }) {
    const route = useRoute();
    const role = currentPlayer.getRole();
    const currentTurn = currentGame.getCurrentTurn();

    const isAlliedWerewolf = (otherPlayer) => {
        return currentPlayer.belongsToWerewolfsTeam() && currentPlayer.isWolf() && otherPlayer.belongsToWerewolfsTeam() && otherPlayer.isWolf();
    }

    const canSeeVotes = () => {
        currentPlayer.isWolf() && route.name === 'PlayerAction';
    }

    const lastDoctorHealTarget = (otherPlayer) => {
        return currentPlayer.getRoleName() === 'Médica' && role.hasInvalidTargetOn(otherPlayer, currentTurn) && chosenSkill === 1 && route.name !== 'Votes';
    }

    const lastWitchCursetarget = (otherPlayer) => {
        return currentPlayer.getRoleName() === 'Bruxa' && role.hasInvalidTargetOn(otherPlayer, currentTurn) && chosenSkill === 1 && route.name !== 'Votes';
    }

    const playerListWithoutCurrentPlayer = playerList.filter(player => player !== currentPlayer)

    return (
        <View style={{ height: '40%' }}>
            <ScrollView contentContainerStyle={{ padding: 10, width: '100%' }}>
                <SimpleGrid
                    itemDimension={100}
                    data={playerListWithoutCurrentPlayer}
                    renderItem={({ item }) =>
                        <DefaultButton
                            onPress={() => setTargetPlayer(item)}
                            disabled=
                            {
                                isAlliedWerewolf(item) ||
                                lastDoctorHealTarget(item) ||
                                lastWitchCursetarget(item)
                            }
                            inverted={inverted === (targetPlayer !== item)}
                            title={item.getName()}
                            showWolfIcon={isAlliedWerewolf(item)}
                            showVotesIcon={!isAlliedWerewolf(item) && canSeeVotes()}
                            voteCount={item.getVotesCount()}
                            style={{ height: 50 }}
                        />
                    }
                />
            </ScrollView>
        </View>
    )
}