import { View } from "react-native";
import Modal from "react-native-modal";
import { dark } from "../../Themes/Dark";
import DefaultButton from "../Buttons/DefaultButton";
import { useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { useContext } from "react";
import { GameContext } from "../../Context/GameContext";
import Game from "../../Classes/Game";

export default function MenuModal({ isVisible, onClose }) {
    const navigation = useNavigation();
    const {setCurrentGame} = useContext(GameContext);

    function handleRestart() {
        setCurrentGame(new Game());
        navigation.navigate('GameMenu')
    }

    return (
        <Modal
            isVisible={isVisible}
            useNativeDriverForBackdrop={true}
            onBackdropPress={onClose}
            style={{ alignItems: 'center' }} >
            <View style={{ width: '70%', height: '20%', justifyContent: 'space-evenly', paddingHorizontal: 20, backgroundColor: dark.color, borderRadius: 2 }}>
                <DefaultButton title='Menu inicial' onPress={() => handleRestart()} />
                <DefaultButton title='Sair do jogo' onPress={() => BackHandler.exitApp()} />
            </View>
        </Modal>
    )
}