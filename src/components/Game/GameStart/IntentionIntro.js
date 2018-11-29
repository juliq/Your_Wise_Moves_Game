/** IntentionIntro
 * waiting view *
 * facilitator can advance to next game state
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class IntentionIntro extends Component {

  render() {
    return (
      <div className="threeContentContainer">
      { this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator &&
        <button onClick={() => {this.props.advanceStage(
           this.props.calculateNextStage('2')
        )
        }
      }>Next</button>
    }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(IntentionIntro);
