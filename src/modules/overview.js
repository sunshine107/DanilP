import React, { Component } from 'react';

const Collage = (props) =>{
    return(
        <div>
        {
            props.graduate.map(i => {
                return(
                    <div key={i.name}>
                        <span>{i.name}({i.from}~{i.to})<br/></span>
                        <span>degree:{i.degree}</span><br/><br/>
                    </div>
                )
            })
        }
        </div>
    );
}
class Overview extends Component {
    render() {
        return (
            <div>
                <div className="overview waypoint" data-animation="slide-in-left"  >
                <div className="profile">Overview</div><br/><br/>
                    {this.props.overview}
                </div>
                <div className="graduate waypoint"  data-animation="slide-in-right">
                    <div className="profile">Graduate</div><br/><br/>
                    <Collage graduate={this.props.graduate}/>
                </div>
                
            </div>
            
        );
    }
  }
export default Overview;