import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const ErrorMessage = ({ error }) => (
    <Fragment>{error.message && <div className="container"><div className="row"><div className="col s12"><div className="card-panel red lighten-4"><strong className="pink-text">{error.message}</strong></div></div></div></div>}</Fragment >
);

export default connect(store => ({ error: store.error }))(ErrorMessage);