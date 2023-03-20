import React from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import Button from '../../Styles/elements/Button';
import { invertTheme, theme } from '../../Styles/Theme';

function ActionButtons({ onConfirm, onPass, showConfirm, showPass }) {
  return (
    <View style={{ position: 'absolute', bottom: 10, width: '100%' }}>
      <ThemeProvider theme={invertTheme(theme)}>

        {showConfirm &&
          <Button onPress={onConfirm} modifiers='grow'>
            <Button.Text>Confirmar</Button.Text>
          </Button>
        }

        {showPass &&
          <Button onPress={onPass} modifiers='grow'>
            <Button.Text>Passar a vez</Button.Text>
          </Button>
        }

      </ThemeProvider>
    </View>
  );
}

export default ActionButtons;
