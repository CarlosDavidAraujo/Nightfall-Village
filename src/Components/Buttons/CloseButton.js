import Button from "../../Styles/elements/Button";
import closeIcon from '../../../assets/images/close.png';

export default function CloseButton({ onPress }) {
  return (
      <Button modifiers={['noBorder', 'noPadding']} onPress={onPress}>
        <Button.Image source={closeIcon}/>
      </Button>
  );
}
