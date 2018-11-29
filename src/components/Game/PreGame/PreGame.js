/** PreGame
 * module for routing within the pregame stage
 * first view offers choice of facilitator or player
 * players
 * --> join game with code and name
 * facilitators
 * --> log in with username and password
 * --> create game and share code
 * --> choose to advance to game
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

//include sub components
import PlayerLogin from './PlayerLogin';
import FacilitatorLogin from './FacilitatorLogin';
import FacilitatorCreateGame from './FacilitatorCreateGame';

class PreGame extends Component {
    componentDidMount() {
        setTimeout(
            () => {
                if (this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator) {
                    this.props.dispatch({ type: 'SET_USER_TYPE', payload: 'facilitator' })
                } else {
                    this.props.dispatch({ type: 'SET_USER_TYPE', payload: 'player' })
                }
            }, 1000
        )
    }

    facilitator = () => {
        this.props.dispatch({ type: 'SET_USER_TYPE', payload: 'facilitator' })
    }

    player = () => {
        this.props.dispatch({ type: 'SET_USER_TYPE', payload: 'player' })
    }

    render() {
        return (
            <div>
                {
                    this.props.state.user.userType === '' &&
                    null
                }
                {
                    this.props.state.user.userType === 'player' &&
                    <div>
                        <PlayerLogin
                            //sub component requires
                            joinGame={this.props.joinGame}
                            facilitator={this.facilitator}
                        />
                    </div>
                }
                {
                    this.props.state.user.userType === 'facilitator' &&
                    <div>
                        {this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator ?
                            <FacilitatorCreateGame
                                //sub component requires 
                                createGame={this.props.createGame}
                                facilitatorJoinGame={this.props.facilitatorJoinGame}
                                endGame={this.props.endGame}
                            />
                            :
                            <FacilitatorLogin
                                player={this.player}
                            />
                        }
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps)(PreGame);