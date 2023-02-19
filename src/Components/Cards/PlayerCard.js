import React from "react";
import feather from "../../Images/feather.png";
import styled from "styled-components/native";
import { Text } from "react-native";

const Container = styled.View`
  position: relative;
  flex-direction: column;
  align-items: center;
  background-color: #f5deb3;
  width: 33%;
  padding: 10px 5px;
  margin-bottom: 5px;
  border-radius: 2px;
  border: 3px solid black;
`;

const Image = styled.Image`
  width: 50px;
  resize-mode: contain;
`;

const Input = styled.TextInput`
  font-size: 18px;
`;

const DeleteButton = styled.TouchableOpacity`
  transform: rotate(45deg);
  margin-left: auto;
  margin-top: 0;
`;

const DeleteIcon = styled.Text`
  font-size: 50px;
  line-height: 47px;
  text-align: center;
  justify-content: center;
  width: 30px;
  height: 30px;
`;

export default function PlayerCard({ value, onChangeText, onPress }) {
  return (
    <Container>
      <DeleteButton onPress={onPress} >
        <DeleteIcon style={{fontFamily: 'NewRocker_400Regular'}}>+</DeleteIcon>
      </DeleteButton>
      <Image source={feather} />
      <Input value={value} onChangeText={onChangeText} style={{fontFamily: 'NewRocker_400Regular'}}/>
    </Container>
  );
}
