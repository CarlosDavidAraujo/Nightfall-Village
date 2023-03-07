import Role from "./Role";
import witchImg from "../../../assets/images/witch.png";
import firstSkillIcon from "../../../assets/images/darkPotion.png";
import secondSkillIcon from "../../../assets/images/crystalBall.png";

export default class Witch extends Role {
  constructor() {
    super(
      "Bruxa",
      "Lobisomens",
      "Human",
      false,
      witchImg,
      "Seu objetivo é descobrir quem são os videntes e atrapalhar os aldeões para que os lobisomens vençam.",
      {
        1: {
          name: "Maldição",
          description:
            "Você bloqueia uma habilidade aleatória de um jogador por 1 turno. Não pode selecionar o mesmo alvo em turnos seguidos.",
          isTargetType: true,
          enableTurn: -1,
          turnItWasDisabled: -1,
          icon: firstSkillIcon,
        },
        2: {
          name: "Premonição",
          description:
            "Selecione um jogador para ver se ele é lobisomem ou vidente",
          isTargetType: true,
          enableTurn: -1,
          turnItWasDisabled: -1,
          icon: secondSkillIcon,
        },
      }
    );
    this.lastCursedTarget = null;
    this.lastTurnOfCurseUse = -1;
  }

  amaldicoar(targetPlayer) {
    const targetPlayerRole = targetPlayer.getRole();
    const randomSkill = Math.floor(Math.random() * 2) + 1;
    targetPlayerRole.disableSkill(randomSkill, 1);
    this.lastCursedTarget = targetPlayer;
    this.lastTurnOfCurseUse = this.currentGame.getCurrentTurn();
  }

  prever(targetPlayer) {
    const isSeer = targetPlayer.getRoleName() === "Vidente";
    const isWerewolf = targetPlayer.isWolf();
    if (isSeer) {
      return `A visão é clara! ${targetPlayer.getName()} é um vidente.`;
    }
    if (isWerewolf) {
      return `A visão é clara! ${targetPlayer.getName()} é um ${targetPlayer.getRoleName()}.`;
    }
    if (!isWerewolf && !isSeer) {
      return `${targetPlayer.getName()} não é vidente nem lobisomem.`;
    }
  }

  hasInvalidTargetOn(targetPlayer, chosenSkill) {
    const usingOnSameTarget = this.lastCursedTarget === targetPlayer;
    const curseWasUsedLastTurn =
      this.lastTurnOfCurseUse === this.currentGame.getCurrentTurn() - 1;
    return (
      usingOnSameTarget && curseWasUsedLastTurn && chosenSkill === 1 //somente para a habilidade amaldiçoar
    );
  }
}
