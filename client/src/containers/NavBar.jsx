import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../store/actions';

const NavBar = ({ auth, logout }) => (<div>
    <nav>
        <div className="nav-wrapper container">
            <a href="#" className="brand-logo left"> MERN Vote App</a>

            <ul className="right">
                <li><Link to='/'>Home</Link></li>
                {!auth.isAuthenticated && (<li><Link to='/register'>Register</Link></li>)}
                {!auth.isAuthenticated && (<li><Link to='/login'>Login</Link></li>)}
                <li><Link to='/test'>Test</Link></li>
                {auth.isAuthenticated && (<li><a><i className="material-icons left">person</i> {auth.user.username}</a></li>)}
                {auth.isAuthenticated && (<li><a href="#!" onClick={logout}>Logout</a></li>)}
            </ul>
        </div>
    </nav>
</div>);

export default connect(store => ({ auth: store.auth }), { logout })(NavBar); 