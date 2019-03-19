import React from 'react';
import { Redirect } from 'react-router-dom';

import Auth from '../components/Auth';
import ErrorMessage from '../components/ErrorMessage';
import Poll from '../components/Poll';
import Polls from '../components/Polls';

const TestPage = () => {
    return (
        <div>
            <Polls />
        </div>
    )
}

export default TestPage;