import Role from "./Role";
import necroImg from "../../../assets/images/necromancer.png";
import firstSkillIcon from "../../../assets/images/deathClock.png";
import secondSkillIcon from "../../../assets/images/deadHand.png";

export default class Necromancer extends Role {
  constructor() {
    super(
      "Necromante",
      "Undeads",
      "Undead",
      true,
      necroImg,
      "Seu objetivo é agir em conjunto com o zumbi para infectar toda a aldeia. Vocês vencerão quando todos estiverem infectados.",
      {
        1: {
          name: "Perpetuar",
          description:
            "Escolha um zumbi alvo, a vida dele é extendida por mais 1 turno. Isso nao previne dele ser morto na votação",
          isTargetType: true,
          enableTurn: -1,
          turnItWasDisabled: -1,
          icon: firstSkillIcon,
        },
        2: {
          name: "Recompor",
          description:
            "Uma vez por jogo você escolhe um jogador eliminado, ele volta ao jogo como um zumbi com habilidades próprias.",
          isTargetType: true,
          enableTurn: -1,
          turnItWasDisabled: -1,
          icon: secondSkillIcon,
        },
      }
    );
  }

  perpetuar(targetPlayer) {
    targetPlayer.dieAfterManyTurns(2);
  }

  recompor(targetPlayer) {
    targetPlayer.resurrectAfterManyTurns(1);
    targetPlayer.transformInUndead();
    this.disableSkill(2, 1000);
  }

  skillHasInvalidTargetOn(targetPlayer, chosenSkill) {
    return !targetPlayer.isUndead() && chosenSkill === 1;
  }

  isSkillDisabled(skill) {
    const hasNoZombiesToTarget =
      this.currentGame.deathManager.noExistingZombies() && skill === 1;
    return super.isSkillDisabled(skill) || hasNoZombiesToTarget;
  }
}
