import Role from "./Role";
import undeadImg from "../../../assets/images/zombie.png";
import firstSkillIcon from "../../../assets/images/denture.png";
import secondSkillIcon from "../../../assets/images/desintegration.png";

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
        name: "Mordida",
        description: "Morde um jogador infectando-o pelo restante da partida.",
        isTargetType: true,
        icon: firstSkillIcon,
      },
      {
        name: "Decompor-se",
        description: "Passivo: Você nâo pode votar nem ser morto durante a noite, mas sua vida só dura 1 turno e o necromante pode prolongá-la.",
        isTargetType: true,
        icon: secondSkillIcon,
      }
    );
    this.disabledSkills = {
      1: {
        duration: 0,
        turnItWasDisabled: -1,
      },
      2: {
        duration: 10000, //faz com que a habilidade seja passiva
        turnItWasDisabled: -1,
      },
    };
  }

  morder(targetPlayer) {
    targetPlayer.setInfected(true);
  }
}
