import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import LogOutButton from '../LogOutButton/LogOutButton';

class ActionPanel extends Component {
    state = {
        trigger: false,
        username: '',
        password: '',
        intention: '',
        response: '',
    }

    triggerActionPanel = (event) => {
        console.log(this.state.trigger);
        if (this.state.trigger === false) {
            this.actionPanel.className = "actionPanel showActionPanel"
            event.target.className = "actionPanelButton moveActionPanelButton"
            this.setState({
                trigger: !this.state.trigger,
            })
        } else {
            event.target.className = "actionPanelButton moveActionPanelButtonBack"
            this.actionPanel.className = "actionPanel hideActionPanel"
            this.setState({
                trigger: !this.state.trigger,
            })
        }
    }

    selectGame = event => {
        this.props.dispatch({ type: 'CLEAR_SELECT_GAME' })
        this.props.dispatch({ type: 'SELECT_GAME', payload: { id: event.target.value, games: this.props.state.games } })
    }

    login = (event) => {
        event.preventDefault();

        if (this.state.username && this.state.password) {
            this.props.dispatch({
                type: 'LOGIN',
                payload: {
                    username: this.state.username,
                    password: this.state.password,
                },
            });
        } else {
            this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
        }
    } // end login

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    render() {
        return (
            <div>
                <button className="actionPanelButton" onClick={this.triggerActionPanel}>Action Panel</button>

                <div ref={ref => this.actionPanel = ref} className="actionPanel">

                    <h4>{this.props.state.game.game.code}</h4>
                    {this.props.state.game.gameState[0] === '0' &&
                        this.props.state.gameCode !== '' ?
                        <div>
                            {this.props.state.game.gameState[1] == '0' &&
                                <div>
                                    <h1>Game Lobby</h1>
                                    <ol>
                                        {
                                            this.props.state.game.allPlayers.map(player => {
                                                if (player.in_game) {
                                                    return (
                                                        <li key={player.id}>{player.name}</li>
                                                    )
                                                }
                                            })
                                        }
                                    </ol>
                                </div>
                            }
                            {this.props.state.game.gameState[1] == '1' &&
                                <div>
                                    <h1>Intention Intro</h1>
                                </div>
                            }
                            {this.props.state.game.gameState[1] == '2' &&
                                <div>
                                    <h1>Intention Input</h1>
                                    {this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator ?
                                        <div className="facilitator">
                                            <ol>
                                                {
                                                    this.props.state.game.allPlayers.map(player => {
                                                        return (
                                                            <li key={player.id}>{player.name} Intention:{player.intention ? <p>Yes</p> : <p>No</p>}</li>
                                                        )
                                                    })
                                                }
                                            </ol>

                                        </div>
                                        :
                                        <div>
                                            <textarea
                                                type="text"
                                                placeholder="Set your Intention or Question"
                                                onChange={this.handleInputChangeFor('intention')}
                                            />
                                            <button
                                                onClick={() => this.props.editIntention(this.state.intention)}
                                            >
                                                Save Intention
                                        </button>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                        :
                        this.props.state.game.gameState[0] === '0' ?
                            <div>
                                {
                                    this.state.userType === '' &&
                                    null
                                }
                                {
                                    this.props.state.user.userType === 'player' &&
                                    <div>
                                        <h1>Facilitator Login</h1>
                                        <h5>You do not need an account to play! Just join a game with a code provided to you by a licensed facilitator.</h5>
                                        <button onClick={() => this.props.dispatch({ type: 'SET_USER_TYPE', payload: 'facilitator' })}>Log in as facilitator</button>
                                    </div>
                                }
                                {
                                    this.props.state.user.userType === 'facilitator' &&
                                    <div>
                                        {this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator ?
                                            <div className="ActionPanel-Main">
                                                <h1>Game Management</h1>
                                                <h2>Your Games</h2>
                                                <div className="select-container">
                                                    <select
                                                        onChange={
                                                            this.selectGame
                                                        }
                                                    >
                                                        <option value={null}>Select a Game</option>
                                                        {this.props.state.games.map(game => {
                                                            return (
                                                                <option key={game.id}
                                                                    value={game.id}
                                                                >{game.name} Code: {game.code}</option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                                <br></br>
                                                <button
                                                    onClick={() => this.props.history.push('/admin')}
                                                >
                                                    Admin View
                                           </button>
                                                <LogOutButton />
                                            </div>
                                            :
                                            <div>
                                                <h1>Facilitator Login</h1>
                                                <form onSubmit={this.login}>
                                                    <div>
                                                        <label htmlFor="username">
                                                            Username:
                                                        <input
                                                                type="text"
                                                                name="username"
                                                                value={this.state.username}
                                                                onChange={this.handleInputChangeFor('username')}
                                                            />
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="password">
                                                            Password:
                                                        <input
                                                                type="password"
                                                                name="password"
                                                                value={this.state.password}
                                                                onChange={this.handleInputChangeFor('password')}
                                                            />
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            className="log-in"
                                                            type="submit"
                                                            name="submit"
                                                            value="Log In"
                                                        />
                                                    </div>
                                                </form>
                                                <button onClick={() => this.props.dispatch({ type: 'SET_USER_TYPE', payload: 'player' })}>Back To Player Home</button>
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                            :
                            null
                    }
                    {this.props.state.game.gameState[0] > 0 && this.props.state.game.gameState[0] < 6 &&
                        <div>
                            {this.props.state.game.gameState[1] == '0' &&
                                <div>
                                    <h1>Round Intro</h1>
                                    <h2>Round: {this.props.state.game.roundNumber}</h2>
                                </div>
                            }
                            {this.props.state.game.gameState[1] == '1' &&
                                <div>
                                    <h1>Answer Card</h1>
                                    <h2>Round: {this.props.state.game.roundNumber}</h2>
                                    {this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator ?
                                        <div>
                                            <ol>
                                                {this.props.state.game.allPlayers.map(player => {
                                                    return (
                                                        <li key={player.id}>{player.name} ready: {player.in_discussion ? <p>yes</p> : <p>no</p>}</li>
                                                    )
                                                })}
                                            </ol>
                                        </div>
                                        :
                                        <div>
                                            <textarea
                                                type="text"
                                                placeholder="Answer the question please"
                                                onChange={this.handleInputChangeFor('response')}
                                            />
                                            <button
                                                onClick={() => this.props.editJournal(this.state.response)}
                                            >
                                                Save
                                        </button>
                                            <button
                                                onClick={() => {
                                                    this.props.editJournal(this.state.response)
                                                    this.props.advanceToDiscussion(this.props.state.game.player.id);
                                                }}
                                            >
                                                Save and continue
                                        </button>
                                        </div>
                                    }
                                </div>
                            }
                            {this.props.state.game.gameState[1] == '2' &&
                                <div>
                                    <h1>Discussion Phase</h1>
                                    <h2>Round: {this.props.state.game.roundNumber}</h2>
                                    {this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator &&
                                        <ol>
                                            <h5>Select a Player to speak</h5>
                                            {this.props.state.game.allPlayers.map(player => {
                                                if (player.in_discussion && !player.discussed) {
                                                    return (
                                                        <li key={player.id}>Name: {player.name} {!this.props.state.game.selectedPlayer.id && //only show the select button when there is no selected player
                                                            <button
                                                                onClick={() => this.props.selectPlayer(player)}
                                                            >Select</button>}</li>
                                                    );
                                                }
                                            })
                                            }
                                        </ol>
                                    }
                                    <h2>Spoken</h2>
                                    <ol>
                                        {this.props.state.game.allPlayers.map(player => {
                                            if (player.discussed === true) {
                                                return (
                                                    <li key={player.id}>Name: {player.name}</li>
                                                );
                                            }
                                        })}
                                    </ol>
                                </div>
                            }
                        </div>
                    }
                    {this.props.state.game.gameState[0] == '6' &&
                        <div>
                            <h1>Final Reflection</h1>
                            {this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator &&
                                <LogOutButton />
                            }
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

export default withRouter (connect(mapStateToProps)(ActionPanel));