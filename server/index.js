import { GraphQLServer } from "graphql-yoga"
const { Prisma } = require("prisma-binding")
import { auth } from "express-firebase-middleware"
import admin from "./firebase-admin"

const typeDefs = `
  type User {
    id: ID!
    name: String
  }
  type Query {
    users: [User!]!
  }
  type Mutation {
    createUser(name: String): User
  }
`

const resolvers = {
  Query: {
    users: (root, args, ctx, info) => ctx.prisma.query.users({}, info)
  },
  Mutation: {
    createUser: (root, args, ctx, info) =>
      ctx.prisma.mutation.createUser({ data: { name: args.name } }, info)
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: "./prisma/generated/prisma-client/prisma-schema.js",
      endpoint:
        "https://us1.prisma.sh/brandon-dd6787/fullstack-prisma-firebase/dev",
      debug: true
    })
  })
})

server.express.use(auth)

server.start(() => console.log("Server is running on http://localhost:4000"))
