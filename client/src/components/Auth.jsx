import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authUser, logout} from '../store/actions';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;

        this.setState( { [name]: value } );
    }

    handleSubmit(e) {
        const { username, password } = this.state;
        const { authType } = this.props;
        e.preventDefault();

        this.props.authUser(authType || 'login', { username, password });
    }

    render() {
        const { username, password } = this.state

        return <div>
            <form action="" onSubmit={this.handleSubmit}>
                <label htmlFor="username">username</label>
                <input type="text" name="username" id="username" value={username} onChange={this.handleChange}/>

                <label htmlFor="password">password</label>
                <input type="password" name="password" id="password" value={password} onChange={this.handleChange}/>

                <button type="submit">Login</button>
            </form>
        </div>
    }
}

export default connect(
    () => ({}), 
    { authUser, logout }
    )(Auth);