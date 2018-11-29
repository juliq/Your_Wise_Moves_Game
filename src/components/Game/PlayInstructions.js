import React, { Component } from 'react';
import { connect } from 'react-redux';



class PlayInstructions extends Component {

    render() {
        return (
            <div>
                <div className="PlayInstructions topSquare">
                    <h1 className="PlayInstructions">Your Wise Moves&trade;</h1>
                    <p className="PlayInstructions">
                        The objective of the game is to ignite your wisdom, align your intuition and purpose, and clarify your way forward.
                        This fun, fresh approach brings awareness in the area you choose for enhanced life, work and relationships. Play it to energize
                        and renew yourself to wisely move forward and est intentions into motion.
                </p>
                </div>
                <div className="PlayInstructions bottomSquare">
                <ul className="PlayInstructions">
                    <h2 className="PlayInstructions">
                        Are you ready to play the game?
                    </h2>
                    <li>Do you want clarity about your current vision?</li>
                    <li>Do you have goals you'd like to further?</li>
                    <li>Would you like to release obstacles and increase your creative energy?</li>
                    <li>Do you want to discover each other's passions?</li>
                    <li>Are you willing to share your thoughts with others playing the game and receive helpful perspectives?</li>
                </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps)(PlayInstructions);