import React, { Component } from 'react';

import '../styles/Bullet.css';

export default class Bullet extends Component {

    componentDidMount() {
        this.moveBullet();
    }



    bulletMoveAnimFunc = () => {
        const { removeBullet, handlePlayerHit, bullet } = this.props;

        const board = document.getElementsByClassName('Board')[0];
        const boardEnd = board.getBoundingClientRect().right;

        let parseRight = parseInt(this.e.style.right, 10),
        speed = parseRight - bullet.speed,
        enemies;


        this.e.style.right = speed + 'px';

        const {
            right: bulletR,
            x: bulletX,
            y: bulletY,
            height: bulletH
        } = this.e.getBoundingClientRect();

        if (bulletR > boardEnd) {
            cancelAnimationFrame(this.timerId);

            removeBullet(bullet.id);
        } else {
            enemies = document.getElementsByClassName('Enemy');

            if (enemies.length) {

                const element = document.elementFromPoint(bulletX, (bulletY+bulletH/2));

                if (!element) return;

                const { className } = element;

                if (className.includes('Enemy')) {
                    const enemyId = +className.split(' ')[1];

                    cancelAnimationFrame(this.timerId);

                    handlePlayerHit(enemyId);
                    removeBullet(bullet.id);
                }
            }

            cancelAnimationFrame(this.timerId);
            this.timerId = requestAnimationFrame(this.bulletMoveAnimFunc);
        }
    }


    moveBullet = () => {
        this.timerId = requestAnimationFrame(this.bulletMoveAnimFunc);
    }

    bulletSettings = e => {
        if (!e) return;

        const { bullet } = this.props;

        e.style.right = bullet.x + 'px';
        e.style.top = bullet.y + 'px';

        const bulletSize = bullet.radius * 2 + 'px';

        e.style.width = bulletSize;
        e.style.height = bulletSize;

        this.e = e;
    }

    render() {
        return (
            <div className='Bullet' ref={this.bulletSettings} />
        )
    }
}
