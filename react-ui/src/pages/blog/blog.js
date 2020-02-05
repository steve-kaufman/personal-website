import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import './blog.css';

import NewPosts from './newPosts';
import Post from './post';

class Blog extends Component {
  constructor(props){
    super(props);

    this.state = {
      postList: [],
    };

    fetch('/blog/postList')
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      this.setState({
        postList: json
      })
    });
  }

  render(){
    return <div>
      <div className='Header'>Blog Post's</div>
      <div>
      <Router>
          <div className='Sidebar'>
            {
              this.state.postList.map((post, i) => {
                return <Link key={i} className='BlogNav' to={`/blog/${post.id}`}>{post.description}</Link>
              })
            }
          </div>
          <div className='Body'>
            <Switch>
              <Route exact path='/blog/' component={NewPosts}/>
              <Route path='/blog/*' component={Post}/>
            </Switch>
          </div>
        </Router>
      </div>
    </div>;
  }
}

export default Blog;
