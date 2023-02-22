import { ThemeProvider } from 'styled-components/native';
import bgImg from '../../assets/images/homeScreen.png';
import DefaultButton from "../Components/Buttons/DefaultButton";
import { ScreenContainer, Title } from '../Styles';
import { BackgroundImage } from "../Styles";
import { dark } from '../Themes/Dark';


export default function GameMenu({ navigation }) {
    return (
        <BackgroundImage source={bgImg}>
            <ScreenContainer>
                <ThemeProvider theme={dark}>
                    <Title style={{marginTop: -100}}>Nightfall Village</Title>
                    <DefaultButton
                        onPress={() => navigation.navigate('DefinePlayers')}
                        title="Iniciar Novo Jogo"
                    />
                </ThemeProvider>
            </ScreenContainer>
        </BackgroundImage>
    );
}

