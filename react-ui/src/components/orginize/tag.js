import React, { Component } from 'react';

import './tag.css'

class Tag extends Component {
  render(){
    return <div className={ 'Tag ' + ((this.props.selected)? '' : 'Selected') } onClick={()=>{
      this.props.update(this.props.tag);
    }}>
      { this.props.tag }
    </div>
  }
}

export default Tag;
