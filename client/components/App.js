import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddMessage from './add-message/add-message';
import MessageList from './message-list/message-list';
import * as messageActionCreators from '../actions/messages';

class App extends React.Component {
    render() {
        return (
            <div>
                <MessageList
                    messages={this.props.messages}
                    userId={this.props.userId}
                />
                <AddMessage
                    value={this.props.currentMessage}
                    userId={this.props.userId}
                    onChange={this.props.updateMessage}
                    onSubmit={this.props.addMessage}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userId: state.userId,
        messages: state.messages,
        currentMessage: state.currentMessage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(messageActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);