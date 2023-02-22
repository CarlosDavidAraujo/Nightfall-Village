import React from 'react';
import { View} from 'react-native';
import DefaultButton from './DefaultButton';

function ActionButtons({ onConfirm, onPass, onCancel, showConfirm, showPass, showCancel, confirmText, passText, cancelText }) {
  return (
    <View style={{position: 'absolute', bottom: 10, width: '100%'}}>
      {showConfirm && <DefaultButton title={confirmText} onPress={onConfirm} style={{width: '100%'}}/>}
      {showPass && <DefaultButton title={passText} onPress={onPass} style={{width: '100%'}}/>}
      {showCancel && <DefaultButton title={cancelText} onPress={onCancel} style={{width: '100%'}}/>}
    </View>
  );
}

export default ActionButtons;
