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
                target: true,
                icon: firstSkillIcon
            },
            {
                name: 'Julgamento',
                description: 'Escolha um jogador. Se for um lobisomem, ele será exposto, se for um aldeão, por 2 rodadas você não pode votar e julgamento é bloqueado.',
                target: true,
                icon: secondSkillIcon
            }
        );
    }

    sacrificar(otherPlayer) {
        otherPlayer.setProtected(true);
        otherPlayer.setProtector(this.player); //seta o cruzado como protetor do jogador alvo
    }

    julgar(otherPlayer, currentGame, currentTurn) {
        const otherPlayerTeam = otherPlayer.getRole().getTeam();
        if (otherPlayerTeam === 'Lobisomens') {
            const news = currentGame.getNews();
            news.addNews(`${otherPlayer.getName()} é um lobisomem entre nós!`);
        }
        else {
            this.blockSkill(2, 2, currentTurn);  //bloqueia a habilidade 2 por 2 turnos
            this.player.blockVote(2); //bloqueia os votos por 2 turnos
        }
    }
}
