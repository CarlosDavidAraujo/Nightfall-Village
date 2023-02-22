import feather from "../../../assets/images/feather.png";
import styled from "styled-components/native";
import { CardContainer, TextInput } from "../../Styles";
import CloseButton from "../Buttons/CloseButton";

const Image = styled.Image`
  width: 50px;
  resize-mode: contain;
`;

export default function PlayerCard({ value, onChangeText, onPress }) {
  return (
    <CardContainer >
      <CloseButton onPress={onPress}/>
      <Image source={feather} />
      <TextInput  value={value} onChangeText={onChangeText} maxLength={10} />
    </CardContainer>
  );
}
