import React, { Component } from 'react';

import './contact.css'

class Contact extends Component {

  constructor(props){
    super(props);

    this.state = {
      nameErr: false,
      messageErr: false,
      emailErr: false,
    }
  }

  render(){
    return <div className='Contact'>
      <div className='Header'>Contact</div>
      <hr/>
      <div className='Bottom'>
        <div className='Blurb'>Hi, Thanks for your interst in contacting me</div>
        <div style={{
          display: 'flex',
        }}>
          <div className='Form'>
            <div>
              <div className='Section'>
                <span>Name:</span>
                <input id='Name' style={{
                  width: '100%',
                }} className={(this.state.nameErr)?'Error':''}/>
              </div>
              <div className='Section'>
                <span>Message:</span>
                <textarea id='Message' style={{
                  width: '100%',
                  height: '100px',
                  cursor: 'text',
                  resize: 'none',
                  padding: '6px',
                  borderRadius: '5px',
                  borderColor: 'transparent',
                }} className={(this.state.messageErr)?'Error':''}/>
              </div>
              <div className='Section'>
                <span>Email:</span>
                <input id='Email' style={{
                  width: '100%',
                }} className={(this.state.emailErr)?'Error':''}/>
              </div>
              <button style={{
                float: 'left',
                margin: '0px 0px 10px 20px',
                background: 'transparent',
                padding: '7.5px',
                color: '#666',
                border: '2px solid #666',
                borderRadius: '2px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }} onClick={() => {
                let name = document.getElementById('Name').value;
                let message = document.getElementById('Message').value;
                let email = document.getElementById('Email').value;

                this.setState({
                  nameErr: name === '',
                  messageErr: message === '',
                  emailErr: email === '',
                });
                if(name === '' || message === '' || email === ''){
                  return;
                }

                document.getElementById('Name').value = '';
                document.getElementById('Message').value = '';
                document.getElementById('Email').value = '';

                fetch('/contact', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ name, message, email }),
                })
              }}>Send</button>
            </div>
            </div>
              <div className='Info'>
              <div className='Github'>github.com/jbec1901</div>
              <div className='Email'>jbec1901@pm.me</div>
              <div className='Location'>Minneapolis MN 55412</div>
              <div className='Phone'>(612)-460-1499</div>
            </div>
          </div>
        </div>
    </div>;
  }
}

export default Contact;
