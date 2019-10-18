/**
 * Define Type, Relationships and Root Queries
 */
const graphql = require('graphql');
const logger = require('../logger')('graphql-schema', 'info'); //TODO: replace with env var

const {
        GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID, GraphQLInt,
        GraphQLList,
        GraphQLNonNull
      } = graphql;
const BookModel = require('../models/book');
const AuthorModel = require('../models/author');

// dummy data
//var books = [
//  {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
//  {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
//  {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
//  {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2'},
//  {name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3'},
//  {name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'},
//];
//
//var authors = [
//  {name: 'Patrick Rothfuss', age: 44, id: '1'},
//  {name: 'Brandon Sanderson', age: 42, id: '2'},
//  {name: 'Terry Pratchett', age: 66, id: '3'}
//];

const BookType = new GraphQLObjectType({
  name:   'Book',
  fields: () => ({
    id:     {type: GraphQLID},
    name:   {type: GraphQLString},
    genre:  {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args) {
        logger.debug(parent);
        return AuthorModel.findById(parent.authorId);
      }
    }

  })
});

const AuthorType = new GraphQLObjectType({
  name:   'Author',
  fields: () => ({
    id:    {type: GraphQLID},
    name:  {type: GraphQLString},
    age:   {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        logger.debug(books);
        return BookModel.find({authorId: parent.id})
      }
    }
  })
});

/**
 * Define Root Queries
 * @type {GraphQLObjectType<any, any, {[p: string]: any}>}
 */
const RootQuery = new GraphQLObjectType({
  name:   'RootQueryType',
  fields: {
    // Name matters
    book:    {
      type:    BookType,
      args:    {id: {type: GraphQLID}},
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
        return BookModel.findById(args.id);

      }
    },
    author:  {
      type:    AuthorType,
      args:    {id: {type: GraphQLID}},
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
        AuthorModel.findById(args.id);

      }
    },
    books:   {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return BookModel.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return AuthorModel.find({})
      }
    }
  }
});
//book(id :'123'){
//  name
//  genre
//}

const Mutation = new GraphQLObjectType({
  name:   'Mutation',
  fields: {
    /**
     * Create a new Author
     */
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age:  {type: new GraphQLNonNull(GraphQLInt)},
      },
      resolve(parent, args) {
        let author = new AuthorModel({
          name: args.name,
          age:  args.age
        });

        return author.save();
      }
    },
    /**
     * Create a new Book
     */
    addBook:   {
      type: BookType,
      args: {
        name:     {type: new GraphQLNonNull(GraphQLString)},
        genre:    {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve(parent, args) {
        let book = new BookModel({
          name:     args.name,
          genre:    args.genre,
          authorId: args.authorId,
        });

        return book.save();
      }
    }
  }
});
module.exports = new GraphQLSchema(
  {
    query:    RootQuery,
    mutation: Mutation
  });
