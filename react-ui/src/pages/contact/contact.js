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
        <div className='Form'>
          <div>
            <span className='Name'>Name: </span><input id='Name' className={`Name ${(this.state.nameErr)?'Error':''}`}/><br/>
            <span className='Message'>Message: </span><textarea id='Message' className={`Message ${(this.state.messageErr)?'Error':''}`}/><br/>
            <span className='Email'>Email: </span><input id='Email' className={`Email ${(this.state.emailErr)?'Error':''}`}/><br/>
            <button onClick={() => {
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
    </div>;
  }
}

export default Contact;
