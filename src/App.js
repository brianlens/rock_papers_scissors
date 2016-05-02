import React from 'react';
import GameModel from './models/GameModel';
import NewPlayerComponent from './components/NewPlayerComponent';
import NewGameComponent from './components/NewGameComponent';
import GameListComponent from './components/GameListComponent';

class App extends React.Component {
  constructor() {
    super();

    this.games = new GameModel();
    this.games.subscribe(this.updateList.bind(this));

    this.state = {
      games: [],
      currentGame: null,
      currentPlayer: null
    };
  }

  updateList() {
    this.setState({
      games: this.games.resources
    });
  }

  setPlayer(player) {
    this.setState({
      currentPlayer: player
    });
  }

  createGame() {
    this.games.addResource({
      playerOne: this.state.currentPlayer
    });
  }

  joinGame() {
    this.games.save(this.state.currentGame, { playerTwo: this.state.currentPlayer });
  }

  containerStyles() {
    return {
      width: "500px",
      height: "500px",
      margin: "auto",
    };
  }

  headerStyle() {
    return {
      textAlign: "center"
    };
  }

  selectGame(game) {
    this.setState({
      currentGame: game
    });
  }

  render() {
    console.log(this.state);
    return (
      <div style={this.containerStyles()}>
        <h1 style={this.headerStyle()}>Rock Paper Scissors</h1>
        { this.state.currentPlayer !== null &&
          <p>Hi, {this.state.currentPlayer}</p> }

        { this.state.currentPlayer === null &&
          <NewPlayerComponent onCreate={this.setPlayer.bind(this)}/> }

        { this.state.currentGame === null &&
          <GameListComponent games={this.state.games} onSelect={this.selectGame.bind(this)}/> }

        { this.state.currentGame === null &&
          <NewGameComponent onCreate={this.createGame.bind(this)}/> }

        { this.state.currentGame !== null &&
          <div className="game">
          <p>Player one: {this.state.currentGame.playerOne}</p>
          <p>Player two: {this.state.currentGame.playerTwo}</p>
        </div>}
      </div>
    );
  }
}

export default App;
