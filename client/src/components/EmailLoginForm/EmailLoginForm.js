import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Form } from 'semantic-ui-react'

import { auth } from "../../firebase"
import * as ROUTES from "../../constants/routes"
import { HandleRedirect } from "../index"

export const EmailLoginForm = () => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [signInSuccess, setSignInSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = event => {
    event.preventDefault()
    auth
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        setSignInSuccess(true)
      })
      .catch(error => {
        setError(error)
      })
  }

  if (signInSuccess)
    return (
      <HandleRedirect
        to={ROUTES.LANDING}
        message={"Successfully Logged In"}
      />
    )

  return (
    <Form onSubmit={handleLogin}>
      {error && <div>Error: {error.message}</div>}
      <Form.Input value={email} onChange={e => setEmail(e.target.value)} />
      <Form.Input
        type="password"
        value={pass}
        onChange={e => setPass(e.target.value)}
      />
      <Form.Input type="submit" value="Submit" />
      <Link to={ROUTES.FORGOT_PASSWORD}>Forgot Password</Link>
    </Form>
  )
}
