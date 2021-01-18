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
    /*
    fetch('http://localhost:8000/game')
      .then(res => res.json())
      .then(data => {
        this.setState({ game: data })
      })
      */
    fetch('http://localhost:8000/getInfo')
      .then(res => res.json())
      .then(data => {
        this.setState({ gamelist: data })
      })
  }
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

 /*
 console.log(getGame())
  return (
    <div>
      <p>{getGame()}</p>
    </div>
  );
  */


  // let toRender = <p>Hello world</p>;
  /*
  getGame().then(game => {
    console.log(game);
    // eslint-disable-next-line
    toRender = 
      <div className="App">
        <Game name={"a"} playing={"b"} visits={"c"} />
        <Game name={game.data[0].name} playing={game.data[0].playing} visits={game.data[0].visits} />
      </div>
  })
  */
  // <Game name={game.data[0].name} playing={game.data[0].playing} visits={game.data[0].visits} />
  // console.log(game);
  // <Game name={"a"} playing={"b"} visits={"c"} />
