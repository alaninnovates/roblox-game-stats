import React from 'react';
import './game.css';

class Game extends React.Component {
  render() {
    return (
      <div className="gamediv">
        <h2>{this.props.name}</h2>
        <p>Playing: {this.props.playing}</p>
        <p>Visits: {this.props.visits}</p>
      </div>
    )
  }
}

export default Game;