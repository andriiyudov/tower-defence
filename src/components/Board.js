import React, { Component } from 'react';

import Tower from './Tower';
import Enemies from './Enemies';
import Player from './Player';
import DisplayMessage from './DisplayMessage';

import '../styles/Board.css';

export default class Board extends Component {
    state = {
        bullets: [],
        uniqueId: 0,
    }

    changeCursonPos = e => {
        if (!this.props.isGameStarted) return;

        this.e = {...e};
    }

    removeBurstFireTimer = () => {
        clearInterval(this.timerId);
    }



    burstShooting = e => {
        if (!this.props.isGameStarted) return;

        clearInterval(this.timerId);

        this.e = {...e};
        this.playerShoot();
        this.timerId = setInterval(() => this.playerShoot(), 300);
    }

    playerShoot = () => {
        let { uniqueId } = this.state;
        const { playerSet } = this.props;

        const { bulletSpeed, bulletRadius } = playerSet;

        let {
            clientX: x,
            clientY: y,
        } = this.e;

        let bullets = [...this.state.bullets];


        x = window.innerWidth - (x + this.e.target.offsetLeft);
        y = y - +this.e.target.offsetTop;

        bullets.push({
            x,
            y,
            id: uniqueId,
            speed: bulletSpeed,
            radius: bulletRadius,
        });

        uniqueId++;

        this.setState(() => ({ bullets, uniqueId }) );
    }

    removeBullet = id => {
        let bullets = this.state.bullets.filter(bullet => bullet.id !== id);

        this.setState(() => ({ bullets }) );
    }


    render() {
        const {
            handleEnemyHit,
            message,
            newGame,
            isGameStarted,
            enemySet,
            playerSet,
            enemies,
            handlePlayerHit,
            stopGame,
        } = this.props;
        const { bullets } = this.state;
        const isMessage = !!message.length;

        return (
            <div className='Board'
                 onMouseDown={this.burstShooting}
                 onMouseMove={this.changeCursonPos}
                 onMouseUp={this.removeBurstFireTimer}
            >
                <Tower />
                <Player isGameStarted={isGameStarted}
                        playerSet={playerSet}
                        bullets={bullets}
                        removeBullet={this.removeBullet}
                        handlePlayerHit={handlePlayerHit}
                />

                {isGameStarted && <Enemies handleEnemyHit={handleEnemyHit}
                                           enemySet={enemySet}
                                           enemies={enemies}
                                    />
                }

                {isMessage && <DisplayMessage message={message}
                                               newGame={newGame}
                                               stopGame={stopGame}
                               />
                }
            </div>
        );
    }
}