// import logo from './logo.svg';
import './App.css';
import Game from './components/game';
import React from 'react';

const handleGames = (gamelist) => {
  console.log(gamelist)
  let gamedata = [];
  gamelist.forEach(gameInfo => {
    gamedata.push(<Game name={gameInfo.name} playing={gameInfo.playing} visits={gameInfo.visits} />)
  })
  console.log(gamedata)
  return gamedata
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gamelist: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:8000/getInfo')
      .then(res => res.json())
      .then(data => {
        this.setState({ gamelist: data })
      })
  }
  // Format: 
  // <Game name={this.state.game.data[0].name} playing={this.state.game.data[0].playing} visits={this.state.game.data[0].visits} />
  render() {
    return (
      <div className="App">
        {handleGames(this.state.gamelist)}
      </div>
    )
  }
}

export default App;