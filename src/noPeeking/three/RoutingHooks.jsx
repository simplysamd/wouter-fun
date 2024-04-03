import {useLocation, useRoute, Route, useSearch, useRouter, useParams} from 'wouter'
import Button from '../../components/Button.jsx'
import Input from '../../components/Input.jsx'
import {useQuery} from 'react-query'

const noNoRoutes = ['/foo', '/bar']

export default function RoutingHooksExample () {
  /** Can see diff between "useLocation" and "useBrowserLocation" by wrapping both in <Router base='app'> **/
  /* Convert to "useLocation" hook (not exactly the same as useBrowserLocation but default use is the same) */
  const [loc, nav] = useLocation()

  /* Introduce "useRoute" hook to take advantage of existing regex parser to match wildcard routes */
  const [isC2Route] = useRoute('/c2/*?')
  /* Also get params */
  // const [c2todo, params] = useRoute('/c2/todo/:taskid')

  /* Add "useSearch" hook to snag the search query */
  /** "useSearch" hook only causes a rerender when the actual search changes, base url doesn't count **/
  const search = useSearch()
  console.log(search)

  /* Look at "useRouter" hook. This is for advanced config stuff within a descendent of the <Router> component */
  const router = useRouter()
  console.log(router)

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
      Routing Hooks Example (no peeking)
      <div className={`${isC2Route ? 'text-c2' : 'text-primary'} text-4xl text-center pt-4 mb-16 uppercase`}>{pageName} PAGE</div>
      <div className={'border border-gray-700 p-4 mx-auto max-w-[960px]'}>
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
        <Route path='/c2/todo/:taskid'>
          <Todo />
        </Route>
      </div>
    </>
  )
}

function Todo () {
  const {taskid} = useParams()
  const search = useSearch()
  console.log(taskid, search)
  const {data, isLoading} = useQuery({
    queryKey: ['getTask', taskid],
    queryFn: async () => {
      await new Promise(resolve => { setTimeout(() => resolve(), 3000)})
      return {taskType: 'call someone', phone: Math.random().toFixed(10).slice(2)}
    },
    enabled: !!taskid
  })

  if (isLoading) return <div>... loading ...</div>
  return (
    <>
      <div>Task: {data.taskType}</div>
      <div>Phone number: {data.phone}</div>
    </>
  )
}
