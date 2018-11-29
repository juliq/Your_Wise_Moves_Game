/** PostGame
 * module is final view of game
 * sub components conditionally rendered based on game state in redux
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';


class PostGame extends Component {
    render() {
        return (
            <div className="threeContentContainer">
                {this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator &&
                    <button onClick={() => {
                        this.props.endGame(true)
                        //also clear facilitators redux state later
                    }}>Next</button>
                }
            </div>
        )
    }
}


const mapStateToProps = state => ({
    state
});

export default connect(mapStateToProps)(PostGame);