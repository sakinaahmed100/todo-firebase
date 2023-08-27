import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MyContextProvider } from './context/context.jsx'
import { SignContextProvider } from './context/SignContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SignContextProvider>
    <MyContextProvider>
    <App />
    </MyContextProvider>
    </SignContextProvider>
  </React.StrictMode>,
)
