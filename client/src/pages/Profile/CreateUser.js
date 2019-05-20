import React, { useState } from "react"

import { GET_USERS, CREATE_USER } from "../../graphql"
import { useMutation } from "@apollo/react-hooks"

export const CreateUser = () => {
  const [name, setName] = useState("")
  const [createUser, { error, data }] = useMutation(CREATE_USER, {
    variables: { name }
  })

  const handleCreateUser = () => {
    createUser(name)

    console.log(error, data)
  }
  return (
    <div>
      <input onChange={e => setName(e.target.value)} value={name} />
      <button onClick={handleCreateUser}> </button>
    </div>
  )
}
