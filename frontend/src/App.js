import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider, Query } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import Master from './components/Master'

const client  = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client = {client}>
        <Query
          query={gql`
            query states {
              getStates{
                id
                name
                cities {
                  id
                  name
                  population
                }
              }
            }
          `}
          >
          {({loading, error, data})=> {
            if(loading) return <p> Loading... </p>
            if(error) return <p> Error :(</p>

            return (<div className='content'>
              {data.getStates.map(state => {
                return <Master name={state.name} cities={state.cities} />
              })}
            </div>)
          }}

        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
