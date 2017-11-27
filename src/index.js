import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from '../src/pages/dashboardIndex';
import registerServiceWorker from './registerServiceWorker';

const root = document.getElementById('root');

ReactDOM.render(
    <Dashboard />, 
    root
);

registerServiceWorker();
