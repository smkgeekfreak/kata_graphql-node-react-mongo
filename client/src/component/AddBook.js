import React from 'react';
import {Component} from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

// GraphQL Query
const getAuthorsQuery=gql`
{
  authors{
  name
  id
  }
}
`

class AddBook extends Component{

  displayAuthors(){
    var data = this.props.data;
    if (data.loading){
      return (<option disabled>Loading Authors</option>)
    }else {
      return data.authors.map(author=>{
        return ( <option key={author.id} value={author.id}>{author.name}</option>)
      })
    }
  }
  render() {
    console.log(this.props);
    return(
      <form id="add-book">
        <div className="field">
          <label>Book name:</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Author:</label>
          <select>
            <option>Select author</option>
            { this.displayAuthors() }
          </select>
        </div>
        <button>+</button>

      </form>
    );
  }
}

/**
 * Attach the GraphQL Query to this component
 */
export default graphql(getAuthorsQuery)(AddBook);
