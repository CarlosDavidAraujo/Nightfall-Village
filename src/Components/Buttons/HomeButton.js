import { useContext } from "react";
import Game from "../../Classes/Game";
import { GameContext } from "../../Context/GameContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import DefaultButton from "./DefaultButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function HomeButton() {
    const navigation = useNavigation();
    const route = useRoute();
    const { setCurrentGame } = useContext(GameContext);

    if (route.name === 'GameMenu') {
        return null;
    }

    function handleRestart() {
        setCurrentGame(new Game());
        navigation.navigate('GameMenu')
    }

    return (
            <DefaultButton  
            title={<FontAwesomeIcon icon={ faHome} />} 
            onPress={() => handleRestart()} inverted={true}
            style={{with: 50, height: 40}}
            />
    );
}