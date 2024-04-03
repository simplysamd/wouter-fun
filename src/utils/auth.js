import {navigate} from 'wouter/use-browser-location'

/*
Pretend your application has multiple points of entry to the "logged in" sections and you want
a reusable function that can be added to any click event to confirm whether the user's auth is valid.
Wouter's "navigate" can be used wherever!
 */

export function redirectIfTrusted (name, to) {
  const isAuth = name === 'sam'

  if (isAuth) {
    navigate(to)
  } else {
    navigate('/user/login')
  }
}

export function useLS () {
  const get = name => JSON.parse(window.localStorage.getItem(name))

  const set = (name, value) => {
    window.localStorage.setItem(name, JSON.stringify(value))
  }

  const clear = name => {
    if (name) window.localStorage.removeItem(name)
    else window.localStorage.clear()
  }

  return {get, set, clear}
}

export function useAuth () {
  const {get} = useLS()
  return get('userid') === 'sam'
}
