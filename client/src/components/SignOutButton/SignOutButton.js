import React, { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { Button } from 'semantic-ui-react'

import { auth } from "../../firebase"

export const SignOutButton = props => {
  const [error, setError] = useState(null)
  const [user] = useAuthState(auth)

  const logout = () => {
    auth
      .signOut()
      .then(() => {})
      .catch(error => {
        setError(error)
      })
  }

  if (user) {
    return (
      <div>
        <div>{error && <div>Error: {error.message}</div>}</div>
        <Button onClick={logout}>Log out</Button>
      </div>
    )
  }
}
