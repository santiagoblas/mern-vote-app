import { addError, removeError } from './error';
import { SET_CURRENT_USER } from '../actionTypes';
import api from '../../services/api';

export const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    user
});

export const setToken = token => {
    api.setToken(token);
}

export const logout = () => {
    return dispatch => {
        dispatch(removeError());
        localStorage.clear();
        api.setToken(null);
        dispatch(setCurrentUser({}));
    }
}

export const authUser = (path, data) => {
    return async dispatch => {
        try {
            dispatch(removeError());
            const { token, ...user } = await api.call('post', `auth/${path}`, data);
            localStorage.setItem('jwtToken', token);
            api.setToken(token);
            dispatch(setCurrentUser(user));
        } catch (err) {
            const error = err.response.data;
            dispatch(addError(error.message));
        }
    }
}