import styled from "styled-components/native";

const ButtonContainer = styled.TouchableOpacity`
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #f5deb3;
  padding: 15px;
  margin-bottom: 5px;
  width: 33%;
  border-radius: 2px;
  border: 3px solid black;
  opacity: 0.8;
`;

const Title = styled.Text`
    font-size: 18px;
    text-align: center;
`;

const AddIcon = styled.Text`
  font-size: 100px;
  line-height: 100px;
  text-align: center;
  width: 80px;
  height: 80px;
`;

export default function AddPlayer({onPress}) {
    return (
        <ButtonContainer onPress={onPress}>
            <AddIcon style={{fontFamily: 'NewRocker_400Regular'}}>+</AddIcon>
            <Title style={{fontFamily: 'NewRocker_400Regular'}}>Adicionar jogador</Title>
        </ButtonContainer>
    )
}