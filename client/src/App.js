import React from 'react';
import logo from './logo.svg';
import './App.css';
import BookList from "./component/BookList";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'

/**
 * Apollo client setup
 */
const client = new ApolloClient({
  uri: 'http://localhost:4100/graphql'
});

/**
 *
 * @returns {boolean}
 * @constructor
 */
function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1> Ninja List </h1>
        <BookList/>
      </div>
    </ApolloProvider>
  )
    ;
}

export default App;
