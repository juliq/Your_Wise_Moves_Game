/** FacilitatorLogIn
 * carbon copy of log in page
 * facilitator logs in and are redirected to the create game view
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class FacilitatorLogin extends Component {

  render() {
    return (
      <div className="threeContentContainer">  
      </div>
    );
  }
}


const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(FacilitatorLogin);