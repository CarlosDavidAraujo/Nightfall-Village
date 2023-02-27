import Role from "./Role";
import doctorImg from '../../assets/images/doctor.png';
import firstSkillIcon from '../../assets/images/medicine.png';
import secondSkillIcon from '../../assets/images/syringe.png';

export default class Doctor extends Role {
    constructor() {
        super(
            "Médica",
            "Aldeões",
            'Human',
            true,
            doctorImg,
            'manter os aldeões vivos',
            {
                name: 'Curar',
                description: 'Impede um jogador de morrer esta noite. Não pode selecionar o mesmo alvo em turnos seguidos.',
                target: true,
                icon: firstSkillIcon
            },
            {
                name: 'Reanimar',
                description: 'Uma vez por jogo ressuscite um jogador eliminado.',
                target: true,
                icon: secondSkillIcon
            }
        );
        this.lastHealedPlayer = null; //ultimo jogador curado
        this.lastHealedTurn = -1; //inicia em -1 para permitir o uso no primeiro turno
        this.lastAction = null;
    }

    curar(otherPlayer, currentGame) {
        otherPlayer.setProtected(true);
        this.lastHealedPlayer = otherPlayer;
        this.lastHealedTurn = currentGame.getCurrentTurn();
        this.lastAction = 'heal'
    }

    reanimar(otherPlayer, currentTurn) {
        otherPlayer.setMarkedForRess(true);
        this.blockSkill(2, 1000, currentTurn);
        this.lastAction = 'ress'
    }

    //se o ultimo jogador curado for o jogador alvo e o ultimo turno em que a habildaide foi usado foi o turno anterior o alvo sera invalido
    //isso impede da habilidade curar ser usada no mesmo alvo 2 turnos seguidos
    hasInvalidTargetOn(otherPlayer, currentTurn) {
        return this.lastHealedPlayer === otherPlayer && this.lastHealedTurn === currentTurn - 1 && this.lastAction === 'heal';
    }
}
