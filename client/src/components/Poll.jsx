import React from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-colorschemes';

import { vote } from '../store/actions';

const Poll = ({ poll, vote }) => {
    const answers = poll.options && poll.options.map(option => (
        <button onClick={() => vote(poll._id, { answer: option.option })} key={option._id}>
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
                scheme: 'brewer.RdYlGn7'
            }
        }
    }

    return (<div>
        <h3>{poll.question}</h3>
        <div>{answers}</div>
        {poll.options && <Pie data={data} options={options} />}
    </div>)
};

export default connect(
    store => ({
        poll: store.currentPoll
    }),
    { vote }
)(Poll);