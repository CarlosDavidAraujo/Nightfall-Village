import styled from "styled-components/native";

const DeleteButton = styled.TouchableOpacity`
    transform: rotate(45deg);
    margin-left: auto;
    margin-top: 0;
`;

const DeleteIcon = styled.Text`
  font-family: 'NewRocker_400Regular';
  font-size: 50px;
  line-height: 47px;
  text-align: center;
  justify-content: center;
  width: 30px;
  height: 30px;
`;

export default function CloseButton({onPress}) {
    return (
        <DeleteButton onPress={onPress} >
            <DeleteIcon>+</DeleteIcon>
        </DeleteButton>
    )
}