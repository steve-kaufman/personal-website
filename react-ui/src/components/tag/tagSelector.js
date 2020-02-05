import React, { Component } from 'react';

import Tag from './tag';
import './tagSelector.css'

class TagSelector extends Component {

  static getDerivedStateFromProps(props, state){
    let tags = [ ...state.selected, ...state.unselected ];

    let newTags = [React.Children.toArray(props.children).map((child) => {
      return child.props.tags;
    })].flat(2).filter((tag, i, tags) => {
      return tags.indexOf(tag) === i;
    }).filter((tag) => {
      return tags.indexOf(tag) === -1;
    }).filter((tag) => {
      return tag !== undefined;
    });

    if(newTags.length !== 0){
      return {
        unselected: [ ...state.unselected, ...newTags ]
      };
    }
    return null;
  }


  constructor(props){
    super(props);
    this.state = {
      selected: [],
      unselected: []
    }
  }

  updateTag(tag){
    let i = this.state.selected.indexOf(tag);
    if(i !== -1){
      return this.setState({
        selected: this.state.selected.filter((t, j) => {
          return i !== j;
        }),
        unselected: [tag, ...this.state.unselected]
      });
    }
    i = this.state.unselected.indexOf(tag);
    this.setState({
      selected: [tag, ...this.state.selected],
      unselected: this.state.unselected.filter((t, j) => {
        return i !== j;
      })
    });
  }

  render(){
    return <div className='TagSelector'>
      <div className='Tags'>
        {
          this.state.selected.map((tag, key) => {
            return <Tag key={key} tag={tag} selector={this}/>
          })
        }
        {
          this.state.unselected.map((tag, key) => {
            return <Tag key={key} tag={tag} selector={this}/>
          })
        }
      </div>
      <div className='Elements'>
        {
          ((this.state.selected.length === 0)? React.Children.toArray(this.props.children):
          React.Children.toArray(this.props.children).filter((child) => {
            for(let i = 0; i < this.state.selected.length; i++){
              if(child.props.tags.indexOf(this.state.selected[i]) !== -1){
                return true;
              }
            }
            return false;
          })).map((element, key) => {
            return React.cloneElement(element, { selector: this });
          })
        }
      </div>
    </div>;
  }
}

export default TagSelector;
