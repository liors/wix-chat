import reducers from 'reducers/index.js';
import { UPDATE_MESSAGE, ADD_MESSAGE, ADD_RESPONSE, SET_USER_ID } from '../../actions/messages';

describe('reducer tests', () => {
    let initialState;
    describe('userId', () => {
        beforeEach(() => {
            initialState = {
                userId: 1,
                currentMessage: '',
                messages: []
            };
        });
        it('should change userId when action type is SET_USER_ID', () => {
            let reducer = reducers(initialState);

            expect(reducer(initialState, { type: SET_USER_ID, userId: 700 })).toEqual({
                userId: 700,
                currentMessage: '',
                messages: []
            });
        });

        it('should return the initial userId if it was not changed', () => {
            let reducer = reducers(initialState);

            expect(reducer(initialState, { type: UPDATE_MESSAGE, message: '' })).toEqual({
                userId: 1,
                currentMessage: '',
                messages: []
            });
        });
    });

    describe('update message', () => {
        beforeEach(() => {
            initialState = {
                userId: 1,
                currentMessage: '',
                messages: []
            };
        });
        it('should update the message when action type is UPDATE_MESSAGE', () => {
            let reducer = reducers(initialState);

            expect(reducer(initialState, { type: UPDATE_MESSAGE, message: { text: 'text'} })).toEqual({
                userId: 1,
                currentMessage: { text: 'text' },
                messages: []
            });
        });

        it('should return the initial message if it was not changed', () => {
            let reducer = reducers({
                userId: 1,
                currentMessage: 'message',
                messages: []
            });

            expect(reducer({
                userId: 1,
                currentMessage: 'message',
                messages: []
            }, { type: SET_USER_ID, userId: 1 })).toEqual({
                userId: 1,
                currentMessage: 'message',
                messages: []
            });
        });
    });

    describe('add message', () => {
        it('should add a message when action type is ADD_MESSAGE', () => {
            let reducer = reducers(initialState);

            expect(reducer(initialState, { type: ADD_MESSAGE, message: { text: 'text'} })).toEqual({
                userId: 1,
                currentMessage: '',
                messages: [{ text: 'text'}]
            });
        });

        it('should return the initial messages if no new message was created', () => {
            let reducer = reducers({
                userId: 1,
                currentMessage: 'message',
                messages: [{ text: 'text' }]
            });

            expect(reducer({
                userId: 1,
                currentMessage: 'message',
                messages: [{ text: 'text' }]
            }, { type: SET_USER_ID, userId: 1 })).toEqual({
                userId: 1,
                currentMessage: 'message',
                messages: [{ text: 'text' }]
            });
        });
    });
});