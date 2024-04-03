import Button from './components/Button.jsx'
import {redirectIfTrusted, useLS} from './utils/auth.js'

export default function Login () {
  const {set} = useLS()

  const check13 = e => {
    if (e.key === 'Enter') doLogin()
  }

  const doLogin = () => {
    const name = document.querySelector('#login-fname').value
    set('userid', name)
    redirectIfTrusted(name, '/user')
  }

  return (
    <>
      <p className='text-center'>Login, genius</p>
      <div className={'text-center w-full mx-auto p-4 flex gap-4 justify-center'}>
        <input
          autoFocus
          onKeyUp={check13}
          id={'login-fname'}
          placeholder='First Name'
          className={'indent-2 w-48 border border-teal-400 placeholder:text-slate-600 bg-gray-800'}
        />
        <Button text='Login' onClick={doLogin} />
      </div>
    </>
  )
}
