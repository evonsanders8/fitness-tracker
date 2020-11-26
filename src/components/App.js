import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { getToken, clearToken, fetchAPI, BASE_URL } from "../api";

// import {Auth, MyRoutines} from "./components"
import Auth from "../components/Auth";
import MyRoutines from "../components/MyRoutines";

import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [masterRoutinesList, setMasterRoutineList] = useState([]);
  const [masterActivitiesList, setMasterActivitiesList] = useState([]);

  // fetch all routines for all users to view:
  useEffect(() => {
    const url = "http://fitnesstrac-kr.herokuapp.com/api";
    fetchAPI(`${url}/routines`, "GET")
      .then((data) => {
        const routines = data;
        setMasterRoutineList(routines);
      })
      .catch((err) => console.error(err));
  }, []);

  // fetch all activities for all users to view:
  useEffect(() => {
    const url = "http://fitnesstrac-kr.herokuapp.com/api";
    fetchAPI(`${url}/activities`, "GET")
      .then((data) => {
        const activities = data;
        setMasterActivitiesList(activities);
      })
      .catch((err) => console.error(err));
  }, []);

  /*
  useEffect(() => {
    fetchAPI('http://fitnesstrac-kr.herokuapp.com/api/users/albert/routines','GET')
      .then((data) => {
        console.log('first data', data)
        const { routineList } = data
        setRoutineList(routineList)
      })
      .catch(console.error)
  }, [isLoggedIn])
*/
  console.log("masterRoutinesList:", masterRoutinesList);
  console.log("masterActivitiesList:", masterActivitiesList);

  return (
    <Router>
      <div className="app">
        <header className="App-header">
          <Auth setIsLoggedIn={setIsLoggedIn} />

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
