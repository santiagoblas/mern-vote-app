import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getPolls, getUserPolls, getCurrentPoll } from '../store/actions';

class Polls extends Component {
    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        const { getPolls } = this.props;
        getPolls();
    }

    handleSelect(id) {
        const { history } = this.props;
        history.push(`/poll/${id}`);
    }

    render() {
        const { auth, getPolls, getUserPolls } = this.props;

        const polls = this.props.polls.map(poll => (<li className="p10 mb10 poll" onClick={() => this.handleSelect(poll._id)} key={poll._id}>{poll.question}</li>));

        return <Fragment>
            <div className="container">
                <h2 className="pink-text text-lighten-3">Encuestas</h2>
                <div className="row">
                    <div className="col s12 center-align">
                        {auth.isAuthenticated && (
                            <div>
                                <label className="mr20" htmlFor="all">
                                    <input id="all" name="polls" type="radio" onClick={getPolls} defaultChecked={true} />
                                    <span>Todas</span>
                                </label>
                                <label htmlFor="mine">
                                    <input id="mine" name="polls" type="radio" onClick={getUserPolls} />
                                    <span>Mías</span>
                                </label>
                            </div>
                        )}
                    </div>
                    <div className="col s12">
                        <ul>{polls}</ul>
                    </div>
                    <div className="col s12">
                        {auth.isAuthenticated && (
                            <div>
                                <Link to='/poll/new' className="btn pink darken-2">Crear Encuesta</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>


        </Fragment>;
    }
}

export default connect(store => ({
    auth: store.auth,
    polls: store.polls
}), { getPolls, getUserPolls, getCurrentPoll })(Polls);