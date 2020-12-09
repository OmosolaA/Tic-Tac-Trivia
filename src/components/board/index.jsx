import React, { Component } from 'react';

import './styles.css';

class Board extends Component {
    render() {
        return (
            <div className="board"
            style={{fontSize:"30px"}}
            >
                {this.props.children}
            </div>
        );
    }
}

export default Board;