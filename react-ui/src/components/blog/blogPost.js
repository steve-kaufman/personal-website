import React from 'react';

import './blogPost.css';
import Taggable from './../tag/taggable';

class BlogPost extends Taggable {
  render(){
    return <div className='BlogPost'>
      <div className='Title'>{this.props.title}</div>
      <div className='Date'>{new Date(this.props.date).toLocaleString()}</div>
      <div className='Description'>{this.props.description}</div>
      <div className='Contents'>{this.props.contents}</div>
      <div>{super.render()}</div>
    </div>;
  }
}

export default BlogPost;
