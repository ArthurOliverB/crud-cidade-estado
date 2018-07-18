import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-boost'

export const client  = new ApolloClient({
    uri: "http://localhost:4000/graphql"
})
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();