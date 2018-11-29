import React, { Component } from 'react';
import axios from 'axios';
// import QuestionForm from './QuestionForm';


import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
// 'Fancy' theme - boilerplate styles for all components:
import 'react-accessible-accordion/dist/fancy-example.css';
import FacilitatorForm from './FacilitatorForm';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class AdminPage extends Component {

  state = {
    data: [],
  }

  componentDidMount() {
    this.getFacilitatorInfo(); // call getFacilitatorInfo on page load to display all the facilitators
  }


  getFacilitatorInfo = () => {
    axios.get('/api/user/register/')
      .then((response) => {
        console.log('this is the response for facilitators', response);
        this.setState({ ...this.state, data: response.data }); // master list of all facilitators
        console.log(this.state);
        console.log('I am here');
      }).catch((error) => {
        console.log('error making get', error);
      });
  }

  createHtmlForPanel(facilitator) {
    
      return (   //this creates the html for the panel for each question

        <AccordionItem>
          {/* style={{ border: '1px solid lightgray', color: 'gray', width: '70vw', align: 'center' }} */}
          <AccordionItemTitle >
            <h4>{facilitator.first_name} {facilitator.last_name}</h4>
          </AccordionItemTitle>
          <AccordionItemBody>
            <FacilitatorForm
              action="edit"  // updates the question form based on this function or add
              facilitator={facilitator}  // javascript variable in html code
            />
          </AccordionItemBody>
        </AccordionItem>
      )
    }
    
  

  render() {
    let facilitatorPanels = this.state.data.map(facilitator => this.createHtmlForPanel(facilitator)) // panel created outside of the render
console.log('HELLOOOOOO!!!!!!!!!!!!!!!!!!')
    console.log(this.state.data);
    return (

      <div>
        <div className="preAccordion" >
          <h4>1. To add a new facilitator to database, complete the form.</h4>
          <h4>2. To edit a facilitator's status in the database, select a facilitator name below.</h4>
        </div>
        <div className="preAccordion">
            <h4>Add a new facilitator here:</h4>
          </div>
        <div className="accordion">
            <FacilitatorForm
              action="add"  // updates the question form based on this function or edit
            />
          </div>
        <div className="accordion">
          <Accordion>
            {facilitatorPanels}
          </Accordion>
        </div>
        <div>

          
          
        </div>


      </div>

    )


  }

}


export default AdminPage;
