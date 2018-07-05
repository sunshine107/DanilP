import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Who from './modules/who';
import Skills from './modules/skills';
import Overview from './modules/overview';
import registerServiceWorker from './registerServiceWorker';


const userinfo ={
    name: "Danil Pashkov",
    comment: "I am a Senior Front-End, Back-End Developer."
}

const whoamI = {
    title: "I am senior backend, frontend developer.",
    comment: "I have serious passion for UI effects, animations and creating intuitive, dynamic user experiences."
}

const skilldetail = [
    {
        name:"React.js",
        level:"80%"
    }, 
    {
        name:"Angular",
        level:"75%"
    }, 
    {
        name:"Laravel",
        level:"82%"
    }, 
    {
        name:"Node.js",
        level:"70%"
    }, 
    {
        name:"MongoDB",
        level:"73%"
    }, 
    {
        name:"Javascript",
        level:"87%"
    }, 
    {
        name:"PHP",
        level:"84%"
    }, 
    {
        name:"WordPress",
        level:"79%"
    }, 
    {
        name:"Bootstrap",
        level:"80%"
    }, 
    {
        name:"CSS3",
        level:"81%"
    }, 
    {
        name:"HTML5",
        level:"87%"
    }, 
];

const overview= "I am a Senior Web Developer with over 6 years of experience in web development. I am capable of providing you the right choice of Technology Stack and their combination that your business needs. It’s an incredibly challenging task to find a really excellent developer as the technology advances and it is improving, so if you are in search of a candidate with an awesome experience you are on the right place no need to go further to see other options. I am capable of providing you the right choice of Technology Stack and their combination that your business needs. I am an enthusiastic Person interested to do things involved Research and Development to bring your ideas to life. And I will be looking forward to working with you on your projects regardless of the technologies involved. I believe that we should never stop learning!";
const graduatedetail = [
    {
        name:"Vitebski Dzjaržauny Universitet imja P.M. Mašerova",
        from:"2010",
        to:"2015",
        degree:"Master of Education (M.Ed.)"
    }

];

ReactDOM.render(<App name={userinfo.name} comment={userinfo.comment}/>, document.getElementById('special'));
ReactDOM.render(<Who title={whoamI.title} comment={whoamI.comment}/>, document.getElementById('who_am_i'));
ReactDOM.render(<Skills skill={skilldetail}/>, document.getElementById('skills'));
ReactDOM.render(<Overview overview={overview} graduate={graduatedetail}/>, document.getElementById('overview'));
registerServiceWorker();
