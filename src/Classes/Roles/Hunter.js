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
      "Seu objetivo é eliminar os lobisomens e ajudar os aldeões a vencerem o jogo.",
      {
        1: {
          name: "Atirar",
          description:
            "Uma vez por jogo você escolhe um jogador. Ele é eliminado.",
          isTargetType: true,
          enableTurn: -1,
          turnItWasDisabled: -1,
          icon: firstSkillIcon,
        },
        2: {
          name: "Armadilha",
          description:
            "Impede um jogador de usar habilidades na próxima rodada. Recarrega após dois turnos.",
          isTargetType: true,
          enableTurn: -1,
          turnItWasDisabled: -1,
          icon: secondSkillIcon,
        },
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
    this.disableSkill(2, 2);
  }
}
