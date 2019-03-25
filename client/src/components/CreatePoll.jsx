import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { createPoll } from '../store/actions';

class CreatePoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            options: ['', '']
        };

        this.handleChange = this.handleChange.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    addAnswer() {
        this.setState({ options: [...this.state.options, ''] });
    }

    handleAnswer(e, index) {
        const options = [...this.state.options];
        options[index] = e.target.value;

        this.setState({ options });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createPoll(this.state);

        this.setState({ question: '', options: ['', ''] });
    }

    render() {
        const options = this.state.options.map((option, i) => <Fragment key={i}>
            <label>Opción</label>
            <input
                type="text"
                value={option}
                onChange={e => this.handleAnswer(e, i)}
            />
        </Fragment>);

        return <form onSubmit={this.handleSubmit}>
            <label htmlFor="question">Pregunta</label>
            <input
                type="text"
                name="question"
                value={this.state.question}
                onChange={this.handleChange}
            />

            {options}

            <button type="button" onClick={this.addAnswer}>Agregar Opción</button>
            <button type="submit">Guardar</button>
        </form>;
    }
}

export default connect(() => ({}), { createPoll })(CreatePoll);