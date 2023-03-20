import { View } from "react-native";
import Modal from "react-native-modal";
import { invertTheme, theme } from "../../Styles/Theme";
import { useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { useContext } from "react";
import { GameContext } from "../../Context/GameContext";
import Game from "../../Classes/Game";
import Button from "../../Styles/elements/Button";
import { ThemeProvider } from "styled-components/native";

export default function MenuModal({ isVisible, onClose }) {
  const navigation = useNavigation();
  const { setCurrentGame } = useContext(GameContext);

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
      <View style={{ width: '70%', height: '20%', justifyContent: 'space-evenly', paddingHorizontal: 20, backgroundColor: theme.colors.primary, borderRadius: 2 }}>
        <ThemeProvider theme={invertTheme(theme)}>
          <Button onPress={() => handleRestart()} >
            <Button.Text>Menu inicial</Button.Text>
          </Button>
          <Button onPress={() => BackHandler.exitApp()} >
            <Button.Text>Sair do jogo</Button.Text>
          </Button>
        </ThemeProvider>
      </View>
    </Modal>
  )
}