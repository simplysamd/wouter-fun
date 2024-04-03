import Button from '../../components/Button.jsx'
import Input from '../../components/Input.jsx'
import Page from '../../components/Page.jsx'

/* 5. Define our bad routes */

export default function LocationHooksExample () {
  /** "useHashLocation" and "memoryLocation" also exist but those are kinda 'if you know you know' so I'm skipping them **/
  /* 1. Set up our "useBrowserLocation" hook */

  const navigate = () => {}

  const watchKey = () => {}

  return (
    <>
      Location Hooks Example
      {/* 2. Make our Page component display the current page location */}
      <Page title={'PAGE TITLE'}>
        <div className={'text-center w-full mx-auto p-4 flex gap-4 justify-center'}>
          {/* 3. Use our Input and Button to easily update our current route */}
          {/* 4. Make the route update input ^ conditional and check for some "bad" routes to show different DOM */}
          <Input placeholder={'Next path'} id={'next-path'} onKeyUp={watchKey} autoFocus />
          <Button onClick={navigate} text={'Navigate'} />
        </div>
      </Page>
    </>
  )
}
