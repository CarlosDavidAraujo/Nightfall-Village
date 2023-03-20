import { useState, useEffect } from "react"
import BackgroundImage from "../Styles/elements/BackgroundImage";
import village from '../../assets/images/votation2.png';
import { theme, invertTheme } from "../Styles/Theme";
import { ThemeProvider } from "styled-components/native";
import Column from "../Styles/elements/Column";
import Text from "../Styles/elements/Text";
import Button from "../Styles/elements/Button";

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
    <ThemeProvider theme={invertTheme(theme)}>
      <BackgroundImage source={village}>
        <Column modifiers={['spaceEvenly', 'grow']}>
          <Text modifiers='medium'>Tempo para discussão: {seconds} segundos</Text>
          <Button onPress={() => navigation.navigate('PassToPlayer', {
            previousScreen: 'Clock'
          })}
          >
            <Button.Text>Iniciar votação</Button.Text>
          </Button>
        </Column>
      </BackgroundImage>
    </ThemeProvider>
  )
}
