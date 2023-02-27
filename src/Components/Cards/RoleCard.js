import { useState } from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { DefaultText, CardContainer, ButtonContainer } from "../../Styles";
import { dark, invertTheme } from "../../Themes/Dark";
import RoleInfoModal from "../Modals/RoleInfoModal";

const InfoButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.bg};
  border: none;
  width: 23px;
  align-self: flex-end;
  justify-content: center;
  background-color: black;
  border-radius: 50;
  aspect-ratio: 1/1;
`;

const RoleImg = styled.Image`
  width: 70px;
  height: 70px;
`;

const AmountController = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10;
`;

export default function RoleCard({
  count,
  onDecrease,
  onIncrease,
  onPress,
  selected,
  role
}) {

  const [isModalVisible, setIsModalVisible] = useState(false);


  return (
    <CardContainer onPress={onPress} style={{ height: 'auto' }}>
      <ThemeProvider theme={invertTheme(dark)}>
        <InfoButton onPress={() => setIsModalVisible(true)}>
          <DefaultText theme={dark}>i</DefaultText>
        </InfoButton>
      </ThemeProvider>
      <RoleImg source={role.getRoleImg()} /> 
      <DefaultText numberOfLines={1} ellipsizeMode='tail' style={{ maxWidth: 50 * 2 }}>{role.getName()}</DefaultText>

      {selected && (
        <AmountController>
          <ButtonContainer onPress={onDecrease} >
            <DefaultText>-</DefaultText>
          </ButtonContainer>
          <DefaultText>{count}</DefaultText>
          <ButtonContainer onPress={onIncrease}>
            <DefaultText>+</DefaultText>
          </ButtonContainer>
        </AmountController>
      )}

       <RoleInfoModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        role={role}
      /> 
    </CardContainer>
  );
}

