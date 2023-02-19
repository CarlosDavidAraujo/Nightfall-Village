import styled from "styled-components/native";

const Container = styled.TouchableOpacity`
  padding: 10px;
  background-color: #f5deb3;
  border: 3px solid black;
  align-items: center;
  width: 32%;
`;

const InfoButton = styled.TouchableOpacity`
  background-color: transparent;
  border: none;
  width: 23px;
  align-self: flex-end;
  justify-content: center;
  background-color: black;
  border-radius: 50;
  aspect-ratio: 1/1;
`;

const RoleImgContainer = styled.View`
  border: 3px solid black;
  border-radius: 2px;
  padding: 5px;
  margin-top: 5px;
`;

const RoleImg = styled.Image`
  width: 70px;
  height: 70px;
`;

const Text = styled.Text`
  font-size: 20px;
  align-self: center;
`;

const AmountController = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const ButonController = styled.TouchableOpacity`
  width: 30px;
`;

export default function RoleCard({
  roleName,
  count,
  onDecrease,
  onIncrease,
  onPress,
  img,
  selected,
  style
}) {
  return (
    <Container onPress={onPress} style={style}>
      <InfoButton>
        <Text style={{ fontFamily: 'NewRocker_400Regular', color: '#f5deb3' }}>i</Text>
      </InfoButton>
      <RoleImgContainer>
        <RoleImg source={img} />
      </RoleImgContainer>
      <Text style={{ fontFamily: 'NewRocker_400Regular' }}>{roleName}</Text>
      {selected && (
        <AmountController>
          <ButonController onPress={onDecrease} >
            <Text style={{ fontFamily: 'NewRocker_400Regular' }}>-</Text>
          </ButonController>
          <Text style={{ fontFamily: 'NewRocker_400Regular' }}>{count}</Text>
          <ButonController onPress={onIncrease} >
            <Text style={{ fontFamily: 'NewRocker_400Regular' }}>+</Text>
          </ButonController>
        </AmountController>
      )}
    </Container>
  );
}

