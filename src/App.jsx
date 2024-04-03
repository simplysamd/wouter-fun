/* eslint-disable */
import TagsExample from './examples/one/TagsExample.jsx'
import LocationHooksExample from './examples/two/LocationHooks'
import RoutingHooksExample from './examples/three/RoutingHooks.jsx'
import './App.css'
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={'bg-gray-900 h-screen overflow-auto font-display text-slate-400 border-red-400 relative'}>
        {/*<TagsExample />*/}
        {/*<LocationHooksExample />*/}
        {/*<RoutingHooksExample />*/}
      </div>
    </QueryClientProvider>
  )
}

export default App
