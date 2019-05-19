import { GraphQLServer } from "graphql-yoga"

import app from "firebase/app"
import "firebase/auth"

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APPI_ID
}

const firebaseApp = app.initializeApp(config)


const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,
    users: (parent, args, ctx, info) => {}
  }
}

vbserver.start(() => console.log("Server is running on localhost:4000"))
