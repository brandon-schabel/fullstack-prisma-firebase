import React, { useState } from "react"
import { auth } from "../../firebase"

// ToDo convert to form and handle error, and succesfful login, redirect
export const EmailSignUpForm = () => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [error, setError] = useState(null)

  const signUp = () => {
    auth
      .createUserWithEmailAndPassword(email, pass)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        setError(error)
      })
  }

  const enabled = !(pass.length > 5 && pass === confirmPass)
  return (
    <div>
      {error && <div>Error: {error.message}</div>}
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input
        type="password"
        value={pass}
        onChange={e => setPass(e.target.value)}
      />
      <input
        type="password"
        value={confirmPass}
        onChange={e => setConfirmPass(e.target.value)}
      />
      <button onClick={signUp} disabled={enabled}>
        Sign Up
      </button>
    </div>
  )
}
