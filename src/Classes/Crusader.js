import Role from "./Role";
import hunterImg from '../../assets/images/hunter.png';
import firstSkillIcon from '../../assets/images/target.png';
import secondSkillIcon from '../../assets/images/trap.png';

export default class Crusader extends Role {
    constructor() {
        super(
            "Cruzado",
            "Aldeões",
            hunterImg,
            'proteger os aldeões e descobrir os lobisomens',
            'Sacrifício',
            'Escolha um jogador. Se ele iria morrer esta noite você morre no lugar dele.',
            firstSkillIcon,
            'Julgamento',
            'Escolha um jogador. Se for um lobisomem, ele será exposto, se for um aldeão você, por 2 rodadas você não pode votar e julgamento é bloqueado.',
            secondSkillIcon
        );
    }

    sacrificar(otherPlayer) {
        otherPlayer.setProtected(true);
        otherPlayer.setProtector(this.player); //seta o cruzado como protetor do jogador alvo
    }

    julgar(otherPlayer, currentGame) {
        const otherPlayerTeam = otherPlayer.getRole().getTeam();
        if (otherPlayerTeam === 'Lobisomens') {
            const news = currentGame.getNews();
            news.addNews(`${otherPlayer.getName()} é um lobisomem entre nós!`);
        }
        else {
            this.player.blockSkill(2, 2); //bloqueia a habilidade 2 por 2 turnos
            this.player.blockVote(2); //bloqueia os votos por 2 turnos
        }
    }
}
