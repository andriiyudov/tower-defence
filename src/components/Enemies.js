import React, { Component } from 'react';

import Enemy from './Enemy';

import '../styles/Enemies.css';

export default class Enemies extends Component {

    render() {
        const {
            handleEnemyHit,
            enemies,
        } = this.props;

        return (
            <div className='Enemies' >
                <div className='Enemies-Content'>
                    {enemies.map(enemy =>
                        <Enemy key={enemy.id}
                               enemy={enemy}
                               handleEnemyHit={handleEnemyHit}
                        />
                    )}
                </div>
            </div>
        );
    }
}
