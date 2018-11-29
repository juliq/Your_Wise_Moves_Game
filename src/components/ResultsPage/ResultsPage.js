import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

class ResultsPage extends Component {
  state = {
    email: '',
    emailSent: false,
  }

  handleChange = event => {
    this.setState({
      email: event.target.value,
    })
  }

  submitEmail = () => {
    Axios({
      method: 'POST',
      url: '/game/get/results',
      data: {
        email: this.state.email,
        id: this.props.state.game.player.id,
      }
    })
      .then(response => {
        this.setState({
          emailSent: true,
        })
      })
      .catch(err => {
        alert(err);
      })
  }

  render() {
    return (
      <div>
        {this.state.emailSent ?
          <div>
            <h1>Thanks for playing</h1>
            <h3>Your results have been sent to your email: {this.state.email}</h3>
          </div>
          :
          <div>
            <h1>Get Your Results</h1>
            <h2>Thanks for playing</h2>
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Enter your email"
            />
            <button
              onClick={this.submitEmail}
            >
              Get Results
          </button>
          </div>
        }
      </div>
    );
  }
}


const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(ResultsPage);