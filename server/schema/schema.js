/**
 * Define Type, Relationships and Root Queries
 */

const graphql = require('graphql');
const logger = require('../logger')('graphql-schema','debug'); //TODO: replace with env var

const {GraphQLObjectType,GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt} = graphql;

// dummy data
var books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorid: '1'},
  { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorid: '2'},
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorid: '3' },
  { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
  { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
  { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

var authors = [
  { name: 'Patrick Rothfuss', age: 44, id: '1' },
  { name: 'Brandon Sanderson', age: 42, id: '2' },
  { name: 'Terry Pratchett', age: 66, id: '3' }
];

const BookType = new GraphQLObjectType( {
  name: 'Book',
  fields: () => ({
    id: {type:GraphQLID},
    name: {type:GraphQLString},
    genre: {type:GraphQLString},
    author: {
      type: AuthorType,
      resolve (parent, args){
        logger.debug(parent);
        return authors.find((a)=>{
          return a.id === parent.authorid
        })
      }
    }

  })
});

const AuthorType = new GraphQLObjectType( {
  name: 'Author',
  fields: () => ({
    id: {type:GraphQLID},
    name: {type:GraphQLString},
    age: {type:GraphQLInt},
  })
});


/**
 * Define Root Queries
 * @type {GraphQLObjectType<any, any, {[p: string]: any}>}
 */
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Name matters
    book:{
     type: BookType,
     args: { id: { type:GraphQLID} },
      /**
       *
       * @param parent
       * @param args
       */
      resolve: function (parent, args) {
        //id = args.id
        //parent = identifies relationships between data
        //code to get data from db source
        logger.debug(typeof (args.id));
        return books.find((b) => {
          return b.id === args.id
        })

      }
    },
    author:{
      type: AuthorType,
      args: { id: { type:GraphQLID} },
      /**
       *
       * @param parent
       * @param args
       */
      resolve: function (parent, args) {
        //id = args.id
        //parent = identifies relationships between data
        //code to get data from db source
        logger.debug(typeof (args.id));
        return authors.find((a) => {
          return a.id === args.id
        })

      }
    }
  }
});
//book(id :'123'){
//  name
//  genre
//}

module.exports = new GraphQLSchema({query: RootQuery});
