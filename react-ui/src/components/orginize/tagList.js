import React, { Component, Fragment, Children } from 'react';

import Tag from './tag';

class TagList extends Component {

  constructor(props, state){
    super(props);
    this.state = { ...state, ...{
      selected: [],
      tags: props.tags,
    }}
  }

  updateTags(tags){
    if(!Array.isArray(tags)){
      tags = [tags];
    }
    this.setState({
      tags: [ ...this.state.tags, ...tags ].filter((tag, i, tags) => {
        return tags.indexOf(tag) === i;
      })
    })
  }

  clickTag(tag){
    let index = this.state.selected.indexOf(tag);
    this.setState({
      selected: (index === -1)? [ tag, ...this.state.selected ] : this.state.selected.filter((tag, i) => {
        return i !== index;
      })
    })
  }

  renderTags(){
    return <Fragment>
      {
        this.state.selected.map((tag, i) => {
          return <Tag key={i} selected={true} update={this.clickTag.bind(this)} tag={tag}/>;
        })
      }
      {
        this.state.tags.filter((tag) => {
          return this.state.selected.indexOf(tag) === -1;
        }).map((tag, i) => {
          return <Tag key={i} selected={false} update={this.clickTag.bind(this)} tag={tag}/>;
        })
      }
    </Fragment>
  }

  getChildren(){
    return Children.toArray(this.props.children);
  }

  renderChildren(){
    let children = this.getChildren();
    if(children === undefined){
      return <span/>;
    }
    return <Fragment>
        {
          children.filter((child) => {
            if(this.state.selected.length === 0){
              return true;
            }
            for(let i = 0; i < child.props.tags.length; i++){
              if(this.state.selected.indexOf(child.props.tags[i]) !== -1){
                return true;
              }
            }
            return false;
          })
        }
    </Fragment>
  }

  render(){
    return <div>
    {
      this.renderTags()
    }
    {
      this.renderChildren()
    }
    </div>
  }
}

TagList.defaultProps = {
  tags: []
}

export default TagList;
