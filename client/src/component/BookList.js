import React from 'react';
import {Component} from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

// GraphQL Query
const getBooksQuery=gql`
{
  books{
  name
  id
  }
}
`

class BookList extends Component{
  displayBooks(){
    console.log(this.props);
    var data = this.props.data;
    if(data.loading){
      return (
        <div>Loading Books</div>
      )
    } else {
      return data.books.map(book=> {
        return (
          <li key={book.id}>{book.name}</li>
        )
      });
    }
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
      </div>
    );
  }
}

/**
 * Attach the GraphQL Query to this component
 */
export default graphql(getBooksQuery)(BookList);
