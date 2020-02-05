import React from 'react';

import './project.css';
import Taggable from './../tag/taggable';

class Project extends Taggable {
  render(){
    return <div className='Project'>
      {(this.props.link === undefined)?
        <div className='Name'>
          {this.props.name}
        </div>
      :
        <a href={this.props.link} className='LinkName'>
          {this.props.name}
        </a>
      }
      <div className='Status'>
        {this.props.status}
      </div>
      <div className='description'>
        {this.props.description}
      </div>
      {
        super.render()
      }
    </div>;
  }
}

Project.defaultProps = {
  name: 'Project name not set',
  status: 'active',
  description: 'no description set'
}

export default Project;
