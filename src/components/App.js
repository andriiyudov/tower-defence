import React, { Component } from 'react';

import Header from './Header';
import Board from './Board';

import { randomIntNumbers, difficultParams } from '../constants';

import '../styles/App.css';

class App extends Component {
    state = {
        towerInf: {
            hp: 10000,
        },

        isGameStarted: false,
        isGameLose: false,
        isGameWin: false,

        playerSet: {
            damage: 10,
            bulletSpeed: 6,
            bulletRadius: 10,
        },

        enemySet: {
            damage: 20,
            speed: 30,
            hp: 30,

            isDisplay: false,
            delay: 1000,
            id: null,
        },

        enemiesCount: 100,
        enemies: [],

        message: '',
    }

    initialState = {...this.state}

    componentDidUpdate() {
        const { isGameStarted } = this.state;

        if (isGameStarted) {
            this.checkTowerHp();
            this.checkEnemies();
        }
    }


    handleEnemyHit = enemy => {
        const { damage, id } = enemy;

        this.setState(prevState =>
            ({ towerInf: { ...prevState.towerInf, hp: prevState.towerInf.hp - damage } }),
            () => this.removeEnemy(id)
        )
    }

    handlePlayerHit = enemyId => {
        const { playerSet, enemies: ens } = this.state;

        let hp, removeFunc;

        const enemies = ens.map(enemy => {
            if (enemy.id === enemyId) {
                hp = enemy.hp - randomIntNumbers(playerSet.damage/2, playerSet.damage * 1.5 );

                if (hp <= 0) {
                    removeFunc = this.removeEnemy.bind(this, enemy.id);
                }

                return { ...enemy, hp }
            }

            return enemy;
        });

        this.setState({ enemies }, removeFunc);
    }



    removeEnemy = enemyId => {
        const enemies = this.state.enemies.filter(enemy => enemy.id !== enemyId);

        this.setState({ enemies });
    }



    displayAllWithDelay = () => {
        const { enemiesCount } = this.state;
        let count = 0, enemies;

        this.timerId = setInterval(() => {
            if (count === enemiesCount) {
                clearInterval(this.timerId);

                return;
            }

            enemies = this.state.enemies.map(enemy => enemy.id === count ?
                                                          {...enemy, isDisplay: true} :
                                                          enemy
                                            );

            this.setState(() => ({ enemies }) );

            count++;
        }, 1500);
    }



    setGameStatus = (isGameStarted, isGameWin, isGameLose, message) => {
        this.setState({ isGameStarted, isGameWin, isGameLose , message });
    }



    checkTowerHp = () => {
        if (this.state.towerInf.hp <= 0) {
            this.setGameStatus(false, false, true, 'You lose! Try again!');
        }
    }

    checkEnemies = () => {
        if (this.state.enemies.length <= 0) {
            this.setGameStatus(false, true, false, 'You win! Congratulations!');
        }
    }



    newGame = () => {
        clearInterval(this.timerId);

        const { enemySet, enemiesCount } = this.state;

        const enemies = [];
        let delay;

        for (let i = 0; i < enemiesCount; i++) {
            delay = enemySet.delay * i + 1000;

            enemies.push({...enemySet,
                            id: i,
                            delay,
                        });
        }

        this.setState({ enemies: [] },
                      () => this.setState({ ...this.initialState,
                                isGameStarted: true,
                                enemies,
                            }, this.displayAllWithDelay)
        );
    }

    stopGame = () => {
        clearInterval(this.timerId);

        this.setState(this.initialState);
    }

    setDifficult = e => {
        const difficultName = e.target.dataset.difficult;

        if (!difficultParams[difficultName]) return;

        const difficult = difficultParams[difficultName];

        this.setState(prevState => ({
                                        playerSet: { ...prevState.playerSet, ...difficult.playerSet },
                                        enemySet: { ...prevState.enemySet, ...difficult.enemySet },
                                        enemiesCount: difficult.enemiesCount,
                                    })
        );
    }


    render() {
        const {
            towerInf,
            message,
            isGameStarted,
            enemySet,
            playerSet,
            enemies,
            enemiesCount,
        } = this.state;

        return (
            <div className='App'>
                <Header towerInf={towerInf}
                        newGame={this.newGame}
                        isGameStarted={isGameStarted}
                        stopGame={this.stopGame}
                        enemiesCount={enemiesCount}
                        currentEnemiesCount={enemies.length}
                        setDifficult={this.setDifficult}
                />

                <Board handleEnemyHit={this.handleEnemyHit}
                       message={message}
                       newGame={this.newGame}
                       isGameStarted={isGameStarted}
                       enemySet={enemySet}
                       playerSet={playerSet}
                       enemies={enemies}
                       handlePlayerHit={this.handlePlayerHit}
                       stopGame={this.stopGame}
                />
            </div>
        );
    }
}

export default App;
