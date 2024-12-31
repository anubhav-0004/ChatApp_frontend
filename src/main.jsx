import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'

createRoot(document.getElementById('root')).render(
    <HelmetProvider>
      <CssBaseline/>
      <div><App /></div>
    </HelmetProvider>
)
