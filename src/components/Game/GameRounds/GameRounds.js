/** GameRounds
 * module routes between views during the game round
 * sub components conditionally rendered based on game state in redux
 * there are five rounds in the game
 * redux state, calculateNextStage, and the conditional rendering handle advancing through the rounds
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

//import sub components
import Discussion from './Discussion';
import RoundIntro from './RoundIntro';
import AnswerCard from './AnswerCard';


class GameRounds extends Component {
    render() {
        return (
            <div>
                {this.props.state.game.gameState[1] == '0' &&
                    <RoundIntro
                        advanceStage={this.props.advanceStage}
                        calculateNextStage={this.props.calculateNextStage}
                        dealCards={this.props.dealCards} // facilitator deals cards to players
                    />
                }
                {this.props.state.game.gameState[1] == '1' &&
                    <AnswerCard
                        advanceStage={this.props.advanceStage}
                        calculateNextStage={this.props.calculateNextStage}
                        editJournal={this.props.editJournal} // player edits journal in this sub component
                        advanceToDiscussion={this.props.advanceToDiscussion}
                    />
                }
                {this.props.state.game.gameState[1] == '2' &&
                    <Discussion
                        advanceStage={this.props.advanceStage}
                        calculateNextStage={this.props.calculateNextStage}
                        selectPlayer={this.props.selectPlayer} // facilitator selects player to start talking
                        markDone={this.props.markDone} // facilitator marks player as done talking
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