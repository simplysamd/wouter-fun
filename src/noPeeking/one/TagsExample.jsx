/* eslint-disable */
import {Link, Redirect, Route, Switch, Router} from 'wouter'
import Page from '../../components/Page.jsx'
import {useState, useEffect, Fragment} from 'react'
import Input from '../../components/Input.jsx'
import Button from '../../components/Button.jsx'

/*
1. Adding a tag to navigate to the /users page
2. Conditionally rendering a UserPage component on the /users page based on a tag
3. Only showing the first matching route should several matches exist
4. Redirect from routes we don't like
5. Quick look at the ol' Router tag
6. Nested routes
 */

const foodGroups = ['candy_canes', 'candy_corn', 'syrup']

export default function TagsExample () {
  const [linkUser, toggleLink] = useState(true)
  const [pathVal, setPathVal] = useState('')

  const watchKey = e => {
    let {value} = e.target
    if (value) value = '/' + value
    setPathVal(value)
  }

  return (
    <Page title={'TAGS EXAMPLE'}>
      {/** 5 **/}
      <Router base={'/app'}>
        {/** 1 **/}
        <div className={'flex gap-4 justify-center'}>
          <Input placeholder={'Next path'} id={'next-path'} onKeyUp={watchKey} autoFocus />
          <Link to={pathVal}>
          <span className={'p-2 text-bgclr bg-primary border border-transparent hover:bg-transparent hover:border-primary hover:text-primary'}>
            Go!
          </span>
          </Link>
        </div>
        {/** 3 **/}
        <Switch>
          {/** 2 **/}
          <Route path={'/users/:userid'}>
            {params => <UserPage userid={params.userid} />}
          </Route>
          <Route path={'/users/*?'}>
            <UserLandingPage />
          </Route>
        </Switch>
        {/** 4 **/}
        <Route path={'foo/*?'}>
          <GoAway />
        </Route>
        {/** 6 **/}
        <Route path={'/foods'} nest>
          <div className={'my-16 flex justify-between'}>
            {foodGroups.map(each => (
              <Fragment key={each}>
                <Link key={each} to={'/' + each}>
                  <span className={'p-2 text-bgclr bg-primary border border-transparent hover:bg-transparent hover:border-primary hover:text-primary'}>
                    {each}
                  </span>
                </Link>
                <Route path={'/' + each}>
                  <div className={'my-16 text-center'}>boy I sure do love {each}!</div>
                </Route>
              </Fragment>
            ))}
          </div>

        </Route>
      </Router>
    </Page>
  )
}

function GoAway () {
  const [showRedirect, toggleRedirect] = useState(false)

  useEffect(() => {
    const x = setTimeout(() => toggleRedirect(true), 2000)
    return () => clearTimeout(x)
  }, [])

  if (showRedirect) return <Redirect to={'/'} />

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
