import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider, Query } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'


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
              getState(id: 1) {
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

            return (<div>
              <h2>{data.getState.name}</h2>
              <p>{data.getState.id}</p>
              <div> 
                {data.getState.cities.map(city => {
                  return (<div> 
                    <p>{city.state}</p>
                    <p>{city.name}</p>
                    <p>{city.population}</p>
                  </div>)
                })}
              </div>
            </div>)
          }}

        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
