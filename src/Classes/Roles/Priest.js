import Role from "./Role";
import priestImg from "../../../assets/images/priest.png";
import firstSkillIcon from "../../../assets/images/cross.png";
import secondSkillIcon from "../../../assets/images/sun.png";

export default class Priest extends Role {
  constructor() {
    super(
      "Padre",
      "Aldeões",
      "Human",
      false,
      priestImg,
      "Seu objetivo é ajudar os aldeões a eliminarem os lobisomens.",
      {
        1: {
          name: "Exorcismo",
          description:
            "Uma vez por jogo você escolhe um jogador. Se for um lobisomem ele é eliminado, se for um aldeão você é eliminado.",
          isTargetType: true,
          enableTurn: -1,
          turnItWasDisabled: -1,
          icon: firstSkillIcon,
        },
        2: {
          name: "Iluminado",
          description:
            "Passivo: A primeira vez que os lobisomens tentarem te matar você sobreviverá.",
          isTargetType: false,
          enableTurn: 1000, 
          turnItWasDisabled: -1,
          icon: secondSkillIcon,
        },
      }
    );
  }

  exorcizar(targetPlayer) {
    this.disableSkill(1, 1000);
    if (targetPlayer.isWolf()) {
      return targetPlayer.dieAfterManyTurns(1);
    }
    if (targetPlayer.belongsToVillagersTeam()) {
      return this.player.dieAfterManyTurns(1);
    }
  }
}
