import React, { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { Form } from 'semantic-ui-react'

import { db, auth } from "../../firebase"
import { AuthGuard } from ".."

export const CreatePost = () => {
  const [text, setText] = useState("")
  const [error, setError] = useState(null)
  const [user] = useAuthState(auth)

  const handleSubmitPost = event => {
    event.preventDefault()
    db.collection("posts")
      .add({
        text,
        userId: user.uid
      })
      .then(() => {})
      .catch(error => {
        setError(error)
      })
  }

  return (
    <AuthGuard>
      {error && <div>Error Occured: {error}</div>}
      <Form onSubmit={handleSubmitPost}>
        <Form.Input onChange={e => setText(e.target.value)} value={text} />
        <Form.Input type="submit" value="Create Post" />
      </Form>
    </AuthGuard>
  )
}
