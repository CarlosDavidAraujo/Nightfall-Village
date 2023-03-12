import React from 'react';
import { View} from 'react-native';
import DefaultButton from './DefaultButton';

function ActionButtons({ onConfirm, onPass, showConfirm, showPass}) {
  return (
    <View style={{position: 'absolute', bottom: 10, width: '100%'}}>
      {showConfirm && <DefaultButton title='Confirmar' onPress={onConfirm} style={{width: '100%'}}/>}
      {showPass && <DefaultButton title='Passar a vez' onPress={onPass} style={{width: '100%'}}/>}
    </View>
  );
}

export default ActionButtons;
