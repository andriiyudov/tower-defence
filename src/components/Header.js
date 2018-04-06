import React, { Component } from 'react';

export default class Header extends Component {
    state = {
        maxTowerHp: this.props.towerInf.hp,
    }


    render() {
        const {
            towerInf,
            newGame,
            stopGame,
            isGameStarted,
            enemiesCount,
            currentEnemiesCount,
            setDifficult,
        } = this.props;
        const { maxTowerHp } = this.state;

        return (
            <header className='App-header'>
                <div>
                    <button onClick={newGame} >{ isGameStarted ? 'Reset Game' : 'Start' }</button>
                    {isGameStarted && <button onClick={stopGame}>Stop page</button>}
                </div>

                {isGameStarted ?
                    <div className='App-information'>
                        <div>Current HP {towerInf.hp}/{maxTowerHp}</div>
                        <div>Enemies left: {currentEnemiesCount} from {enemiesCount}</div>
                    </div>
                    :
                    <div className='App-menu' onClick={setDifficult}>
                        <div>Choose difficulty level</div>

                        <button data-difficult='easy'>Easy</button>
                        <button data-difficult='middle'>Middle</button>
                        <button data-difficult='hard'>Hard</button>

                        <button>Custom</button>
                    </div>
                }
            </header>
        )
    }
}
