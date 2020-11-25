import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { getToken, clearToken, fetchAPI } from "../api";

// import {Auth, MyRoutines} from "./components"
import Auth from "../components/Auth";
import MyRoutines from "../components/MyRoutines";

import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken())
  const [routineList, setRoutineList] = useState([])

  useEffect(() => {
    fetchAPI('http://fitnesstrac-kr.herokuapp.com/api/users/albert/routines','GET')
      .then((data) => {
        console.log('first data', data)
        const { routineList } = data
        setRoutineList(routineList)
      })
      .catch(console.error)
  }, [isLoggedIn])


  return (
    <Router>
      <div className="app">
        <header className="App-header">
          <Auth
          setIsLoggedIn={setIsLoggedIn} />

          {/* <Link to="/activities"><ActiviteisNav></Link> */}
        </header>
        <h1>Hello World</h1>
        {/* <Route path="/activities">
      <Activites />
      </Route> */}
        <Route exact path="/myroutines">
          <MyRoutines />
        </Route>
      </div>
    </Router>
  );
};

export default App;
