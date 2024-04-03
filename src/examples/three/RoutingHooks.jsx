/* eslint-disable */
import {useBrowserLocation} from 'wouter/use-browser-location'
import Button from '../../components/Button.jsx'
import Input from '../../components/Input.jsx'
import Page from '../../components/Page.jsx'
import {useQuery} from 'react-query'

const noNoRoutes = ['/foo', '/bar']

export default function LocationHooksExample () {
  /* 1. Convert to "useLocation" hook (not exactly the same as useBrowserLocation but default use is the same) */
  const [loc, nav] = useBrowserLocation()

  /* 2. Introduce "useRoute" hook to take advantage of existing regex parser to match wildcard routes */

  /* 3. Add "useSearch" hook to snag the search query */
  /** "useSearch" hook only causes a rerender when the actual search changes, base url doesn't count **/

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
      Routing Hooks Example
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

function Todo ({taskid}) {
  // const {data, isLoading} = useQuery({
  //   queryKey: ['getTask', taskid],
  //   queryFn: async () => {
  //     await new Promise(resolve => { setTimeout(() => resolve(), 3000)})
  //     return {taskType: 'call someone', phone: Math.random().toFixed(10).slice(2)}
  //   },
  //   enabled: !!taskid
  // })

  // if (isLoading) return <div>... loading ...</div>
  // return (
  //   <>
  //     <div>Task: {data.taskType}</div>
  //     <div>Phone number: {data.phone}</div>
  //   </>
  // )
  return <div>Todo component</div>
}
