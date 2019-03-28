import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authUser, logout } from '../store/actions';

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

        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        const { username, password } = this.state;
        const { authType } = this.props;
        e.preventDefault();

        this.props.authUser(authType || 'login', { username, password });
    }

    render() {
        const { username, password } = this.state

        return <div className="container">
            <form action="" onSubmit={this.handleSubmit}>
                <div className="row mt40">
                    <div className="col s12 m6 offset-m3 l4 offset-l4">
                        <div className="card">
                            <div className="card-content">
                                <span class="card-title pink-text">Iniciar Sesión</span>
                                <div className="input-field">
                                    <i class="material-icons prefix">person</i>
                                    <input type="text" name="username" id="username" value={username} onChange={this.handleChange} />
                                    <label htmlFor="username">Usuario</label>
                                </div>

                                <div className="input-field">
                                    <i class="material-icons prefix">lock</i>
                                    <input type="password" name="password" autoComplete="false" id="password" value={password} onChange={this.handleChange} />
                                    <label htmlFor="password">Contraseña</label>
                                </div>


                            </div>
                            <div class="card-action center-align">
                                <button type="submit" className="btn pink">Entrar</button>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    }
}

export default connect(
    () => ({}),
    { authUser, logout }
)(Auth);