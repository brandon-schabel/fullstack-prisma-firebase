import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import "semantic-ui-css/semantic.min.css"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import { auth } from "./firebase"

import App from "./App"

const token = auth.currentUser ? auth.currentUser.getIdToken(true) : ""

const client = new ApolloClient({
  uri: "http://localhost:4000",
  headers: { authorization: token }
})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
)
