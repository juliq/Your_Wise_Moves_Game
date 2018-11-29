/** IntentionInput
 * player can input an intention and dispatch it to server
 * facilitator can see which players have submitted their intention
 * facilitator can advance to next game state
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class IntentionInput extends Component {
  
  render() {
    return (
      <div className="threeContentContainer">
        {this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator ?
          <div className="facilitator">
            <button onClick={() => this.props.advanceStage(
              this.props.calculateNextStage('0')
            )}>Next</button>
          </div>
          :
          null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(IntentionInput);