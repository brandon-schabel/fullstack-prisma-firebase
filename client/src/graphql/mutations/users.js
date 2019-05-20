import { gql } from "apollo-boost"

export const CREATE_USER = gql`
  mutation createUser($name: String!) {
    createuser(name: $name) {
      id
      name
    }
  }
`
