import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { NofificationContextProvider } from './NotificaitionContext'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NofificationContextProvider>
      <App />
    </NofificationContextProvider>
  </QueryClientProvider>
)