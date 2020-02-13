import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Posts from './posts';
import Post from './post';

import './blog.css';

function get(route){
  return fetch(route)
  .then((res) => {
    return res.json();
  });
}

class Blog extends Component {

  constructor(props){
    super(props);
    this.state = {
      resent: undefined,
      highlighted: undefined,
      popular: undefined,
    }

    // get('/blog/resent')
    // .then((posts) => {
    //
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
    //
    // get('/blog/highlighted')
    // .then((posts) => {
    //
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
    //
    // fetch('/blog/popular')
    // .then((posts) => {
    //
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  }

  search(){
    let search = document.getElementById('search_bar').value;
    console.log(search);
    // TODO:
  }

  render(){
    return <div className='Root'>
      <div className='Display'>
        <Router>
          <Switch>
            <Route exact path='/blog/' component={Posts}/>
            <Route path='/blog/' component={Post}/>
          </Switch>
        </Router>
      </div>
      <div className='Navigation'>
        <div>
          <Link className='Home_Link' to='/blog/'><h1>Blog</h1></Link>
          <div className='Search'>
            <input id='search_bar' onKeyPress={(e) => {
              if(e.key === 'Enter'){
                this.search();
              }
            }} className='Search_Bar'/>
            <button onClick={this.search.bind(this)} className='Search_Button'/>
          </div>
          <div className='Post_List'>
            <h2>Resent Posts</h2>
            <div className='Posts'>
              {
                (this.state.resent === undefined)?
                <span>loading</span>
                :
                this.state.resent.map((post) => {
                  return 'TODO'
                })
              }
            </div>
          </div>
          <div className='Post_List'>
            <h2>Highlighted</h2>
            <div className='Posts'>
              {
                (this.state.highlighted === undefined)?
                <span>loading</span>
                :
                this.state.highlighted.map((post) => {
                  return 'TODO'
                })
              }
            </div>
          </div>
          <div className='Post_List'>
            <h2>Popular</h2>
            <div className='Posts'>
              {
                (this.state.popular === undefined)?
                <span>loading</span>
                :
                this.state.popular.map((post) => {
                  return 'TODO'
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default Blog;
