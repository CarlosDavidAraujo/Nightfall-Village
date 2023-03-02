import Role from "./Role";
import hunterImg from '../../../assets/images/hunter.png';
import firstSkillIcon from '../../../assets/images/target.png';
import secondSkillIcon from '../../../assets/images/trap.png';

export default class Necromancer extends Role {
    constructor(currentGame) {
        super(
            currentGame,
            "Necromante",
            "Neutro",
            'Human',
            false,
            hunterImg,
            'transformar todos os habitantes em um exercito de zumbis.',
            {
                name: 'Recomposição',
                description: 'Uma vez por jogo você escolhe um jogador eliminado, ele volta ao jogo como um zumbi com habilidades próprias.',
                isTargetType: true,
                icon: firstSkillIcon
            },
            {
                name: 'Aperfeiçoar',
                description: 'A cada turno você pode aperfeiçoar seu zumbi, fazendo com que ele ganhe novas habilidades.',
                isTargetType: true,
                icon: secondSkillIcon
            }
        );
    }

    recompor(targetPlayer) {
        targetPlayer.setMarkedForRess(true);
        const zumbi = new Necromancer();
        zumbi.setCurrentGame(this.currentGame);
        targetPlayer.setRole(zumbi);
        zumbi.setPlayer(targetPlayer);
        this.disableSkill(1, 1000);
    }

    capturar(targetPlayer) {
        const targetPlayerRole = targetPlayer.getRole();
        targetPlayerRole.disableSkill(1, 1);
        targetPlayerRole.disableSkill(2, 1);
        this.disableSkill(2, 1);
    }
}
