import {useBrowserLocation} from 'wouter/use-browser-location'
import Button from '../../components/Button.jsx'
import Input from '../../components/Input.jsx'
import Page from '../../components/Page.jsx'

const noNoRoutes = ['/foo', '/bar']

export default function LocationHooksExample () {
  /* "useHashLocation" and "memoryLocation" also exist but those are kinda 'if you know you know' so I'm skipping them **/
  const [loc, nav] = useBrowserLocation()

  const navigate = () => {
    const nextPath = '/' + document.querySelector('#next-path').value
    nav(nextPath)
  }

  const watchKey = e => {
    const {key} = e
    if (key === 'Enter') navigate()
  }

  const pageName = loc.slice(1) || '/'

  return (
    <>
      Location Hooks Example (no peeking)
      <Page title={pageName + ' PAGE'}>
        <div className={'text-center w-full mx-auto p-4 flex gap-4 justify-center'}>
          {noNoRoutes.some(each => loc.startsWith(each)) ? (
            <Button watchFor={'Escape'} onClick={() => nav('/')} text={'TURN BACK NOW'} />
          ) : (
            <>
              <Input placeholder={'Next path'} id={'next-path'} onKeyUp={watchKey} autoFocus />
              <Button  onClick={navigate} text={'Navigate'} />
            </>
          )}
        </div>
      </Page>
    </>
  )
}
