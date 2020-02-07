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

    fetch('/home/projects')
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      this.setState({
        projects: json
      });
    });
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
    return <div>
      <div style={{
        height: '650px',
        display: 'flex',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
        }}>
          <Image style={{
            position: 'absolute',
            width: '100%',
          }} src='intro.png' alt=''/>
          <div style={{
            position: 'absolute',
            width: '100%',
            top: '25%',
          }}>
            <Image style={{
              marginLeft: 'calc(42.5% - 15px)',
              width: '15%',
              borderRadius: '50%',
              border: '1em solid #555',
            }} src='photo.png' alt=''/>
            <div style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: '30pt',
              textShadow: '-0.5px 0 black, 0 0.5px black, 0.5px 0 black, 0 -0.5px black',
            }}>Welcome</div>
          </div>
        </div>
      </div>
      <div className='Section'>
        <div className='Header'> Portfolio </div>
        <TagSelector>
          {
            (this.state.projects === undefined)? <div>fetching projects</div>:
            this.state.projects.map((project, i) => {
              return <Project key={i} {...project}/>;
            })
          }
        </TagSelector>
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
      <div className='Section'>
        <div className='Header'> Blog </div>
        <TagSelector>
          {
            (this.state.blog === undefined)? <div>fetching blog posts</div>:
            this.state.blog.map((post, i) => {
              return <BlogPost key={i} {...post}/>;
            })
          }
        </TagSelector>
        <button style={{
          float: 'right',
          margin: '0px 10px 10px 0px',
          background: 'transparent',
          padding: '7.5px',
          color: '#666',
          border: '2px solid #666',
          borderRadius: '2px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }} onClick={() => {

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
