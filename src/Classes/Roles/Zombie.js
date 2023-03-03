import Role from "./Role";
import hunterImg from "../../../assets/images/hunter.png";
import firstSkillIcon from "../../../assets/images/target.png";
import secondSkillIcon from "../../../assets/images/trap.png";

export default class Zombie extends Role {
  constructor() {
    super(
      "Zumbi",
      "Neutro",
      "Human",
      false,
      hunterImg,
      "Você é um zumbi, você nâo pode votar, nem falar.",
      {
        name: "Infectar",
        description:
          "Você escolhe um jogador, ele ficará infectado pelo restante da partida, se ele iria morrer, ao invés disso ele se torna um zumbi.",
        isTargetType: true,
        icon: firstSkillIcon,
      },
      {
        name: "Decomposição",
        description:
          "Passivo: Você nâo pode ser morto, mas morrerá automaticamente após 1 turno.",
        isTargetType: true,
        icon: secondSkillIcon,
      }
    );
  }

  infectar(targetPlayer) {
    targetPlayer.setInfected(true);
  }
}
