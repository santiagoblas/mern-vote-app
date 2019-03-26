import React from 'react';

import Auth from '../components/Auth';
import CreatePoll from '../components/CreatePoll';
import ErrorMessage from '../components/ErrorMessage';
import Poll from '../components/Poll';
import Polls from '../components/Polls';

const TestPage = () => {
    return (
        <div>
            <h1>UI Test Page</h1>
            <h2>Testing Error Component</h2>
            <ErrorMessage />
            <hr />
            <h2>Testing Auth Component</h2>
            <Auth />
            <hr />
            <h2>Testing Create Poll Component</h2>
            <CreatePoll />
            <hr />
            <h2>Testing Polls Component</h2>
            <Polls />
            <hr />
            <h2>Testing Poll Component</h2>
            <Poll />
        </div>
    )
}

export default TestPage;