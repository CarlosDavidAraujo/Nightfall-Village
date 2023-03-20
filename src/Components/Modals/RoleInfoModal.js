import { View } from "react-native";
import ModalContainer from "react-native-modal";
import Modal from "../../Styles/blocks/Modal";
import { RoleImage, SkillsContainer, RoleImageContainer } from "../../Styles";
import Text from "../../Styles/elements/Text";
import { theme } from "../../Styles/Theme";
import CloseButton from "../Buttons/CloseButton";
import SkillButton from "../Buttons/SkillButton";
import Column from "../../Styles/elements/Column";


export default function RoleInfoModal({ isVisible, onClose, role }) {
  return (
    <View>
      <ModalContainer
        isVisible={isVisible}
        style={{ backgroundColor: theme.colors.primary, padding: 10, justifyContent: 'flex-start' }} >
        <Modal>

          <Modal.Header modifiers={['grow', 'end']}>
            <CloseButton onPress={onClose} />
          </Modal.Header>

          <Modal.Body>

            <Column>
              <Text modifiers='large'>{role.getName()}</Text>
              <RoleImageContainer>
                <RoleImage source={role.getRoleImg()} />
              </RoleImageContainer>
              <Text>{role.getObjective()}</Text>
            </Column>

            <Column>
              <Text modifiers='medium' style={{ marginTop: '5%' }}>Habilidades</Text>
              <SkillsContainer>
                <SkillButton
                  skillName={role.getSkillName(1)}
                  skillIcon={role.getSkillIcon(1)}
                  skillDescription={role.getSkillDescription(1)}
                  disabled={true}
                />
                <SkillButton
                  skillName={role.getSkillName(2)}
                  skillIcon={role.getSkillIcon(2)}
                  skillDescription={role.getSkillDescription(2)}
                  disabled={true}
                />
              </SkillsContainer>
            </Column>

          </Modal.Body>
        </Modal>
      </ModalContainer>
    </View>
  )
}