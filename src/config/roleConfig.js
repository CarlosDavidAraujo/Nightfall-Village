//Esta funcao retorna um objeto muito importante
//ele controla a chamada dos metodos de cada role
//e em como eles influenciam na renderizacao dos componentes
//por isso ela deve receber todos os argumentos necessários para a execuçao dos metodos de cada role também para a renderizaçao dos componentes
//basicamente ele determina o comportamento do componente <PlayerAction> de acordo com cada role

const potionInstructions = {
    pavor: 'Poção de pavor. Selecione um jogador para impedi-lo de votar neste turno',
    confusão: 'Poção de confusão. Selecione um jogador, o voto dele será aleatório neste turno',
    manipulação: 'Poção de manipulação. Selecione um jogador para fazer ele ter voto com peso 2'
}

export default function useRoleConfig(
    currentGame,
    currentTurn,
    playerList,
    role,
    targetPlayer, setTargetPlayer,
    passTurn, setPassCondition,
    setChosenSkill,
    discoveredPlayer, setDiscoveredPlayer,
    setShowPlayers, setShowDeadPlayers,
    handleShowPlayers, handleShowDeadPlayers,
    potion, setPotion) {
    return {
        'Aldeão': {
            methods: {
                useFirstSkill: () => {
                    setChosenSkill(1);
                    const newDiscoveredPlayer = role.espiar(playerList, currentGame);
                    if (!newDiscoveredPlayer) {
                        return passTurn();
                    }
                    setDiscoveredPlayer(newDiscoveredPlayer);
                },
                useSecondSkill: () => {
                    role.orar(targetPlayer);
                    setTargetPlayer(null);
                    passTurn();
                },
                useSkillTarget: (skill) => {
                    setChosenSkill(skill);
                    handleShowPlayers();
                }
            },
            messages: {
                firstSkill: '',
                secondSkill: 'Selecione um jogador para tentar protege-lo',
                alert: discoveredPlayer,
            }
        },
        'Caçador': {
            methods: {
                useFirstSkill: () => {
                    role.atirar(targetPlayer, currentTurn);
                    setTargetPlayer(null);
                    passTurn();
                },
                useSecondSkill: () => {
                    role.capturar(targetPlayer, currentTurn);
                    setTargetPlayer(null);
                    passTurn();
                },
                useSkillTarget: (skill) => {
                    setChosenSkill(skill);
                    handleShowPlayers();
                }
            },
            messages: {
                firstSkill: 'Selecione um jogador para eliminar',
                secondSkill: 'Selecione um jogador para capturar',
                alert: '',
            }
        },
        'Cientista Maluco': {
            methods: {
                useFirstSkill: () => {
                    role.experimentar(targetPlayer);
                    setTargetPlayer(null);
                    passTurn();
                },
                useSecondSkill: () => {
                    role.usarPocao(potion, targetPlayer, currentTurn);
                    setTargetPlayer(null);
                    passTurn();
                },
                useSkillTarget: (skill, role) => {
                    setChosenSkill(skill);
                    handleShowPlayers();
                    setPotion(role.gerarPocao());
                }
            },
            messages: {
                firstSkill: 'Escolha a cobaia do experimetno',
                secondSkill: potionInstructions[potion],
                alert: '',
            }
        },
        'Cruzado': {
            methods: {
                useFirstSkill: () => {
                    role.sacrificar(targetPlayer);
                    setTargetPlayer(null);
                    passTurn();
                },
                useSecondSkill: () => {
                    role.julgar(targetPlayer, currentGame, currentTurn);
                    setTargetPlayer(null);
                    passTurn();
                },
                useSkillTarget: (skill) => {
                    setChosenSkill(skill);
                    handleShowPlayers();
                }
            },
            messages: {
                firstSkill: 'Selecione quem deseja proteger',
                secondSkill: 'Selecione quem será julgado',
                alert: '',
            }
        },
        'Lobisomem': {
            methods: {
                useFirstSkill: () => {
                    role.devorar(targetPlayer);
                    setTargetPlayer(null);
                    passTurn();
                },
                useSecondSkill: () => {
                    role.transmutar(currentTurn);
                    passTurn();
                },
                useSkillTarget: (skill) => {
                    setChosenSkill(skill);
                    if (skill === 1) {
                        handleShowPlayers();
                    }
                    else if (skill === 2) {
                        handleShowDeadPlayers();
                    }
                }
            },
            messages: {
                firstSkill: 'Vote em quem será devorado',
                secondSkill: '',
                alert: '',
            }
        },
        'Lobisomem solitário': {
            methods: {
                useFirstSkill: () => {
                    role.devorar(targetPlayer);
                    setTargetPlayer(null);
                    passTurn();
                },
                useSecondSkill: () => {
                    role.transmutar(currentTurn);
                    passTurn();
                },
                useSkillTarget: (skill) => {
                    setChosenSkill(skill);
                    if (skill === 1) {
                        handleShowPlayers();
                    }
                    else if (skill === 2) {
                        handleShowDeadPlayers();
                    }
                }
            },
            messages: {
                firstSkill: 'Vote em quem será devorado',
                secondSkill: '',
                alert: '',
            }
        },
        'Médica': {
            methods: {
                useFirstSkill: () => {
                    role.curar(targetPlayer, currentGame);
                    setTargetPlayer(null);
                    passTurn();
                },
                useSecondSkill: () => {
                    role.reanimar(targetPlayer, currentGame, currentTurn);
                    setTargetPlayer(null);
                    passTurn();
                },
                useSkillTarget: (skill) => {
                    setChosenSkill(skill);
                    if (skill === 1) {
                        handleShowPlayers();
                    }
                    else if (skill === 2) {
                        handleShowDeadPlayers();
                    }
                }
            },
            messages: {
                firstSkill: 'Selecione quem deseja proteger',
                secondSkill: 'Selecione quem será julgado',
                alert: '',
            }
        },
        'Vidente': {
            methods: {
                useFirstSkill: () => {
                    setDiscoveredPlayer(role.revelar(targetPlayer));
                    setTargetPlayer(null);
                    setShowPlayers(false);
                    setPassCondition(true);
                },
                useSecondSkill: () => {
                    setDiscoveredPlayer(role.contactar(targetPlayer));
                    setTargetPlayer(null);
                    setShowDeadPlayers(false);
                    setPassCondition(true);
                },
                useSkillTarget: (skill) => {
                    setChosenSkill(skill);
                    if (skill === 1) {
                        handleShowPlayers();
                    }
                    else if (skill === 2) {
                        handleShowDeadPlayers();
                    }
                }
            },
            messages: {
                firstSkill: 'Selecione um jogador para ver sua função',
                secondSkill: 'Selecione um jogador para ver sua função',
                alert: discoveredPlayer,
            }
        },
        'Bruxa': {
            methods: {
                useFirstSkill: () => {
                    role.amaldicoar(targetPlayer, currentTurn);
                    setTargetPlayer(null);
                    setShowPlayers(false);
                    passTurn();
                },
                useSecondSkill: () => {
                    setDiscoveredPlayer(role.prever(targetPlayer));
                    setTargetPlayer(null);
                    setShowPlayers(false);
                    setPassCondition(true);
                },
                useSkillTarget: (skill) => {
                    setChosenSkill(skill);
                    handleShowPlayers();
                }
            },
            messages: {
                firstSkill: 'Selecione um jogador para amaldiçoar',
                secondSkill: 'Selecione um jogador para ver se ele é lobisomem ou vidente',
                alert: discoveredPlayer,
            }
        }
    };

} 