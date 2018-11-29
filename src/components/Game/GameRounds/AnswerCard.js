/** AnswerCard
 * player can input an answer to the question and dispatch it to server
 * facilitator can see which players have submitted their response
 * facilitator can advance to next game state
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../../Card/Card'

class AnswerCard extends Component {

  render() {
    return (
      <div>
        {this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator ?
          <div className="threeContentContainer">
            <button onClick={() => this.props.advanceStage(
              this.props.calculateNextStage('2')
            )}>Next</button>
          </div>
          :
          <>
          <Card flipped={true} question={{
              intention: this.props.state.game.player.intention,
              stage_id: this.props.state.game.gameState[0],
              text: this.props.state.game.player.current_card
            }} />
         </>   
        }
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(AnswerCard);