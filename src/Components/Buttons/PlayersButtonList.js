import { ScrollView, View } from "react-native"
import { SimpleGrid } from "react-native-super-grid";
import DefaultButton from "./DefaultButton";
import { useRoute } from "@react-navigation/native";

export default function PlayersButtonList({ playerList, currentPlayer, targetPlayer, setTargetPlayer, inverted }) {
    const route = useRoute();
    const isAlliedWerewolf = (otherPlayer) => {
        return currentPlayer.getRoleName() === 'Lobisomem' && otherPlayer.getRoleName() === 'Lobisomem'
    }

    const currentPlayerIsWerewolf = () => {
        return currentPlayer.getRoleName() === 'Lobisomem';
    }

    const playerListWithoutCurrentPlayer = playerList.filter(player => player.getName() !== currentPlayer.getName())

    return (
        <View style={{ height: '40%' }}>
            <ScrollView contentContainerStyle={{ padding: 10, width: '100%' }}>
                <SimpleGrid
                    itemDimension={100}
                    data={playerListWithoutCurrentPlayer}
                    renderItem={({ item }) =>
                        <DefaultButton
                            onPress={() => setTargetPlayer(item)}
                            disabled={isAlliedWerewolf(item)}
                            inverted={inverted === (targetPlayer !== item)}
                            title={item.getName()}
                            showWolfIcon={isAlliedWerewolf(item)}
                            showVotesIcon={!isAlliedWerewolf(item) && currentPlayerIsWerewolf() && route.name === 'PlayerAction'}
                            voteCount={item.getVotesCount()}
                            style={{height: 50}}
                        />
                    }
                />
            </ScrollView>
        </View>
    )
}