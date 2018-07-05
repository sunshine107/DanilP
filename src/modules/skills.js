import React, { Component } from 'react';

const Skill = (props) =>{
    return(
        <div>
        {
            props.skill.map(i => {
                return(  
                    <div key={i.name}>
                        <div className="bar flex">
                            <div className="bar fill" style={{ width:i.level}}>
                                <div className="tag bold flex">{i.name}</div>
                            </div>
                            <span>{i.level}</span>
                        </div>
                    </div>
                )
            })
        }
        </div>
    );
}

class Skills extends Component {
    render() {
        return (
            <Skill skill={this.props.skill}/>
        );
    }
  }
export default Skills;