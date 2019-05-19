import React, { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { Form } from "semantic-ui-react"

import { auth } from "../../firebase"
import { HandleRedirect } from "../index"
import * as ROUTES from "../../constants/routes"

export const ChangePasswordForm = () => {
  const [newPass, setNewPass] = useState("")
  const [confirmNewPass, setConfirmNewPass] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [user] = useAuthState(auth)

  const enabled = !(
    newPass.length > 5 &&
    newPass === confirmNewPass &&
    !formSubmitted
  )

  const handleChangePassword = event => {
    event.preventDefault()
    user
      .updatePassword(newPass)
      .then(() => {
        setNewPass("")
        setConfirmNewPass("")
        setFormSubmitted(true)
      })
      .catch(error => setError(error))
  }

  if (formSubmitted)
    return (
      <HandleRedirect
        to={ROUTES.LANDING}
        message={"Successfully changed password"}
      />
    )

  return (
    <Form onSubmit={handleChangePassword}>
      {error && <div>Error occured: {error.message} </div>}
      <Form.Input
        type="password"
        value={newPass}
        onChange={e => setNewPass(e.target.value)}
      />
      <Form.Input
        type="password"
        value={confirmNewPass}
        onChange={e => setConfirmNewPass(e.target.value)}
      />
      <Form.Input disabled={enabled} type="submit" value="Submit" />
    </Form>
  )
}
