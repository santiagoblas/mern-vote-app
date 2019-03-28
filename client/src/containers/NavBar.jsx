import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import M from "materialize-css";

import { logout } from '../store/actions';

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const dropdownUsr = document.querySelectorAll('#dropdown-usr-trigger');
        const options = {
            coverTrigger: false
        };

        M.Dropdown.init(dropdownUsr, options);
    }

    componentDidUpdate() {
        const dropdownUsr = document.querySelectorAll('#dropdown-usr-trigger');
        const options = {
            coverTrigger: false
        };

        M.Dropdown.init(dropdownUsr, options);
    }

    render() {
        return (<div>
            {this.props.auth.isAuthenticated && (<div><ul id="dropdown-usr" className="dropdown-content" style={{ marginTop: '20px' }}>
                <li><a onClick={this.props.logout}>Cerrar Sesión</a></li>
            </ul></div>)}
            <nav className="pink darken-2">
                <div className="nav-wrapper container">
                    <a href="#" className="brand-logo left"> MERN Vote App</a>

                    <ul className="right">
                        <li><Link to='/'>Home</Link></li>
                        {!this.props.auth.isAuthenticated && (<li><Link to='/register'>Registrarse</Link></li>)}
                        {!this.props.auth.isAuthenticated && (<li><Link to='/login'>Iniciar Sesión</Link></li>)}
                        {this.props.auth.isAuthenticated && (<li><a id="dropdown-usr-trigger" className="dropdown-trigger" href="#" data-target="dropdown-usr"><i className="material-icons left">person</i> {this.props.auth.user.username}</a></li>)}
                    </ul>
                </div>
            </nav>
        </div >);
    }
}

export default connect(store => ({ auth: store.auth }), { logout })(NavBar); 