import Role from "./Role";
import hunterImg from "../../../assets/images/hunter.png";
import firstSkillIcon from "../../../assets/images/target.png";
import secondSkillIcon from "../../../assets/images/trap.png";
import Zombie from "./Zombie";

export default class Necromancer extends Role {
  constructor() {
    super(
      "Necromante",
      "Neutro",
      "Human",
      true,
      hunterImg,
      "transformar todos os habitantes em um exercito de zumbis.",
      {
        name: "Aperfeiçoar",
        description:
          "A cada turno você pode aperfeiçoar seu zumbi, fazendo com que ele ganhe novas habilidades.",
        isTargetType: true,
        icon: secondSkillIcon,
      },
      {
        name: "Recomposição",
        description:
          "Uma vez por jogo você escolhe um jogador eliminado, ele volta ao jogo como um zumbi com habilidades próprias.",
        isTargetType: true,
        icon: firstSkillIcon,
      }
    );
  }

  recompor(targetPlayer) {
    targetPlayer.resurrectAfterManyTurns(1);
    targetPlayer.transformInZombie();
    this.disableSkill(1, 1000);
  }

  capturar(targetPlayer) {
    const targetPlayerRole = targetPlayer.getRole();
    targetPlayerRole.disableSkill(1, 1);
    targetPlayerRole.disableSkill(2, 1);
    this.disableSkill(2, 1);
  }
}
