import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './bootstrap.min.css'
import { BrowserRouter as Router } from 'react-router-dom'
import store from "./store/index.js"
import { Provider } from'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
      <App />
      </Provider>
    </Router>
  </React.StrictMode>,
)
