import React, { Component } from 'react';
import { connect } from 'react-redux'
import Card from '../Card/Card'
import QuestionForm from './QuestionForm';
class CardPage extends Component {
  state = {
    allCardsWithCheckBoxes: [],
    deckToAdd: {
      description: '',
      viewing: 'false',
      cards: [],
    },
    cards: [],
    decks: [],
    filter: {
      categorySelected: '0',
      deckSelected: '0',
      searchText: '',
    }

  }
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CARDS' });
    this.props.dispatch({ type: 'FETCH_DECKS' });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.cards.cards !== prevProps.cards.cards) {
      this.setState({
        ...this.state,
        cards: this.props.cards.cards,
        allCardsWithCheckBoxes: this.props.cards.cards.map(card => ({ ...card, checked: false }))
      })
      this.combinedFilter(this.state.filter)
    }
    if (this.props.decks.decks !== prevProps.decks.decks) {
      this.setState({
        ...this.state,
        decks: this.props.decks.decks,
        allCardsWithCheckBoxes: this.props.cards.cards.map(card => ({ ...card, checked: false }))
      })
      this.combinedFilter(this.state.filter)
    }
    if (this.state.filter !== prevState.filter) {
      this.combinedFilter(this.state.filter)
    }
    if (this.state.allCardsWithCheckBoxes !== prevState.allCardsWithCheckBoxes) {
      this.setState({
        deckToAdd: {
          ...this.state.deckToAdd,
          cards: this.state.allCardsWithCheckBoxes.filter(card => card.checked === true)
        }
      })
    }
    if (this.state.deckToAdd.cards.length === 0 && prevState.deckToAdd.cards.length === 1) {
      this.setState({
        deckToAdd: {
          ...this.state.deckToAdd,
          description: '',
          viewing: 'false'
        }
      })
    }
    if (this.state.deckToAdd.viewing === 'false' && prevState.deckToAdd.viewing === 'true') {
      this.setState({
        filter: {
          categorySelected: '0',
          deckSelected: '0',
          searchText: '',
        }
      })
    }
  }
  dispatchDeckToPost = () => {
    this.props.dispatch({
      type: 'ADD_DECK', payload: {
        description: this.state.deckToAdd.description,
        cards_in_deck: this.state.deckToAdd.cards.map(card => card.id)
      }
    })
    this.setState({
      deckToAdd: {
        ...this.state.deckToAdd,
        description: '',
        viewing: 'false'
      }
    })
  }
  filterByText = (searchText, updatedCards) => {
    return updatedCards.filter(
      (card => {
        return card.text.toLowerCase().search(searchText.toLowerCase()) !== -1;
      })
    );
  }
  filterByCategory = (categoryId, updatedCards) => {
    let numCategory = Number(categoryId)
    if (categoryId === '0') {
      return updatedCards
    } else {
      return updatedCards.filter(card => card.stage_id === numCategory)
    }
  }
  filterByDeck = (deckId, updatedCards) => {
    let numDeck = Number(deckId)
    if (deckId === '0') {
      return updatedCards
    } else {
      return updatedCards.filter(card =>
        this.state.decks.filter(deck => deck.id === numDeck)[0].cards_in_deck.indexOf(card.id) !== -1);
    }
  }
  combinedFilter = (filter) => {
    this.setState({
      cards: this.filterByText(filter.searchText, this.filterByCategory(filter.categorySelected, this.filterByDeck(filter.deckSelected, this.props.cards.cards)))
    })
  }
  handleChangeFor = (input, subState) => (event) => {
    this.setState({
      [subState]: {
        ...this.state[subState],
        [input]: event.target.value,
      }
    })
  }

  handleChangeForDeckCheckbox = (id) => (event) => {
    let copy = [...this.state.allCardsWithCheckBoxes];
    let copyIndex = copy.findIndex(card => card.id === id)
    let item = { ...copy[copyIndex] };
    item.checked = event.target.checked;
    copy[copyIndex] = item;
    this.setState({ allCardsWithCheckBoxes: copy });
  }
  render() {
    return (
      <div>
        <div className="card-input-boxes">
          <div className="add-question">
            <h2>Add a new question here:</h2>
            <div>
              <QuestionForm add={true} />
            </div>
          </div>
          <div className="card-filter-options">
          <h2>Filter Options:</h2>
            {this.state.deckToAdd.viewing === 'true' ? null :
              <div>
                <label htmlFor="select">Filter By Category: </label>
                <select name="select"
                  onChange={this.handleChangeFor('categorySelected', 'filter')}
                  value={this.state.filter.categorySelected}>
                  <option value="0">All Categories</option>
                  <option value="1">Map</option>
                  <option value="2">Open</option>
                  <option value="3">Visualize</option>
                  <option value="4">Engage</option>
                  <option value="5">Sustain</option>
                </select>
                <label htmlFor="select">Filter By Deck: </label>
                <select name="select"
                  onChange={this.handleChangeFor('deckSelected', 'filter')}
                  value={this.state.deckSelected}>
                  <option value="0">All Cards</option>
                  {this.props.decks.decks.map(deck =>
                    <option key={deck.id} value={`${deck.id}`}>{deck.description}</option>)}
                </select>
                <input placeholder="search for a card by content" onChange={this.handleChangeFor('searchText', 'filter')}></input>
              </div>}
            <br />
            {this.state.deckToAdd.cards.length === 0 ? null :
              <>
                <label htmlFor="cardsToAdd">
                  <input style={{ width: '20px' }} name="cardsToAdd" type="radio" value="true" checked={this.state.deckToAdd.viewing === 'true'} onChange={this.handleChangeFor('viewing', 'deckToAdd')} />
                  see cards in deck to be added
              </label>
                <br />
                <label htmlFor="allCards">
                  <input style={{ width: '20px' }} name="allCards" type="radio" value="false" checked={this.state.deckToAdd.viewing === 'false'} onChange={this.handleChangeFor('viewing', 'deckToAdd')} />
                  see all cards
              </label>
                <br />
                {this.state.deckToAdd.viewing === 'true' ?
                  <>
                    <input type="text" placeholder="Name the new deck here" onChange={this.handleChangeFor('description', 'deckToAdd')} />
                    <button onClick={this.dispatchDeckToPost}>Add checked cards to deck</button>
                  </>
                  : null}
              </>
            }
          </div>
        </div>
        <div className="card-collection">
          {this.state.deckToAdd.viewing === 'false' ?
            this.state.cards.map((question) =>
              <div key={question.id} style={{ margin: '4px' }}>
                {this.state.allCardsWithCheckBoxes === [] ? null :
                  <label htmlFor="addbox"><input name="add-box" type="checkbox" className="card-checkbox" onChange={this.handleChangeForDeckCheckbox(question.id)}
                    checked={this.state.allCardsWithCheckBoxes[this.state.allCardsWithCheckBoxes.findIndex(card => card.id === question.id)].checked} />Check to add to a new deck</label>}
                <br />
                <Card
                  question={question}
                  editable={true} />
              </div>) :
            this.state.deckToAdd.cards.map((question) =>
              <div key={question.id} style={{ margin: '4px' }}>
                {this.state.allCardsWithCheckBoxes === [] ? null :
                  <label htmlFor="addbox"><input name="add-box" type="checkbox" className="card-checkbox" onChange={this.handleChangeForDeckCheckbox(question.id)}
                    checked={this.state.allCardsWithCheckBoxes[this.state.allCardsWithCheckBoxes.findIndex(card => card.id === question.id)].checked} />Check to remove</label>}
                <br />
                <Card
                  question={question}
                  editable={true} />
              </div>)
          }
        </div>
      </div>
    )
  }
}
const mapReduxStateToProps = ({ cards, decks }) => ({ cards, decks })
export default connect(mapReduxStateToProps)(CardPage);
