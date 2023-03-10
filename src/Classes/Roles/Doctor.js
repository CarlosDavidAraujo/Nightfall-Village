import Role from "./Role";
import doctorImg from "../../../assets/images/doctor.png";
import firstSkillIcon from "../../../assets/images/medicine.png";
import secondSkillIcon from "../../../assets/images/syringe.png";

export default class Doctor extends Role {
  constructor() {
    super(
      "Médica",
      "Aldeões",
      "Human",
      true,
      doctorImg,
      "Seu objetivo é proteger e manter os aldeões vivos.",
      {
        1: {
          name: "Curar",
          description:
            "Impede um jogador de morrer esta noite. Não pode selecionar o mesmo alvo em turnos seguidos.",
          isTargetType: true,
          enableTurn: -1,
          turnItWasDisabled: -1,
          icon: firstSkillIcon,
        },
        2: {
          name: "Reanimar",
          description: "Uma vez por jogo ressuscite um jogador eliminado.",
          isTargetType: true,
          enableTurn: -1,
          turnItWasDisabled: -1,
          icon: secondSkillIcon,
        },
      }
    );
    this.lastHealedTarget = null;
    this.lastTurnOfHealUse = -1;
  }

  curar(targetPlayer) {
    targetPlayer.setProtectedTurnsDuration(1);
    this.lastHealedTarget = targetPlayer;
    this.lastTurnOfHealUse = this.currentGame.getCurrentTurn();
  }

  skillHasInvalidTargetOn(targetPlayer, chosenSkill) {
    const usingOnSameTarget = this.lastHealedTarget === targetPlayer;
    const healWasUsedLastTurn =
      this.lastTurnOfHealUse === this.currentGame.getCurrentTurn() - 1;
    return (
      usingOnSameTarget && healWasUsedLastTurn && chosenSkill === 1 //somente para a habilidade curar
    );
  }

  reanimar(targetPlayer) {
    targetPlayer.resurrectAfterManyTurns(1);
    this.disableSkill(2, 1000);
  }
  
  isSkillDisabled(skill) {
    return super.isSkillDisabled(skill) || (!this.canInteractWithDeadPlayers() && skill === 2);
  }
}
