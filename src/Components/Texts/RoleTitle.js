import { Text } from "react-native"

export default function RoleTitle({ currentPlayer }) {
    return (
        <Text style={{ fontFamily: 'NewRocker_400Regular', fontSize: 50 }}>
            {currentPlayer.getRoleName()}
        </Text>
    )
}
