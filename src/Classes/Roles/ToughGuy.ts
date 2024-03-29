import Role from "./Role";
import toughGuyImg from "../../../assets/images/toughGuy.png";
import firstSkillIcon from "../../../assets/images/roar.png";
import secondSkillIcon from "../../../assets/images/muscle.png";
import Player from "../Player";

export default class ToughGuy extends Role {
  constructor() {
    super(
      "Valentão",
      "Aldeões",
      "Human",
      false,
      toughGuyImg,
      "Seu objetivo é eliminar os lobisomens e ajudar os aldeões a vencerem o jogo.",
      {
        1: {
          name: "Provocar",
          description:
            "Uma vez por jogo você provoca os lobisomens forçando-os a te matarem. Há 20% de chance de um deles morrer com você.",
          isTargetType: false,
          enableTurn: -1,
          turnItWasDisabled: -1,
          icon: firstSkillIcon,
        },
        2: {
          name: "Parrudo",
          description:
            "Passivo: Quando você for atacado por lobisomens, você sobreviverá até o próximo dia.",
          isTargetType: false,
          enableTurn: 1000,
          turnItWasDisabled: -1,
          icon: secondSkillIcon,
        },
      }
    );
  }

  public provocar(): void {
    this.player!.setTaunt(true);
    this.disableSkill(1, 1000);
    this.killRandomWerewolf();
  }

  public killRandomWerewolf(): void {
    const werewolf: Player | undefined = this.currentGame!.alivePlayers.find((player) =>
      player.isWolf()
    );
    const deathNumber = Math.random();
    const deathChance = 0.2;
   if (werewolf && deathNumber <= deathChance) {
    werewolf.dieAfterManyTurns(1);
  }
  }
}
