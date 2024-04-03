import {useEffect, useRef, useState} from 'react'
import {useBrowserLocation} from 'wouter/use-browser-location'
import {redirectIfTrusted, useLS} from './utils/auth.js'
import Button from './components/Button.jsx'

const _COUNTDOWN_TIMER = 2

export default function NavStuff () {
  const [isResetting, showResetCountdown] = useState(false)
  const [countdown, setCountdown] = useState(_COUNTDOWN_TIMER)
  const [, navigate] = useBrowserLocation()
  const ls = useLS()
  const resetTimer = useRef(null)
  const isDown = useRef(false)

  useEffect(() => {
    window.addEventListener('keydown', check27)
    return () => window.removeEventListener('keydown', check27)
  }, [])

  const check27 = e => {
    if (isDown.current) return
    if (e.key === 'Escape') {
      isDown.current = true
      window.addEventListener('keyup', stop27)
      showResetCountdown(true)
      resetTimer.current = setTimeout(countDown, 0)
    }
  }

  const stop27 = () => {
    isDown.current = false
    resetCountdown()
    window.removeEventListener('keyup', stop27)
  }

  const countDown = (timer = _COUNTDOWN_TIMER) => {
    if (timer === 0) {
      resetCountdown()
      onReset()
    } else {
      setCountdown(timer)
      resetTimer.current = setTimeout(() => countDown(timer - 1), 1000)
    }
  }

  const resetCountdown = () => {
    clearTimeout(resetTimer.current)
    resetTimer.current = null
    showResetCountdown(false)
    setCountdown(_COUNTDOWN_TIMER)
  }

  const goUser = () => {
    const name = ls.get('userid')
    redirectIfTrusted(name, '/user')
  }

  const onReset = () => {
    ls.clear()
    goHome()
  }

  const goHome = () => {
    navigate('/')
  }

  return (
    <>
      {isResetting && (
        <div className='absolute w-screen h-screen bg-gray-800 pt-48 text-4xl text-center text-secondary'>
          Reset in {countdown}
        </div>
      )}
      <div className='absolute px-4 top-4 w-screen flex justify-between'>
        <Button text='Home' onClick={goHome} />
        <Button text='User Page' onClick={goUser} />
      </div>
      <div className='absolute bottom-4 left-0 overflow-visible opacity-0 hover:opacity-100'>
        <Button text='Reset' onClick={onReset} />
      </div>
    </>
  )
}
