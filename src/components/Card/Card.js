import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionForm from '../InfoPage/QuestionForm'

class Card extends Component {
  state = {
    newContent: {
      stage_id: '',
      text: ''
    },
    isFlipped: false
  }

  flipCard = () => this.setState({
    isFlipped: !this.state.isFlipped,
  });
  classNameSwitch = (prop) => {
    switch (prop) {
      case '1':
        return 'Map'
      case '2':
        return 'Open'
      case '3':
        return 'Visualize'
      case '4':
        return 'Engage'
      case '5':
        return 'Sustain'
      default:
        return prop
    }
  }
  componentDidMount() {
    this.setState({
      isFlipped: this.props.flipped,
      newContent: {
        stage_id: this.props.question.stage_id,
        text: this.props.question.text,
        id: this.props.question.id
      }
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.flipped !== prevProps.flipped) {
      this.flipCard()
    }
  }

  render() {
    return (
      !this.props.question ? null :
        <div className={`scene ${!this.props.editable ? 'in-game' : null}`} onClick={!this.props.editable ? this.flipCard : null}>
          <div className={`card-wrapper ${this.state.isFlipped ? 'is-flipped' : null}`}>
            <div onClick={() => this.flipCard()} className={`card-content card-front ${this.classNameSwitch(String(this.props.question.stage_id))}`}>
              <div className={`card-header`}>
                <h6>{this.props.editable ? this.props.question.type : 'Your Intention ' + this.props.question.intention}</h6>
              </div>
              <div>
                <h5>{this.props.question.text}</h5>
              </div>
            </div>
            <div className={`card-content card-back ${this.classNameSwitch(String(this.props.question.stage_id))}`}>
              {
                this.props.editable ?
                  <div>
                    <QuestionForm
                      flipCard={this.flipCard}
                      question={this.props.question} />
                    <button onClick={() => this.flipCard()}>
                      Cancel Edit
                </button>
                  </div> : null
              }

            </div>
          </div >
        </div>
    )
  }
}

export default connect()(Card)