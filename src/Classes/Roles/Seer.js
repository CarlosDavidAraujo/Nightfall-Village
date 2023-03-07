import Role from "./Role";
import seerImg from "../../../assets/images/seer3.png";
import firstSkillIcon from "../../../assets/images/seerEye.png";
import secondSkillIcon from "../../../assets/images/tarot.png";

export default class Seer extends Role {
  constructor() {
    super(
      "Vidente",
      "Aldeões",
      "Human",
      true,
      seerImg,
      "Seu objetivo é descobrir quem são os lobisomens e ajudar os aldeões a vencerem o jogo.",
      {
        1: {
          name: "Revelar",
          description: "Você pode ver a função de outro jogador.",
          isTargetType: true,
          enableTurn: -1,
          turnItWasDisabled: -1,
          icon: firstSkillIcon,
        },
        2: {
          name: "Contactar",
          description: "Você pode ver a função de um jogador que ja morreu.",
          isTargetType: true,
          enableTurn: -1,
          turnItWasDisabled: -1,
          icon: secondSkillIcon,
        },
      }
    );
  }

  revelar(targetPlayer) {
    return `A verdade foi revelada! ${targetPlayer.getName()} é ${targetPlayer
      .getRole()
      .getFakeName()}. Fique atento à sua jogada!`;
  }

  contactar(targetPlayer) {
    return `A verdade foi revelada! ${targetPlayer.getName()} era ${targetPlayer.getRoleName()}.`;
  }
}
