import { SkillsContainer } from "../../Styles";
import SkillButton from "../Buttons/SkillButton";

export default function SkillsChoiceContainer({ role, methods }) {
  const { isFirstSkillTargetType, isSecondSkillTargetType } =
    role.getSkillType();

  return (
    <SkillsContainer>
      <SkillButton
        onPress={
          isFirstSkillTargetType
            ? () => methods.useSkillTarget(1)
            : () => methods.useFirstSkill()
        }
        skillIcon={role.getSkillIcon(1)}
        skillName={role.getSkillName(1)}
        skillDescription={role.getSkillDescription(1)}
        disabled={role.isSkillDisabled(1)}
        showOpacity={role.isSkillDisabled(1)}
      />
      <SkillButton
        onPress={
          isSecondSkillTargetType
            ? () => methods.useSkillTarget(2)
            : () => methods.useSecondSkill()
        }
        skillIcon={role.getSkillIcon(2)}
        skillName={role.getSkillName(2)}
        skillDescription={role.getSkillDescription(2)}
        disabled={role.isSkillDisabled(2)}
        showOpacity={role.isSkillDisabled(2)}
      />
    </SkillsContainer>
  );
}
