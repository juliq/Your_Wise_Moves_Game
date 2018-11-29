/** PlayerLogin
 * player can
 * --> input name and code
 * --> press button to join game
 * --> be redirected to the first view of the game
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class PlayerLogin extends Component {
  state = {
    info: {
      player: '',
      code: '',
    },
    joinRejoin: false,
  }

  handleChange = (event) => {
    this.setState({
      info: {
        ...this.state.info,
        [event.target.name]: event.target.value,
      }
    })
  }


  render() {
    return (
      <div className="threeContentContainer">
        <button onClick={() => this.setState({
          ...this.state,
          joinRejoin: !this.state.joinRejoin,
        })}>{this.state.joinRejoin ? <p>Join Game</p> : <p>Re-Join Game</p>}</button>
        <label>
          Player Name
          <input onChange={this.handleChange} placeholder="Name" name="player" value={this.state.player}></input>
        </label>
        <label>
          Code
          <input onChange={this.handleChange} placeholder="Code" name="code" value={this.state.code}></input>
        </label>
        {
          this.state.joinRejoin ?
          <button onClick={() => this.props.joinGame(this.state.info.player, this.state.info.code, true)}>Re-Join Game</button>
          :
          <button onClick={() => this.props.joinGame(this.state.info.player, this.state.info.code, false)}>Join Game</button>
        }
      </div>
    );
  }
}


const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(PlayerLogin);
