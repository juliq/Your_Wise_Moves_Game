import React, { Component } from 'react';
import { connect } from 'react-redux';

class Chat extends Component {

    state = {
        newMessage: '',
        trigger: false,
    }

    triggerChatPanel = (event) => {
        console.log(this.state.trigger);

        if (this.state.trigger === false) {
            this.chatPanel.className = "chatPanel showChatPanel"
            event.target.className = "chatPanelButton moveChatPanelButton"
            this.setState({
                trigger: !this.state.trigger,
            })
        } else {
            event.target.className = "chatPanelButton moveChatPanelButtonBack"
            this.chatPanel.className = "chatPanel hideChatPanel"
            this.setState({
                trigger: !this.state.trigger,
            })
        }
    }


    handleChange = event => {
        this.setState({
            ...this.state,
            newMessage: event.target.value,
        })
    }

    messageSubmit = event => {
        event.preventDefault();
        console.log('submit')
        this.props.sendMessage(this.state.newMessage)
        this.setState({
            newMessage: '',
        })
    }

    scrollToBottom() {
        const scrollHeight = this.chatBox.scrollHeight;
        const height = this.chatBox.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.chatBox.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    componentDidMount() {
        if (this.props.state.game.game && this.props.state.game.game.id) {
            this.scrollToBottom();
        }
    }

    componentDidUpdate() {
        if (this.props.state.game.game && this.props.state.game.game.id) {
            this.scrollToBottom();
        }
    }

    render() {
        return (

            this.props.state.game.game && this.props.state.game.game.id ?
                <div>
                    <button className="chatPanelButton" onClick={this.triggerChatPanel}>Chat Panel</button>
                    <div className="chatPanel" ref={ref => this.chatPanel = ref}>
                        <h4 className="chatHeader">Game Chat</h4>
                        <ul className="messageHistory" ref={ref => this.chatBox = ref}>
                            {
                                this.props.state.chat.map(message => {
                                    let classes; 
                                    if (message.from === 'guide') {
                                        classes += ' messageGreen'
                                    }
                                    return (
                                        <li className='message' key={message.id}><span className="chatName capitalize">{message.from}:</span> <span className={classes}>{message.text}</span></li>
                                    );
                                    
                                })
                            }
                        </ul>
                        <div style={{ float: "left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
                        </div>
                        <form className="messageInput" onSubmit={this.messageSubmit}>
                        <input
                            type="text"
                            placeholder="your message here"
                            onChange={this.handleChange}
                            value={this.state.newMessage}
                            className="messageText"
                        />
                        <button
                            type="submit"
                            className="messageSubmit"
                        >
                            Submit
                     </button>
                    </form>
                </div>
            </div >

                :
        null
        );
    }
}

const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps)(Chat);