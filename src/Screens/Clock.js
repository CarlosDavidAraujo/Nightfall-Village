import { useContext, useState, useEffect } from "react"
import { GameContext } from "../Context/GameContext"
import { View, Text, Button } from "react-native";

export default function Clock({navigation}) {
    const [seconds, setSeconds] = useState(120);

    useEffect(() => {
        let interval = null;
        if (seconds > 0) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
        } else {
            navigation.navigate('Votes');
        }
        return () => clearInterval(interval);
    }, [seconds]);

    return (
        <View>
            <Text>Tempo restante: {seconds} segundos</Text>
            <Button
                title="Iniciar votação"
                onPress={() => navigation.navigate('Votes')} />
        </View>
    )
}



