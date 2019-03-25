import React from 'react';

import CreatePoll from '../components/CreatePoll';
import ErrorMessage from '../components/ErrorMessage';

const TestPage = () => {
    return (
        <div>
            <ErrorMessage />
            <CreatePoll />
        </div>
    )
}

export default TestPage;