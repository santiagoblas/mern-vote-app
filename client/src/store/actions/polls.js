import { addError, removeError } from './error';
import { SET_POLLS, SET_CURRENT_POLL } from '../actionTypes';
import api from '../../services/api';

export const setPolls = polls => ({
    type: SET_POLLS,
    polls
});

export const setCurrentPoll = poll => ({
    type: SET_CURRENT_POLL,
    poll
});

export const getPolls = () => {
    return async dispatch => {
        try {
            dispatch(removeError());
            const polls = await api.call('get', 'polls');
            dispatch(setPolls(polls));
        } catch (err) {
            const error = err.response.data;
            dispatch(addError(error.message));
        }
    }
}

export const getUserPolls = () => {
    return async dispatch => {
        try {
            dispatch(removeError());
            const polls = await api.call('get', 'polls/user');
            dispatch(setPolls(polls));
        } catch (err) {
            const error = err.response.data;
            dispatch(addError(error.message));
        }
    }
}

export const createPoll = data => {
    return async dispatch => {
        try {
            dispatch(removeError());
            const poll = await api.call('post', 'polls', data);
            dispatch(setCurrentPoll(poll));
        } catch (err) {
            const error = err.response.data;
            dispatch(addError(error.message));
        }
    }
}

export const getCurrentPoll = id => {
    return async dispatch => {
        try {
            dispatch(removeError());
            const poll = await api.call('get', `polls/${id}`);
            dispatch(setCurrentPoll(poll));
        } catch (err) {
            const error = err.response.data;
            dispatch(addError(error.message));
        }
    }
}

export const vote = (id, data) => {
    return async dispatch => {
        try {
            dispatch(removeError());
            const poll = await api.call('post', `polls/${id}`, data);
            dispatch(setCurrentPoll(poll));
        } catch (err) {
            const error = err.response.data;
            dispatch(addError(error.message));
        }
    }
}