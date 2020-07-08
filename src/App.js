import React, {useState, useEffect} from  'react';
import logo from './logo.svg';
import './App.css';
import {Route, Redirect} from 'react-router-dom';
import Login from './components/login';
import UserList from './components/user_list';
import { useHistory } from "react-router-dom";


function App() {
  const history = useHistory();
  useEffect(() => {
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    if(isLoggedIn){
      history.push('/');
    }else{
      history.push('/login');
    }
  },[])

	const pages = [
    {
      pageLink: '/',
      view: UserList
    },
    {
      pageLink: '/login',
      view: Login
    }
  ];

return (
  <div className="App">
    <Route 
      render={({location}) => (
        <div className="Almighty-Router">
          <Route exact path="/" render={() => <Redirect to="/" />} />
          
          {pages.map((page, i) => {
            return (<Route 
                    exact
                    path={page.pageLink}
                    component={page.view}
                    key={i}
                    />
                    );
          })}
        </div>
      )}
    />
  </div>
);
}

export default App;
