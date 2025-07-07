import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
   </HashRouter>
  </React.StrictMode>,
);
