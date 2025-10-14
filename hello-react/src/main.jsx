import ReactDom from 'react-dom/client'
import React from 'react'
import App from './App'

ReactDom.createRoot(document.querySelector('#root')).render(
    <React.StrictMode>
        <App></App>
    </React.StrictMode>

)