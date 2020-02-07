import React, { Component } from 'react';

import TagSelector from './../../components/tag/tagSelector'
import BlogPost from './../../components/blog/blogPost';

class NewPosts extends Component {
  constructor(props){
    super(props);

    this.state = {
      posts: undefined,
      blogEnd: undefined,
    };


    fetch('/blog/list?count=3')
    .then((res) => {
      return res.json();
    })
    .then((list) => {
      return Promise.all(list.map((post) => {
        return new Promise(function(resolve, reject) {
          fetch(`/blog/post?post=${post.post}`)
          .then((res) => {
            return res.json();
          })
          .then(resolve)
          .catch(reject)
        });
      }))
      .then((posts) => {
        this.setState({
          posts,
          blogEnd: Math.min(list.map((post) => {
            return post.time;
          }))
        });
      })
    });
  }

  render(){
    return <div>
    <TagSelector>
      {
        (this.state.posts === undefined)? <div>fetching blog posts</div>:
        this.state.posts.map((post, i) => {
          return <BlogPost key={i} {...post}/>;
        })
      }
    </TagSelector>
    <button className='MoreButton' onClick={() => {

      fetch(`/blog/new?count=5&start=${this.state.blogEnd}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        this.setState({
          blog: [ ...this.state.posts, ...json.posts ],
          end: json.end
        });
      });
    }}>More Posts</button>
    </div>;
  }
}

export default NewPosts;
