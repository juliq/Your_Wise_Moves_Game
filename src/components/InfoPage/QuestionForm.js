import React, { Component } from "react";
import { connect } from 'react-redux'
import swal from 'sweetalert';

class QuestionForm extends Component {
  state = {
    newContent: {
      stage_id: '1',
      text: ''
    },
    editing: false
  }
  componentDidMount = () => {
    if (this.props.question) {
      this.setState({
        newContent: {
          stage_id: this.props.question.stage_id,
          text: this.props.question.text,
          id: this.props.question.id
        },
        editing: true
      })
    }
  }
  handleChangeFor = (input) => event => {
    this.setState({
      newContent: {
        ...this.state.newContent,
        [input]: event.target.value,
      }
    })
  }
  handleDelete = (id) => {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this card.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.props.dispatch({ type: 'DELETE_CARD', payload: id });
        swal('Your card has been deleted.', {
          icon: 'success',
        });
      } else {
        swal('Your card is safe!');
      }
    })
  }
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.add) {
      this.props.dispatch({ type: 'ADD_CARD', payload: ({ ...this.state.newContent, decksToAddTo: [] }) })
      this.setState({
        newContent: {
          stage_id: '1',
          text: ''
        }
      })
    } else {
      this.props.dispatch({ type: 'EDIT_CARD', payload: this.state.newContent })
    }
    swal(this.props.add ? 'Card Added' : 'Card Edited');

    if (this.props.flipCard) {
      this.props.flipCard();
    }
  }
  render() {
    return (
      <div className="question-form">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="select">Select a movement: </label>
          <select name="select" onChange={this.handleChangeFor('stage_id')} value={this.state.newContent.stage_id}>
            <option value="1">Map</option>
            <option value="2">Open</option>
            <option value="3">Visualize</option>
            <option value="4">Engage</option>
            <option value="5">Sustain</option>
          </select>
          <br />
          <label htmlFor="text">Type a question: </label>
          <br />
          <textarea style={this.props.add?{width:'50%', marginLeft:'0', resize:'none'}:{width:'100%', height:'60px', marginLeft:'0', resize:'none'}} name="text" onChange={this.handleChangeFor('text')} value={this.state.newContent.text} />
        </form>
        <button onClick={this.handleSubmit}>Submit</button>
        {this.state.editing ? <button onClick={() => this.handleDelete(this.props.question.id)}>Delete</button> : null}
      </div>
    );
  }
}

export default connect()(QuestionForm);