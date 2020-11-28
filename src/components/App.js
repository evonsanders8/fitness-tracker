import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { getToken, clearToken, hitAPI  } from "../api";
import {AppBar, Toolbar} from '@material-ui/core'

// import {Auth, MyRoutines} from "./components"
import Auth from "./Auth";
import MyRoutines from "../components/MyRoutines";
import Activities from '../components/Activities';
import NewActivityForm from "../components/NewActivityForm";

import Routines from "../components/Routines";



import "./App.css";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [getUserId, setUserId] = useState('')
  const [masterRoutinesList, setMasterRoutineList] = useState([]);
  const [masterActivitiesList, setMasterActivitiesList] = useState([]);



  // fetch all routines for all users to view:
  useEffect(() => {
    //const url = "http://fitnesstrac-kr.herokuapp.com/api";
    if (!isLoggedIn) {
      setMasterRoutineList([]);
      return;
    }
    
      hitAPI("GET", "/users/me")
      .then((data) => {
        setUserId(data.username)
        console.log("username", data.username)
      })
      .catch((err) => console.error(err))
    },[isLoggedIn]);
    
  //   hitAPI("GET", "/users/albert/routines")
  //     .then((data) => {
  //       const {routines} = data;
  //       data.map((rout) => {
  //         console.log(rout.creatorName)
  //         return setMasterRoutineList(rout);
  //       })
  //     })
  //     .catch((err) => console.error(err));
  // }, []);


   
  // fetch all activities for all users to view:
  useEffect(() => {
    //const url = "http://fitnesstrac-kr.herokuapp.com/api";
    hitAPI("GET", "/activities")
      .then((data) => {
        const activities = data;
        setMasterActivitiesList(activities);
      })
      .catch((err) => console.error(err));
  }, []);

  
  // useEffect(() => {
  //   hitAPI("GET", "/routines")
  //     .then((data) => {
  //       console.log('rotutineList', data)
  //       const { routineList } = data
  //       setMasterRoutineList(routineList)
  //     })
  //     .catch(console.error)
  // }, [isLoggedIn])

  // console.log("masterRoutinesList:", masterRoutinesList);
  // console.log("masterActivitiesList:", masterActivitiesList);

  return (
  <Router>
      <div className="app" >
      <AppBar position="absolute" style={{ background: "#344955" }}>
        <Toolbar> Fitness Tracker</Toolbar>
      </AppBar>
     
        <div>
       
        {isLoggedIn ? (
        <div>
            <h1>Thanks for logging in!</h1> 
            <button
              onClick={() => {
                clearToken();
                setIsLoggedIn(false);
              }}
            >
              LOG OUT
            </button>
         </div>
        ):(
          <div>
          <Auth setIsLoggedIn={setIsLoggedIn} />


        <NewActivityForm 
        />


      
        <Activities masterActivitiesList={masterActivitiesList} />
      
       <Routines masterRoutinesList= {masterRoutinesList} />
       
       </div>
      
        )}
  

        </div>
     </div>

    </Router>
    );
    };

export default App;
