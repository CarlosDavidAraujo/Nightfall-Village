import React from 'react';
import { View} from 'react-native';
import DefaultButton from './DefaultButton';

function ActionButtons({ onConfirm, onPass, onCancel, showConfirm, showPass, showCancel, confirmText, passText, cancelText }) {
  return (
    <View style={{position: 'absolute', bottom: 10}}>
      {showConfirm && <DefaultButton title={confirmText} onPress={onConfirm}/>}
      {showPass && <DefaultButton title={passText} onPress={onPass} />}
      {showCancel && <DefaultButton title={cancelText} onPress={onCancel} />}
    </View>
  );
}

export default ActionButtons;
