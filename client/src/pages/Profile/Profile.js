import React from "react"

import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../firebase"
import { ChangePasswordForm, CreatePost, ViewPosts } from "../../components"
import { GET_USERS } from "../../graphql"
import { useQuery } from "@apollo/react-hooks"
import { CreateUser } from "./CreateUser"
export const Profile = () => {
  const [user] = useAuthState(auth)

  const { data, loading, error, refetech, networkStatus, client } = useQuery(
    GET_USERS
  )

  return (
    <div>
      {loading ? <div>loading...</div> : JSON.stringify(data)}
      <CreatePost />
      <ViewPosts />
      {JSON.stringify(user)}
      <ChangePasswordForm />
      <CreateUser></CreateUser>
    </div>
  )
}
