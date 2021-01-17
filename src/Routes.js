import React from 'react';
import SignUp from './components/signUp/index.js';
import Login from './components/login/index.js';
import {useState,useEffect} from   "react";
import Button from '@material-ui/core/Button';
import Dashboard from "./components/dashboard"
import "./main.css"

import { Route, Switch,Redirect } from 'react-router-dom';

const Routes = () =>{
  
  const [loggedIn,setLoggedIn]=useState(false); 
  
 
  useEffect(() => {
    
    if(localStorage.getItem("userInfo")){

      setLoggedIn(true);
  }else{
    setLoggedIn(false);
  }

  }, [])
  
 
  function logout(){
     
    localStorage.clear();
    setLoggedIn(false);
    // setLoggedIn(false;

  }


  
  
 

  
  
  return (


<div >
<div className={"header"} > <div style={{textAlign:"center"}}> College Management  </div> <div>{loggedIn&&<Button variant="contained" color="primary" style={{float:"right"}} onClick={logout}>Logout</Button>}</div></div> 

<div className={"body"}>  <Switch>
 
   
    {!loggedIn&& <Route
      exact
      path='/signUp'
      name='Sign Up'
      component={SignUp}
    />}

     {!loggedIn&& <Route
      exact
      path='/login'
      name='Login'
      
      
    >
      <Login setLoggedIn={setLoggedIn}></Login>
      </Route>}

   {loggedIn&&<Route
    exact
    path="/dashboard"
  
   >
    <Dashboard ></Dashboard>
    </Route>}

     
      <Route
    
      path="/"
   
     >
      {loggedIn?<Redirect to="/dashboard"/>:<Redirect to="/login"/>}
      </Route>

     
   
  </Switch> </div> </div>
);}

export default Routes;


