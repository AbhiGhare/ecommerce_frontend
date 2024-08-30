import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Import your CSS files
// import './assets/css/bootstrap.min.css';
import './assets/css/LineIcons.3.0.css';
import './assets/css/tiny-slider.css';
import './assets/css/glightbox.min.css';
import './assets/css/main.css';
// Import Bootstrap JavaScript
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Provider } from 'react-redux';
import { store } from './redux/store/store.js';
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
    <App />
  </StrictMode>
  </Provider>,
)
