import * as actions from './actions/messages';
import io from 'socket.io-client';

var socket = null;

export function chatMiddleware(store) {
    return next => action => {
        if (socket && action.type === actions.ADD_MESSAGE) {
            socket.emit('message', action.message);
        }

        return next(action);
    };
}

export default function (store) {
    socket = io('http://localhost:3000');

    socket.on('start', data => {
        store.dispatch(actions.setUserId(data.userId));
    });

    socket.on('message', message => {
        store.dispatch(actions.addResponse(message));
    });
}