/** FacilitatorCreateGame
 * facilitator can
 * --> start a game
 * --> share code (by saying it to people aloud)
 * --> watch as players join and their names show up
 * --> choose to advance to the game
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class FacilitatorCreateGame extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_GAMES' });
  }

  render() {
    return (
      <div className="threeContentContainer">
        <div className="join-game-ball">
          {this.props.state.selectedGame && this.props.state.selectedGame.id &&
            <div>
              <h4 className="join-game-ball">{this.props.state.selectedGame.name}</h4>
              <h5 className="join-game-ball">{this.props.state.selectedGame.code}</h5>
              <h6 className="join-game-ball"> Players: {this.props.state.selectedGame.active}</h6>
              <button onClick={() => this.props.facilitatorJoinGame(this.props.state.selectedGame)}>Join</button>
              <button onClick={() => this.props.endGame(false)}>End</button>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(FacilitatorCreateGame);