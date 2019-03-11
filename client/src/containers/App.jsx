import React, { Component } from 'react';
import { Provider } from 'react-redux';
import decode from 'jwt-decode';

import {store} from '../store';
import { setToken, setCurrentUser, addError } from '../store/actions';
import Auth from '../components/Auth'

if(localStorage.jwtToken) {
    setToken(localStorage.jwtToken);
    try {
        store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));
    } catch (error) {
        store.dispatch(setCurrentUser({}));
        store.dispatch(addError(error));
    }
}

const App = () => (
    <Provider store={store}>
        <Auth authType={'login'}/>
    </Provider>
);

// class App extends Component {
//     async componentDidMount() {
//         const result = await api.call('post', 'auth/login', {
//             username: 'santiago',
//             password: 'password'
//         });

//         console.log(result);
//     }

//     render() {
//         return <div>App Works</div>
//     }
// }

export default App;