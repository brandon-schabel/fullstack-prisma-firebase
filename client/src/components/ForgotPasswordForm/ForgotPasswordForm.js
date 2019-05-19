import React, { useState } from "react"
import { Form } from 'semantic-ui-react'

import { auth } from "../../firebase"
import * as ROUTES from "../../constants/routes"
import { HandleRedirect } from "../index"

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("")
  const [sentSuccess, setSentSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleSendEmail = event => {
    event.preventDefault()

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setSentSuccess(true)
      })
      .catch(error => {
        setError(error)
      })
  }

  if (sentSuccess)
    return (
      <HandleRedirect
        to={ROUTES.LANDING}
        message={"Please check your e-mail for a password reset link."}
      />
    )

  return (
    <Form onSubmit={handleSendEmail}>
      {error && <div>Error: {error.message}</div>}
      <Form.Input value={email} onChange={e => setEmail(e.target.value)} />
      <Form.Input type="submit" value="Submit" disabled={sentSuccess} />
    </Form>
  )
}
