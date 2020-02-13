import React, { Component } from 'react';

import TagList from './../../components/orginize/tagList';
import Flex from './../../components/orginize/flex';
import Project from './project';

class ProjectList extends TagList {

  constructor(props){
    super(props, {
      projects: undefined,
    })

    fetch('/home/projects')
    .then((res) => {
      return res.json();
    })
    .then((projects) => {
      super.updateTags(projects.map(({ tags }) => {
        return tags;
      }).flat(2));
      this.setState({
        projects: projects
      });
    });
  }

  getChildren(){
    if(this.state.projects === undefined){
      return undefined;
    }
    return this.state.projects.map((project, i) => {
      return <Project key={ i } selection={ this.state.selected } click={ this.clickTag.bind(this) } { ...project } />
    });
  }

  render(){
    return <div className='Projects'>
      {
        super.renderTags.bind(this)()
      }
      <Flex>
        {
          super.renderChildren.bind(this)().props.children
        }
      </Flex>
    </div>
  }
}

export default ProjectList;
