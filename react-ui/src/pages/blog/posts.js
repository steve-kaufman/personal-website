import React, { Children } from 'react';

import TagList from './../../components/orginize/tagList';
import Flex from './../../components/orginize/flex';
import Preview from './preview';

class Posts extends TagList {

  constructor(props){
    super(props, {
      posts: undefined,
    });


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
        super.updateTags(posts.map(({ tags }) => {
          return tags;
        }).flat(2));
        this.setState({
          posts: posts
        })
      })
    });
  }

  getChildren(){
    if(this.state.posts === undefined){
      return undefined;
    }
    return this.state.posts.map((post, i) => {
      return <Preview key={ i } selection={ this.state.selected } click={ this.clickTag.bind(this) } { ...post } />
    });
  }

  render(){
    return <div className='Posts'>
      {
        super.renderTags.bind(this)()
      }
      <Flex>
        {
          super.renderChildren.bind(this)().props.children
        }
      </Flex>
    </div>;
  }
}

export default Posts;
