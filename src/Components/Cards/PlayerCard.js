import feather from "../../../assets/images/feather.png";
import TextInput from "../../Styles/elements/TextInput";
import CloseButton from "../Buttons/CloseButton";
import Card from "../../Styles/blocks/Card";

export default function PlayerCard({ value, onChangeText, onPress }) {
  return (
    <Card>
      <Card.Header modifiers={['grow', 'end']}>
        <CloseButton onPress={onPress} />
      </Card.Header>
      <Card.Body>
        <Card.Image source={feather} />
      </Card.Body>
      <Card.Footer modifiers='center'>
        <TextInput value={value} onChangeText={onChangeText} maxLength={10} />
      </Card.Footer>
    </Card>
  );
}
