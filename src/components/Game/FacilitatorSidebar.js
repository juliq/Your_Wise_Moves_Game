import React, { Component } from 'react';
import { connect } from 'react-redux';



class FacilitatorSidebar extends Component {

    state = {
        gameConfig: {
            name: '',
            deckId: '',
            maxPlayers: '',
            showDirections: '',
        },
    }

    handleChange = (event) => {
        this.setState({
            gameConfig: {
                ...this.state.gameConfig,
                [event.target.name]: event.target.value,
            }
        })
    }

    render() {
        return (
            <div>
                {this.props.state.game.game && this.props.state.game.game.id ?
                    <React.Fragment>
                        <h1>{this.props.state.game.game.name}</h1>
                        <ul>
                            <li>Deck ID:{this.props.state.game.game.deck_id}</li>
                            <li>Max Players:{this.props.state.game.game.max_players}</li>
                            {this.props.state.game.game.can_kick &&
                                <li>Can Kick</li>
                            }
                            {this.props.state.game.game.show_directions &&
                                <li>Show Directions</li>
                            }
                        </ul>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <h1>New Game</h1>
                        <label>
                            Name your game!
                            <br></br>
                            <input onChange={this.handleChange} placeholder="Name" name="name" value={this.state.name}></input>
                        </label>
                        <br></br>
                        <div className="select-container">

                            <label>
                                Choose your deck.
                   {/* Will map through saved decks for this select */}
                                <select
                                    onChange={this.handleChange}
                                    name="deckId"
                                    value={this.state.gameConfig.deckId}
                                >
                                    <option>choose an option</option>
                                    {this.props.state.decks.decks.map(deck => {
                                        return (<option value={deck.id}>{deck.description}</option>
                                        );
                                    })}
                                </select>
                            </label>
                        </div>
                        <br></br>
                        <div className="select-container">

                            <label>
                                Set max player count
                    <select
                                    onChange={this.handleChange}
                                    value={this.state.gameConfig.maxPlayers}
                                    name="maxPlayers"
                                >
                                    <option>choose an option</option>
                                    <option value={4}>Four</option>
                                    <option value={5}>Five</option>
                                    <option value={6}>Six</option>
                                    <option value={7}>Seven</option>
                                    <option value={8}>Eight</option>
                                </select>
                            </label>
                        </div>
                        <br></br>
                        <div className="select-container">
                            <label>
                                Show directions in chat?
                    <select
                                    onChange={this.handleChange}
                                    value={this.state.gameConfig.showDirections}
                                    name="showDirections"
                                >
                                    <option>choose an option</option>
                                    <option value={true}>yes</option>
                                    <option value={false}>no</option>
                                </select>
                            </label>
                        </div>
                        <br></br>
                        <button onClick={() => {
                            this.props.createGame(this.state.gameConfig)
                            this.setState({
                                gameConfig: {
                                    name: '',
                                    deckId: '',
                                    maxPlayers: '',
                                    canKick: '',
                                    showDirections: '',
                                },
                            })
                        }}>Create A New Game</button>
                    </React.Fragment>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps)(FacilitatorSidebar);