import { GraphQLServer } from "graphql-yoga"

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,
    users: (parent, args, ctx, info) => {

    }
  }
}

 vbserver.start(() => console.log("Server is running on localhost:4000"))
