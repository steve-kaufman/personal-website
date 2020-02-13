import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Image from 'mini-image-react';

import Tag from './../../components/orginize/tag';

import './preview.css'

class Preview extends Component {
  render(){
    return <div className='Preview'>
      <div>
        <Link className='Post_Body' to={`/blog/${this.props._id}`}>
          <div className='Top'>
            <div className='Title'>{this.props.title}</div>
            <div className='Date'>{new Date(this.props.date).toLocaleString()}</div>
          </div>
          {
            (this.props.cover)? <Image className='Preview_Photo' src={this.props.cover} alt='' /> : null
          }
          <div className='Description'>{this.props.description}</div>
        </Link>
        <div className='Tags'>
          {
            this.props.tags.map((tag, i) => {
              return <Tag key={i} selected={ this.props.selection.indexOf(tag) !== -1 } update={ () => {
                this.props.click(tag)
              } } tag={tag}/>;
            })
          }
        </div>
      </div>
    </div>
  }
}

export default Preview;
