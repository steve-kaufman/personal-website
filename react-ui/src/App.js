import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import './App.css';

import HomePage from './pages/home/home';
import BlogPage from './pages/blog/blog';
import ContactPage from './pages/contact/contact';

class AppWrapper extends Component {
  render(){
    return <Router>
      <div className='TopBar'>
        <Link className='Name' to='/'>Leyla Becker</Link>
        <span className='NavBar'>
          <Link className='Nav' to='/'>Home</Link>
          <Link className='Nav' to='/blog'>Blog</Link>
          <Link className='Nav' to='/contact'>Contact</Link>
        </span>
      </div>
      <div className='Page'>
        <Switch>
          <Route exact path='/contact' component={ContactPage}/>
          <Route path='/blog' component={BlogPage}/>
          <Route path='/' component={HomePage}/>
        </Switch>
      </div>
      <div className='Footer'>
        <div>
          <a href='mailto:jbec1901@pm.me'>jbec1901@pm.me</a>
          <hr className='Vertical'/>
          <span>612-460-1499</span>
          <hr className='Vertical'/>
          <a href='https://github.com/jbec1901'>github.com/jbec1901</a>
          <hr className='Vertical'/>
          <span className='Copyright'>©2020 Leyla Becker</span>
        </div>
      </div>
    </Router>;
  }
}

function App() {
  return (
    <AppWrapper/>
  );
}

export default App;
