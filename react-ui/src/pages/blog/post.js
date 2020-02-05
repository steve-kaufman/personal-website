import React, { Component } from 'react';

import BlogPost from './../../components/blog/blogPost';

class Post extends Component {

  static getDerivedStateFromProps(props, state){
    fetch(`/blog/post?post=${props.location.pathname.split('/')[2]}`)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let newState = { loading: false, ...json };
      // FIX: This is hacky and should be fixed
      state.self.setState(newState);
    })

    return null;
  }

  constructor(props){
    super(props);

    this.state = {
      loading: true,
      self: this
    };
  }

  render(){
    return <div>
      {
        (this.state.loading)? 'Page Loading Please Wait' :
        <BlogPost { ...this.state }/>
      }
    </div>
  }
}

export default Post;
