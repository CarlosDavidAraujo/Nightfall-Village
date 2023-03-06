import Role from "./Role";
import killerImg from "../../../assets/images/assassin.png";
import firstSkillIcon from "../../../assets/images/target.png";
import secondSkillIcon from "../../../assets/images/trap.png";

export default class Assassin extends Role {
  constructor() {
    super(
      "Assassino em Série",
      "Solo",
      "Human",
      false,
      killerImg,
      "Seu objetivo é eliminar todos os jogadores. Quando todos forem eliminados você vence.",
      {
        name: "Assassinato",
        description: "Todo turno você escolhe um jogador para eliminar.",
        isTargetType: true,
        icon: firstSkillIcon,
      },
      {
        name: "Sequestro",
        description:
          "Uma vez por jogo você pode sequestrar um jogador. Ele é impedido de usar habilidades por 2 turnos.",
        isTargetType: true,
        icon: secondSkillIcon,
      }
    );
  }

  assassinar(targetPlayer) {
    targetPlayer.dieAfterManyTurns(1);
  }

  sequestrar(targetPlayer) {
    const targetPlayerRole = targetPlayer.getRole();
    targetPlayerRole.disableSkill(1, 2);
    targetPlayerRole.disableSkill(2, 2);
    this.disableSkill(2, 1000);
  }
}
