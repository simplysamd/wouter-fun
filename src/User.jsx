import {Route, useRoute, useLocation} from 'wouter'
import Login from './Login'
import {Page} from './App'

export default function User () {
  const [requireLogin] = useRoute('/user/login')
  const [path] = useLocation()

  if (requireLogin) return (
    <Login />
  )

  return <div>You made it to the user page!</div>
}
