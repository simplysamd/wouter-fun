import PropTypes from 'prop-types'
import {useEffect} from 'react'
import { Route, useLocation, useRoute, Link, Router, Switch } from 'wouter'
import { navigate } from 'wouter/use-browser-location'
import {useAuth} from './utils/auth'
import User from './User'
import NavStuff from './NavStuff'
import './App.css'

function App() {
  const [isMatch, route] = useRoute('/user/*?')
  const isAuth = useAuth()

  useEffect(() => {
    console.log(isMatch)
    if (isMatch && !isAuth) navigate('/user/login')
    if (isMatch && isAuth && route['*'] === 'login') navigate('/user')
  }, [isMatch, isAuth, route])

  return (
    <div className={'bg-gray-900 h-screen overflow-auto font-display text-slate-400 border-red-400 relative'}>
      <NavStuff />
      {/*<Link to='/user-landing-page'>User Landing Page?</Link>*/}
      <Route path='/'>
        <Page>
          <div className='text-2xl'>Welcome to my "Fun with Wouter" landing page!</div>
          <Link to={'/swapi'}>Show me the StarWars stuff</Link>
        </Page>
      </Route>
      <Route path='/user/*?'>
        <Page>
          <User />
        </Page>
      </Route>
      <Router base='/swapi'>
        <Route path={'/'}>
          <Page>
            <div className={'flex flex-col'}>
              <Link className='hover:text-primary' to={'/lightsabers/all'}>All Lightsabers</Link>
              <Link className='hover:text-primary' to={'/lightsabers/blue'}>Blue Lightsabers</Link>
            </div>
          </Page>
        </Route>
        <Switch>
          <Route path={'/lightsabers/all'}>All Lightsabers</Route>
          <Route path={'/lightsabers/:color'}>Lightsabers By Color</Route>
        </Switch>
        {/*<Switch>*/}
        {/*  <R*/}
        {/*</Switch>*/}
      </Router>
    </div>
  )
}

export default App

export function Page (props) {
  const {children} = props
  const [location] = useLocation()

  const pageName = location.slice(1) || 'home'

  return (
    <>
      <div className={'text-primary text-4xl text-center pt-4 mb-16 uppercase'}>{pageName} PAGE</div>
      <div className={'border border-gray-700 p-4 mx-auto max-w-[960px]'}>
        {children}
      </div>
    </>
  )
}

Page.propTypes = {
  children: PropTypes.node
}
