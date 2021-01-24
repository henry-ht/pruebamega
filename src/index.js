import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-notifications/lib/notifications.css';
import 'animate.css/animate.min.css';
import axios from 'axios';
import StatusApp from './helpers/StatusApp';

let token = sessionStorage.getItem('user_token');
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
axios.defaults.headers.common['Authorization'] = 'bearer '+token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



 window['AppStatus'] = new StatusApp();

axios.interceptors.response.use(function (response) {
  
  if(response.data.status === "Token is Expired"){
    
    sessionStorage.removeItem('user_token');
    sessionStorage.removeItem('user_data');

    window['AppStatus'].setLogIn(false);
    window.location.reload(false);
  }

  return response;
}, function (error) {
  return Promise.reject(error);
})

axios.get('solicitante/listarCitas')
.then(res => {

  if(!sessionStorage.getItem('user_token')){
    window['AppStatus'].setLogIn(false);
  }else{

    window['AppStatus'].setLogIn(true);
  }
  setTimeout(() => {
    ReactDOM.render(
      <React.Fragment>
        <App />
      </React.Fragment>,
      document.getElementById('root')
    );

  }, 100);

}, error => {
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
