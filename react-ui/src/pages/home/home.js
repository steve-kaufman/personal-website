import React, { Component } from 'react';

import './home.css';

import TagSelector from './../../components/tag/tagSelector'

import Project from './../../components/project/project';
import BlogPost from './../../components/blog/blogPost';

import Image from 'mini-image-react';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      projects: undefined,
      skills: undefined,
      blog: undefined,
      blogEnd: undefined
    };

    fetch('/projects')
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      this.setState({
        projects: json
      });
    });

    fetch('/skills')
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      this.setState({
        skills: json
      });
    });

    fetch('/blog/new')
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      this.setState({
        blog: json.posts,
        blogEnd: json.end
      });
    });
  }
  render(){
    return <div>
      <div className='Intro'>
        <div className='Container'>
          <Image className='Background' src='intro.png' alt=''/>
          <div className='Container2'>
            <div className='Center'>
              <Image className='Photo' src='photo.png' alt=''/>
              <div className='PhotoText'>Welcome</div>
            </div>
          </div>
        </div>
      </div>
      <div className='Portfolio'>
        <div className='Header'>
          Portfolio
        </div>
        <TagSelector>
          {
            (this.state.projects === undefined)? <div>fetching projects</div>:
            this.state.projects.map((project, i) => {
              return <Project key={i} {...project}/>;
            })
          }
        </TagSelector>
        <div className='Projects'>
        </div>
      </div>
      <div className='Skills'>
        <div className='Header'>
          Skills
        </div>
        <div className='SkillList'>
          {
            (!this.state.skills)? <div>fetching skills</div>:
            this.state.skills.map((skill, key) => {
              return <div key={key}>{skill.skill} - {Math.round((Date.now() - skill.start) / 15778800000)/2} years</div>;
            })
          }
        </div>
      </div>
      <div className='Blog'>
        <div className='Header'>
          Blog
        </div>
        <TagSelector>
          {
            (this.state.blog === undefined)? <div>fetching blog posts</div>:
            this.state.blog.map((post, i) => {
              return <BlogPost key={i} {...post}/>;
            })
          }
        </TagSelector>
        <button className='MoreButton' onClick={() => {

          fetch(`/blog/new?count=5&start=${this.state.blogEnd}`)
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            this.setState({
              blog: [ ...this.state.blog, ...json.posts ],
              blogEnd: json.end
            });
          });
        }}>More Posts</button>
      </div>
    </div>;
  }
}

export default Home;
