import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title,
      author,
      published,
      genres
      id
    } 
  }
` 

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
    addBook (
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      author,
      published,
      genres,
      id
    }
  }
`

export const UPDATE_BORNYEAR = gql`
  mutation editAuthor($name: String!, setBornTo: Int!){
    editAuthor($name: name, $born: setBornTo){
      name,
      born,
      bookCount
    }
  }
`