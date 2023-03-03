import Role from "./Role";
import hunterImg from "../../../assets/images/hunter.png";
import firstSkillIcon from "../../../assets/images/target.png";
import secondSkillIcon from "../../../assets/images/trap.png";

export default class Hunter extends Role {
  constructor() {
    super(
      "Caçador",
      "Aldeões",
      "Human",
      false,
      hunterImg,
      "eliminar os lobisomens e ajudar os aldeões a vencerem o jogo.",
      {
        name: "Atirar",
        description:
          "Uma vez por jogo você escolhe um jogador. Ele é eliminado.",
        isTargetType: true,
        icon: firstSkillIcon,
      },
      {
        name: "Capturar",
        description:
          "Impede um jogador de usar habilidades na próxima rodada. Recarrega após um turno.",
        isTargetType: true,
        icon: secondSkillIcon,
      }
    );
  }

  atirar(targetPlayer) {
    targetPlayer.dieAfterManyTurns(1); 
    this.disableSkill(1, 1000);
  }

  capturar(targetPlayer) {
    const targetPlayerRole = targetPlayer.getRole();
    targetPlayerRole.disableSkill(1, 1);
    targetPlayerRole.disableSkill(2, 1);
    this.disableSkill(2, 1);
  }
}
