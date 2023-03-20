import React from 'react';
import styled from 'styled-components/native';

const TextContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

const Text = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: #1c1c1c;
  padding-left: 38px; /* Adiciona um padding para o texto não ficar sobrepondo a letra capital */
`;

const Container = styled.View`
  position: relative;
  width: 40px;
  height: 52px; /* altura da letra capitular + linha de texto abaixo */
  margin-right: 10px;
  line-height: 52px; /* altura da letra capitular + linha de texto abaixo */
  background-color: red;
`;

const CapitalText = styled.Text`
  position: absolute;
  top: -10px;
  left: 0;
  font-size: 52px; /* tamanho da letra capitular */
  font-weight: bold; /* peso da letra */
`;


const CapitalLetter = ({ character }) => {
  return (
    <Container>
      <CapitalText>{character}</CapitalText>
    </Container>
  );
};

const Paragraph = ({ children }) => {
  const firstChar = children.charAt(0);
  const remainingText = children.substring(1);
  return (
    <TextContainer>
      <CapitalLetter character={firstChar} />
      <Text>{remainingText}</Text>
    </TextContainer>
  );
};

export default Paragraph;





