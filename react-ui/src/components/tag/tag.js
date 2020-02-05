import React, { Component } from 'react';

import './tag.css'

class Tag extends Component {
  render(){
    return <div className={ 'Tag ' + ((this.props.selector.state.selected.indexOf(this.props.tag) === -1)? '' : 'Selected') } onClick={()=>{
      this.props.selector.updateTag.bind(this.props.selector)(this.props.tag);
    }}>
      { this.props.tag }
    </div>
  }
}

export default Tag;
