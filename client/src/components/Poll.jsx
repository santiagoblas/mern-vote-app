import React from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-colorschemes';

import { vote } from '../store/actions';

const Poll = ({ poll, vote }) => {
    const answers = poll.options && poll.options.map(option => (
        <button className="btn pink darken-2 mr10" onClick={() => vote(poll._id, { answer: option.option })} key={option._id}>
            {option.option}
        </button>
    ))

    const data = poll.options && {
        labels: poll.options.map(option => option.option),
        datasets: [
            {
                label: poll.question,
                borderColor: '#323643',
                data: poll.options.map(option => option.votes)
            }
        ]
    }

    const options = {
        plugins: {
            colorschemes: {
                scheme: 'brewer.RdPu5'
            }
        },
        legend: {
            position: "bottom"
        },
        layout: {
            padding: {
                top: 20
            }
        }
    }

    return (<div className="container">
        <div className="row">
            <div className="col s12">
                <h3>{poll.question}</h3>
                <div>{answers}</div>
            </div>
            <div className="col s12 m8 l4 offset-m2 offset-l4">
                {poll.options && <Pie data={data} options={options} />}
            </div>
        </div>
    </div>)
};

export default connect(
    store => ({
        poll: store.currentPoll
    }),
    { vote }
)(Poll);