import React, { Component, Fragment } from 'react';

import ReactMarkdown from 'react-markdown';

import './post.css';

class Post extends Component {

  constructor(props){
    super(props);

    this.state = {
      loading: true,
    };

    fetch(`/blog/post?post=${props.location.pathname.split('/')[2]}`)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      this.setState({
        loading: false,
        ...json,
      });
    })
  }

  render(){
    console.log(this.state);
    return <Fragment>
      {
        (this.state.loading)? 'Page Loading Please Wait' :
        <div className='Post'>
          <div>
            <div className='Top'>
              <div className='Title'>{ this.state.title }</div>
              <div className='Date'>{ this.state.date }</div>
            </div>
            <ReactMarkdown source={ this.state.contents } />
          </div>
        </div>
      }
    </Fragment>
  }
}

export default Post;
