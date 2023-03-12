import { useState, useEffect } from "react"
import DefaultButton from "../Components/Buttons/DefaultButton";
import { BackgroundImage, SpaceAroundContainer, SubTitle } from "../Styles";
import village from '../../assets/images/votation2.png';
import { dark } from "../Themes/Dark";
import { ThemeProvider } from "styled-components/native";

export default function Clock({ navigation }) {
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
        <ThemeProvider theme={dark}>
            <BackgroundImage source={village}>
                <SpaceAroundContainer>
                    <SubTitle>Tempo para discussão: {seconds} segundos</SubTitle>
                    <DefaultButton
                        inverted={true}
                        title="Iniciar votação"
                        onPress={() => navigation.navigate('PassToPlayer', {
                            previousScreen: 'Clock' 
                        })}
                    />
                </SpaceAroundContainer>
            </BackgroundImage>
        </ThemeProvider>
    )
}



