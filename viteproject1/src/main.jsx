import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
const ReactElement = React.createElement(
  'a',
  { href : 'https://chrome.com', target:'_blank'},'click me to visit chrome'
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <br></br>
    {ReactElement}
  </React.StrictMode>,
)
