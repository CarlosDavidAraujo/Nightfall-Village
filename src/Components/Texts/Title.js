import { Text } from "react-native"

export default function Title({ children, style }) {
    return (
        <Text style={{...style, fontFamily: 'NewRocker_400Regular', fontSize: 40}}>
            {children}
        </Text>
    )
}
