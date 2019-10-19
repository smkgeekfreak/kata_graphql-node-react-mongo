import React from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'

import BookList from "./component/BookList";
import AddBook from "./component/AddBook";
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
        <AddBook/>
      </div>
    </ApolloProvider>
  )
    ;
}

export default App;
