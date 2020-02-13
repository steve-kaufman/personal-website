import React, { Component } from 'react';

import './home.css';

import TagSelector from './../../components/tag/tagSelector';
import Projects from './projects';

import Image from 'mini-image-react';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      skills: undefined,
      blog: undefined,
      blogEnd: undefined
    };

    fetch('/home/skills')
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      this.setState({
        skills: json
      });
    });

    fetch('/blog/list?count=3')
    .then((res) => {
      return res.json();
    })
    .then((list) => {
      return Promise.all(list.map((post) => {
        return new Promise(function(resolve, reject) {
          fetch(`/blog/post?post=${post.post}`)
          .then((res) => {
            return res.json();
          })
          .then(resolve)
          .catch(reject)
        });
      }))
      .then((posts) => {
        this.setState({
          blog: posts,
          blogEnd: Math.min(list.map((post) => {
            return post.time;
          }))
        });
      })
    });
  }

  render(){
    return <div className='Body'>
      <div className='Header_Section'>
        <div className='Container'>
          <Image className='Background_Image' src='intro.png' alt=''/>
          <div className='Header_Body'>
            <div className='Photo_Border'>
              <Image className='Photo' src='photo.png' alt=''/>
            </div>
            <h1 className='Header_Text'>Welcome</h1>
          </div>
        </div>
      </div>
      <div className='Section'>
        <div className='Header'> Portfolio </div>
        <Projects/>
      </div>
      <div className='Section'>
        <div className='Header'> Skills </div>
        <div className='SkillList'>
          {
            (!this.state.skills)? <div>fetching skills</div>:
            this.state.skills.map((skill, key) => {
              return <div key={key}>{skill.skill} - {Math.round((Date.now() - skill.start) / 15778800000)/2} years</div>;
            })
          }
        </div>
      </div>
    </div>;
  }
}

export default Home;
