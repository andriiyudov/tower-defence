import React, { Component } from 'react';

import Bullet from './Bullet';

import '../styles/Player.css';

export default class Player extends Component {

    render() {
        const {
            bullets,
            removeBullet,
            handlePlayerHit,
        } = this.props;

        return (
            <div className='Player'>
                {bullets.map(bullet =>
                    <Bullet key={bullet.id}
                            bullet={bullet}
                            removeBullet={removeBullet}
                            handlePlayerHit={handlePlayerHit}
                    />
                )}
            </div>
        )
    }
}