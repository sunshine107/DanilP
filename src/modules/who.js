import React, { Component } from 'react';

class Who extends Component {
    render() {
        return (
          <div className="who_am_i">
            <img alt="this is me" src="img/me.png" className="mee"/>
            <div className="label bold">Who's this guy?</div>
            <div>
              <span>{this.props.title}</span><br/>
              <span>{this.props.comment}</span><br/>
              <span className="page-link highlight" dest="contact">Let's make something special.</span>
            </div>
        </div>
        );
    }
  }
export default Who;