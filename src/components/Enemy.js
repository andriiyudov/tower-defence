import React, { Component } from 'react';

import { randomIntNumbers  } from '../constants';

import '../styles/Enemy.css';

export default class Enemy extends Component {

    componentDidUpdate() {
        this.setEnemyHp();
    }

    componentWillUnmount () {
        cancelAnimationFrame(this.timerId);
    }


    moveEnemy = () => {
        const { handleEnemyHit, enemy } = this.props;

        const start = performance.now();

        const tower = document.getElementsByClassName('Tower')[0];
        const towerX = tower.getBoundingClientRect().left;

        let enemyX, timePassed;

        const moveFunc = time => {
            timePassed = time - start;

            this.e.style.right = `${(timePassed/(enemy.speed/5))}px`;

            enemyX = this.e.getBoundingClientRect().left;

            if ( (enemyX < towerX) && enemyX > 0 ){
                cancelAnimationFrame(this.timerId);

                handleEnemyHit(enemy);
            } else {
                cancelAnimationFrame(this.timerId);
                this.timerId = requestAnimationFrame(moveFunc);
            }

        }

        this.timerId = requestAnimationFrame(moveFunc);
    }

    setEnemyHp = () => {
        if (!this.e) return

        const { enemy } = this.props;

        this.e.innerHTML = enemy.hp;
    }

    enemySettings = e => {
        if (!e) return

        const { enemy } = this.props;
        const enemyHp = enemy.hp;

        const boardHeigth = document.getElementsByClassName('Board')[0].getBoundingClientRect().height;

        const width = randomIntNumbers(20, 100) + 'px';
        const height = randomIntNumbers(20, 100) + 'px';
        const background = `rgb(${randomIntNumbers(0, 255, 3) + ''})`;
        const top = `${randomIntNumbers(0, (boardHeigth - parseInt(height, 10)) )}px`;

        e.style.width = width;
        e.style.height = height;
        e.style.background = background;
        e.style.top = top;

        e.innerHTML = enemyHp;

        this.e = e;

        this.moveEnemy();
    }

    render() {
        const { enemy } = this.props;

        return (
            enemy.isDisplay && <div className={`Enemy ${enemy.id}`} ref={this.enemySettings} />
        )
    }
}