import React, { Component } from 'react';

import Tag from './../../components/orginize/tag';

import './project.css';

class Project extends Component {
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
      <div className='Tags'>
        {
          this.props.tags.map((tag, i) => {
            return <Tag key={i} selected={ this.props.selection.indexOf(tag) !== -1 } update={ () => {
              this.props.click(tag)
            } } tag={tag}/>;
          })
        }
      </div>
    </div>;
  }
}

Project.defaultProps = {
  name: 'Project name not set',
  status: 'active',
  description: 'no description set'
}

export default Project;
