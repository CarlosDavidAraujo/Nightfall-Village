import { FlatList, View } from "react-native"
import DefaultButton from "./DefaultButton"

export default function PlayersButtonList({ playerList, currentPlayer, numColumns, targetPlayer, setTargetPlayer }) {

    const isNotCurrentPlayer= (player) => {
        return player.getName() !== currentPlayer.getName();
    }
    
    const isAlliedWerewolf = (otherPlayer) => {
        return currentPlayer.getRoleName() === 'Lobisomem' && otherPlayer.getRoleName() === 'Lobisomem'
    }

    return (
        <FlatList
            contentContainerStyle={{ marginTop: 40 }}
            data={playerList}
            numColumns={numColumns}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            renderItem={({ item, index }) => (
                isNotCurrentPlayer(item) &&
                <DefaultButton
                    style={{
                        marginLeft: index % 3 !== 0 ? 20 : 0,
                        width: 110,
                    }}
                    title={isAlliedWerewolf(item)?  `${item.getName()} Lobisomem` : item.getName()}
                    onPress={() => setTargetPlayer(item)}
                    disabled={isAlliedWerewolf(item)}
                    inverted={targetPlayer !== item}
                />
            )}
        />
    )
}