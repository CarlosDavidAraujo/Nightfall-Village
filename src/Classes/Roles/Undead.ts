import Role from "./Role";
import undeadImg from "../../../assets/images/zombie.png";
import firstSkillIcon from "../../../assets/images/denture.png";
import secondSkillIcon from "../../../assets/images/desintegration.png";
import Player from '../Player';

export default class Undead extends Role {
  constructor() {
    super(
      "Zumbi",
      "Undeads",
      "Undead",
      false,
      undeadImg,
      "Seu objetivo é infectar o máximo de pessoas e agir em conjunto com o necromante. Quando todos estiverem infectados vocês vencem.",
      {
        1: {
          name: "Mordida",
          description:
            "Morde um jogador infectando-o pelo restante da partida.",
          isTargetType: true,
          enableTurn: -1,
          turnItWasDisabled: -1,
          icon: firstSkillIcon,
        },
        2: {
          name: "Pútrido",
          description:
            "Passivo: Sua vida só dura um turno, apenas o necromante pode prolongá-la. Você nâo pode votar nem ser morto durante a noite, .",
          isTargetType: false,
          enableTurn: 1000,
          turnItWasDisabled: -1,
          icon: secondSkillIcon,
        },
      }
    );
  }

  public morder(targetPlayer: Player): void {
    targetPlayer.setInfected(true);
  }
}
