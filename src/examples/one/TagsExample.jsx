/* eslint-disable */
import {Link, Redirect, Route, Switch, Router} from 'wouter'
import Page from '../../components/Page.jsx'
import {useState} from 'react'
import Input from '../../components/Input.jsx'

/*
1. Adding a tag to navigate to the /users page
2. Conditionally rendering a UserPage component on the /users page based on a tag
3. Only showing the first matching route should several matches exist
4. Redirect from routes we don't like
5. Quick look at the ol' Router tag
6. Nested routes
 */

export default function TagsExample () {
  const [pathVal, setPathVal] = useState('')

  const watchKey = e => {
    let {value} = e.target
    if (value) value = '/' + value
    setPathVal(value)
  }

  return (
    <>
      Tags Example
      <Page title={'TAGS EXAMPLE'}>
        <div className={'flex gap-4 justify-center'}>
          <Input placeholder={'Next path'} id={'next-path'} onKeyUp={watchKey} autoFocus />
        </div>
      </Page>
    </>
  )
}

function GoAway () {
  const [showRedirect, toggleRedirect] = useState(false)
  return <div>You should not be here...</div>
}

function UserPage ({userid}) {
  return (
    <div className={'mt-16 text-center text-secondary'}>I am the User-specific page. Hi {userid}!</div>
  )

}

function UserLandingPage () {
  return (
    <div className={'mt-16 text-center'}>I am the User Landing Page</div>
  )
}

const foodGroups = ['candy_canes', 'candy_corn', 'syrup']
