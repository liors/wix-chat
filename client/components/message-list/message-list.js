import React from 'react';
import _ from 'lodash';
import './message-list.scss';

class MessageList extends React.Component {
    render() {
        return (
            <ol className='message-list'>
                {this.props.messages.map((message, index) => {
                    const messageClass = message.userId !== this.props.userId ? 'is-response' : '';
                    return (
                        <li key={`message-${index}`} className='message-item'>
                            <p className={`message ${messageClass}`}>
                                {message.text}
                            </p>
                        </li>
                    );
                })}
            </ol>
        );
    }

}

export default MessageList;