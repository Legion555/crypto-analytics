import Layout from '../components/Layout'
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
//redux
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from '../reducers'

const store = createStore(
  rootReducer
)

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps}/>
      </Layout>
    </Provider>
  )
}

export default MyApp
