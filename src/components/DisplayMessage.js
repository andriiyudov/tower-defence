import React, { Component } from 'react';

import '../styles/DisplayMessage.css';

export default class DisplayMessage extends Component {


    render() {
        const { message, newGame, stopGame } = this.props;

        return (
            <div className='DisplayMessage'>
                <div className='DisplayMessage-Content'>
                  <h3>{ message }</h3>

                  <button onClick={newGame}>Reset game</button>
                  <button onClick={stopGame}>Stop Game</button>
                </div>
            </div>
        );
    }
}