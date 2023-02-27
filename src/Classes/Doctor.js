import Role from "./Role";
import doctorImg from "../../assets/images/doctor.png";
import firstSkillIcon from "../../assets/images/medicine.png";
import secondSkillIcon from "../../assets/images/syringe.png";

export default class Doctor extends Role {
  constructor() {
    super(
      "Médica",
      "Aldeões",
      "Human",
      true,
      doctorImg,
      "manter os aldeões vivos",
      {
        name: "Curar",
        description:
          "Impede um jogador de morrer esta noite. Não pode selecionar o mesmo alvo em turnos seguidos.",
        target: true,
        icon: firstSkillIcon,
      },
      {
        name: "Reanimar",
        description: "Uma vez por jogo ressuscite um jogador eliminado.",
        target: true,
        icon: secondSkillIcon,
      }
    );
    this.lastHealedPlayer = null; //ultimo jogador curado
    this.lastHealedTurn = -1; //inicia em -1 para permitir o uso no primeiro turno
  }

  curar(otherPlayer, currentGame) {
    otherPlayer.setProtected(true);
    this.lastHealedPlayer = otherPlayer;
    this.lastHealedTurn = currentGame.getCurrentTurn();
  }

  reanimar(otherPlayer, currentTurn) {
    otherPlayer.setMarkedForRess(true);
    this.blockSkill(2, 1000, currentTurn);
  }

  //não pode curar o mesmo alvo do turno anterior
  hasInvalidTargetOn(otherPlayer, currentTurn, chosenSkill) {
    return (
      this.lastHealedPlayer === otherPlayer &&
      this.lastHealedTurn === currentTurn - 1 &&
      chosenSkill === 1
    );
  }
}
