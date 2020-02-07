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

    fetch('/blog/list')
    .then((res) => {
      return res.json();
    })
    .then((list) => {
      Promise.all(list.map((post) => {
        return new Promise(function(resolve, reject) {
          fetch(`/blog/post?post=${post.post}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            resolve({ id: post.post, ...data });
          })
          .catch(reject)
        });
      }))
      .then((posts) => {
        this.setState({
          postList: posts.map((post) => {
            return { id: post.id, description: post.description };
          })
        });
      });
    });
  }

  render(){
    return <div>
      <Router>
        <div>
          <div className='Sidebar'>
            <Link className='Header' to={`/blog/`}> Blog </Link>
            <div className='Links'>
              {
                this.state.postList.map((post, i) => {
                  return <div className='Link'>
                    <Link key={i} to={`/blog/${post.id}`}>{post.description}</Link>
                  </div>
                })
              }
            </div>
          </div>
          <div className='Body'>
            <Switch>
              <Route exact path='/blog/' component={NewPosts}/>
              <Route path='/blog/*' component={Post}/>
            </Switch>
          </div>
        </div>
      </Router>
    </div>;
  }
}

export default Blog;
