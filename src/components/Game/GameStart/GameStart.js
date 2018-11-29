/** GameStart
 * module routes between first views of game 
 * sub components conditionally rendered based on game state in redux
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

//import sub components
import IntentionInput from './IntentionInput';
import IntentionIntro from './IntentionIntro';
import GameLobby from './GameLobby';

class GameRounds extends Component {
    render() {
        return (
            <div>
                 {this.props.state.game.gameState[1] == '0' &&
                    <GameLobby
                        advanceStage={this.props.advanceStage}
                        calculateNextStage={this.props.calculateNextStage}
                    />
                }
                {this.props.state.game.gameState[1] == '1' &&
                    <IntentionIntro
                        advanceStage={this.props.advanceStage}
                        calculateNextStage={this.props.calculateNextStage}
                    />
                }
                {this.props.state.game.gameState[1] == '2' &&
                    <IntentionInput
                        advanceStage={this.props.advanceStage}
                        calculateNextStage={this.props.calculateNextStage}
                        editIntention={this.props.editIntention} //player enters in intention in this component
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    state
});

export default connect(mapStateToProps)(GameRounds);