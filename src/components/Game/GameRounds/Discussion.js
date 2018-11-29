/** Discussion
 * facilitator can see which players have spoken and which haven't
 * facilitator can select a player to speak
 * facilitator can mark a player as done speaking
 * facilitator can advance to next game state
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Discussion extends Component {

  render() {
    return (
      <div className="threeContentContainer">
        {this.props.state.game.selectedPlayer && this.props.state.game.selectedPlayer.id &&
          <div className="discussion-ball-container">
            <h2>Selected Player</h2>
            <h2>{this.props.state.game.selectedPlayer.name}</h2>
            <h3>Intention: {this.props.state.game.selectedPlayer.intention}</h3>
            <h3>Question: {this.props.state.game.selectedPlayer.current_card}</h3>
            {this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator &&
              <button
                onClick={() => this.props.markDone(this.props.state.game.selectedPlayer)}
              >Mark Complete</button>

            }
           </div>
        }
        {this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator &&
          <button onClick={() => this.props.advanceStage(
            this.props.calculateNextStage('0'), true
          )}>Next</button>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(Discussion);