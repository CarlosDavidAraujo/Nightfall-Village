import Role from "./Role";
import scientistImg from '../../assets/images/scientist.png';
import firstSkillIcon from '../../assets/images/tube.png';
import secondSkillIcon from '../../assets/images/potion.png';
import WereWolf from "./Werewolf";
import Villager from "./Villager";

export default class Scientist extends Role {
    constructor() {
        super(
            "Cientista Maluco",
            "Aldeões",
            'Human',
            false,
            scientistImg,
            'ajudar a eliminar os lobisomens, mas tudo que você faz é imprevisível.',
            {
                name: 'Experimento',
                description: 'Uma vez por jogo escolha um jogador. Se for um lobisomem, transforme-o em aldeão. Se for aldeão transforme-o em lobisomem.',
                target: true,
                icon: firstSkillIcon
            },
            {
                name: 'Alquimia',
                description: 'Crie 1 de 3 poções aleatórias (pavor, confusão ou manipulação), sem repetir a mesma poção a cada turno. Bloqueia "Alquimia" após 3 usos.',
                target: true,
                icon: secondSkillIcon
            }
        );
        this.potions = {
            'pavor': (otherPlayer, currentTurn) => otherPlayer.blockVote(1, currentTurn), //nao pode votar por 1 turno
            'confusão': otherPlayer => otherPlayer.setConfused(true), //voto aleatorio por 1 turno
            'manipulação': otherPlayer => otherPlayer.setDoubleVote(true) //voto duplo por um turno
        };
    }

    experimentar(otherPlayer) {
        const playerTeam = otherPlayer.getRole().getTeam();
        if (playerTeam === 'Aldeões') {
            const werewolf = new WereWolf();
            otherPlayer.setRole(werewolf);
            werewolf.setPlayer(otherPlayer);
        }
        else if (playerTeam === 'Lobisomens') {
            const villager = new Villager();
            otherPlayer.setRole(villager);
            villager.setPlayer(otherPlayer);
        }
        this.player.blockSkill(1, 1000, currentTurn); //bloqueia experimentar ate o final do jogo
    }

    usarPocao(potion, otherPlayer, currentTurn) {
        const action = this.potions[potion];
        if (action) {
            action(otherPlayer, currentTurn);
            delete this.potions[potion];
        }
        if (Object.keys(this.potions).length === 0) { //bloqueia alquimia até o final do jogo quando não houver mais poções para serem usadas
            this.blockSkill(2, 1000, currentTurn); 
        }
    }

    gerarPocao() {
        const potionKeys = Object.keys(this.potions);
        const randomIndex = Math.floor(Math.random() * potionKeys.length);
        const potion = potionKeys[randomIndex];
        return potion;
    }
}
