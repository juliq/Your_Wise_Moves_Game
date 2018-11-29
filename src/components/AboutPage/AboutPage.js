/** About Page
 * ****** WARNING *******
 * this page is for testing the server and socket connections
 * it is deprecated 
 * this test UI worked with the first version of the server code
 * **********************
 * 
 * This page remains here for any necessary reference
 * 
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
//set up a socket to test if the socket's are working
//interface to enter an action, select a channel name, emit action, and display result.
import io from 'socket.io-client';
import axios from 'axios';
let socket;
//test game state actions first

class AboutPage extends Component {
  state = {
    advance: {
      type: 'advance',
      data: {
        newGameState: '',
      },
      facilitatorId: 1,
    },
    join: {
      type: 'join',
      data: {
        playerName: '',
      },
    },
    journal: {
      type: 'journal',
      data: {
        playerName: '',
        question: '',
        response: '',
        roundNumber: '',
      },
    },
    discussion: {
      type: 'discussion',
      data: {
        playerNumber: '',
        setTo: true,
      },
      facilitatorId: 1,
    },
    gameCode: '',
  }

  testActionOne = event => {
    event.preventDefault();
    socket.emit('moves', this.state.advance);
  }

  testActionTwo = event => {
    event.preventDefault();
    socket.emit('join', this.state.join);
  }

  testActionThree = event => {
    event.preventDefault();
    socket.emit('moves', this.state.journal);
  }

  testActionFour = event => {
    event.preventDefault();
    socket.emit('moves', this.state.discussion);
  }

  startGame = () => {
    //trigger server game start, get code back
    axios({
      method: 'POST',
      data: { id: 1 },
      url: '/game/start',
      json: true
    })
      .then(response => {
        this.setState({
          gameCode: response.data.code,
        })
        socket = io.connect(`/${this.state.gameCode}`);
        socket.on('moves', data => {
          console.log('Back from server with', data);
        })
        socket.on('join', data => {
          console.log('Back from server with', data);
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  endGame = () => {
    //trigger server game end 
    axios({
      method: 'POST',
      data: { id: 1 },
      url: '/game/end',
    })
  }

  handleAdvance = prop => event => {
    this.setState({
      advance: {
        ...this.state.advance,
        data: {
          ...this.state.advance.data,
          [prop]: event.target.value
        }
      }
    })
  }
  handleJoin = prop => event => {
    this.setState({
      join: {
        ...this.state.join,
        data: {
          ...this.state.join.data,
          [prop]: event.target.value
        }
      }
    })
  }
  handleJournal = prop => event => {
    this.setState({
      journal: {
        ...this.state.journal,
        data: {
          ...this.state.journal.data,
          [prop]: event.target.value
        }
      }
    })
  }
  handleDiscussion = prop => event => {
    this.setState({
      discussion: {
        ...this.state.discussion,
        data: {
          ...this.state.discussion.data,
          [prop]: event.target.value
        }
      }
    })
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.startGame}>Start Game (only press one time)</button>
          <button onClick={this.endGame}>End Game</button>
          <form onSubmit={this.testActionOne}>
            <h2>Advance</h2>
            <input
              type="text"
              onChange={this.handleAdvance('newGameState')}
              placeholder="next game state"
              value={this.state.advance.data.newGameState}
            />
            <input
              type="submit"
            />
          </form>
          <form onSubmit={this.testActionTwo}>
            <h2>Join</h2>
            <input
              type="text"
              onChange={this.handleJoin('playerName')}
              placeholder="player name"
              value={this.state.join.data.playerName}
            />
            <input
              type="submit"
            />
          </form>
          <form onSubmit={this.testActionThree}>
            <h2>Journal</h2>
            <input
              type="text"
              onChange={this.handleJournal('playerName')}
              placeholder="playerName"
              value={this.state.journal.data.playerName}
            />
             <input
              type="text"
              onChange={this.handleJournal('question')}
              placeholder="questionId"
              value={this.state.journal.data.question}
            />
             <input
              type="text"
              onChange={this.handleJournal('response')}
              placeholder="response"
              value={this.state.journal.data.response}
            />
             <input
              type="text"
              onChange={this.handleJournal('roundNumber')}
              placeholder="roundNumber (one, two) etc"
              value={this.state.journal.data.roundNumber}
            />
            <input
              type="submit"
            />
          </form>
          <form onSubmit={this.testActionFour}>
            <h2>Discussion</h2>
            <input
              type="text"
              onChange={this.handleDiscussion('playerNumber')}
              placeholder="player number"
              value={this.state.discussion.data.playerNumber}
            />
            <input
              type="submit"
            />
          </form>
        </div>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}

export default connect()(AboutPage);
