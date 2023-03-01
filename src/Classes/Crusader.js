import Role from "./Role";
import crusaderImg from '../../assets/images/crusader.png';
import firstSkillIcon from '../../assets/images/shield.png';
import secondSkillIcon from '../../assets/images/balance.png';

export default class Crusader extends Role {
    constructor() {
        super(
            "Cruzado",
            "Aldeões",
            'Human',
            false,
            crusaderImg,
            'proteger os aldeões e descobrir os lobisomens.',
            {
                name: 'Sacrifício',
                description: 'Escolha um jogador. Se ele iria morrer esta noite você morre no lugar dele.',
                isTargetType: true,
                icon: firstSkillIcon
            },
            {
                name: 'Julgamento',
                description: 'Escolha um jogador. Se for um lobisomem, ele será exposto, se for um aldeão, por 2 rodadas você não pode votar e julgamento é bloqueado.',
                isTargetType: true,
                icon: secondSkillIcon
            }
        );
    }

    sacrificar(targetPlayer) {
        targetPlayer.setProtected(true);
        targetPlayer.setProtector(this.player);
    }

    julgar(targetPlayer) {
        const targetPlayerTeam = targetPlayer.getRole().getTeam();
        if (targetPlayerTeam === 'Lobisomens') {
            const news = this.currentGame.getNews();
            news.addNews(`${targetPlayer.getName()} é um lobisomem entre nós!`);
        }
        else {
            this.disableSkill(2, 2);
            this.player.disableVote(2); 
        }
    }
}
