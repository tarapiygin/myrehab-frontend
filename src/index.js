import './css/commonStyles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import AppHome from './AppHome';
import reportWebVitals from './reportWebVitals';
import store from './Store/store';
import Notice from './Components/Base/Notice/Notice';

const reactHome = document.getElementById('react-home');
const home = ReactDOM.createRoot(reactHome);
if (reactHome !== null) {
  home.render(
    <React.StrictMode>
      <Provider store={store}>
        <Notice />
        <AppHome />
      </Provider>
    </React.StrictMode>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
