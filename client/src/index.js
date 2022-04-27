import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { AuthProvider } from './contexts/authContext'
import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>,
  document.getElementById('root')
)