import './App.css';
import { useState, useEffect } from 'react';
import Login from './components/Login/Login';
import { HashRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Signup/Signup';
import Main from './components/Main/Main';
import { onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase"
import Detail from './components/Detail/Detail';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
          setCurrentUser(user)
          setLoggedIn(true)
          console.log("Logged in " + user.uid)
      } else {
          setCurrentUser(null)
          console.log("User signed out")
          setLoggedIn(false)
      }
    });
  }, [currentUser, loggedIn])

  let app;
  if(!loggedIn) {
    app = <>
            <Route path="/" element={<Login setLoggedIn={setLoggedIn}/>} />
            <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} />} />
          </>  
  } else {
    app = <>
            <Route path="/" element={<Main currentUser={currentUser}/>} />
            <Route path="/:id" element={<Detail/>} />
          </>
  }

  return (
    <HashRouter>
    <Routes>
      {app}
    </Routes>
  </HashRouter>
  );
}

export default App;
