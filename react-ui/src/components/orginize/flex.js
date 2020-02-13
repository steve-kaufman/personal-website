import React, { Component, Children } from 'react';

import './flex.css';

class Flex extends Component {
  render(){
    let children = Children.toArray(this.props.children);
    return <div className='Flex_Base'>
      {
        Array.apply(null, Array(this.props.columns)).map((n, i) => {
          return <div key={i} className='Sub_Flex'>
            {
              (() => {
                let elements = [];
                for(let j = i; j < children.length; j += this.props.columns){
                  elements.push(children[j]);
                }
                return elements;
              })()
            }
          </div>
        })
      }
    </div>
  }
}

Flex.defaultProps = {
  columns: 2
}

export default Flex;
