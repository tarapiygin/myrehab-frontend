import './css/accounts.css';
import './css/animate.css';
import './css/magnific-popup.css';
import './css/owl.theme.css';
import './css/common.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import AppHome from './AppHome';
import reportWebVitals from './reportWebVitals';
import store from './Store/store';
import Notice from './Components/Base/Notice/Notice';
import SearchForm from './Components/Reestr/SearchForm';
import PatientFormWidget from './Components/Reestr/PatientFormWidget';

document.addEventListener('DOMContentLoaded', () => {
  const reactHome = document.getElementById('react-home');
  if (reactHome !== null) {
    const home = ReactDOM.createRoot(reactHome);
    // обновление данных каждую минуту
    home.render(
      <React.StrictMode>
        <Provider store={store}>
          <Notice />
          <AppHome />
        </Provider>
      </React.StrictMode>,
    );
  }

  const reestrSearchForm = document.getElementById('searchForm');
  if (reestrSearchForm !== null) {
    new SearchForm(reestrSearchForm).init();
  }

  const patientFormEl = document.getElementById('patientForm');
  if (patientFormEl !== null) {
    new PatientFormWidget(patientFormEl).init();
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
