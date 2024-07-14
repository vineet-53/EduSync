import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './reset.css'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import store from "./store/index.js"
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter > 
      <Provider store={store}>
          <App />
          <Toaster /> 
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
) 
