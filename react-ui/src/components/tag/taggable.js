import React, { Component } from 'react';

import Tag from './tag';

class Taggable extends Component {
  render(){
    return <div>
      {
        (this.props.selector)?
        this.props.tags.map((tag, i) => {
          return <Tag key={i} tag={tag} selector={this.props.selector}/>;
        }):undefined
      }
    </div>;
  }
}

export default Taggable;
