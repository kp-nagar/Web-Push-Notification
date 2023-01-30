import logo from './logo.svg';
import './App.css';
import {getMessaging, getToken} from "firebase/messaging"
import { useEffect } from 'react';
import app from './firebase';


function App() {
  const messaging = getMessaging(app);
  useEffect(() => {
    navigator.serviceWorker.register('./firebase-messaging-sw.js')
    .then((registration) => {
      console.log('registration',registration)
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission grant.');
        }
      });
      {
        getToken(messaging, { vapidKey: '' })
          .then((currentToken) => {
            if (currentToken) {
              console.log('tokennnnnn:::::::::::::', currentToken);
              console.log('Requesting permission...');
            } else {
              console.log('No registration token available. Request permission to generate one.');
            }
          })
          .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
          });
      }
    });
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
