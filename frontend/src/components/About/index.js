import React from 'react';
import './About.css';

const About = () => {

    return (
        <div className='about-page-container'>
            <div className='about-description'>
                <h2>
                    Welcome to AirBallnBrick!
                </h2>
                <h4>
                    This project is a clone of AirBnB that was inspired by the game of basketball.
                    Here you can view a variety of court listings ranging anywhere from official NBA arenas to courts on a boat!
                    Basketball can be played everywhere and this website gives its users an interface
                    to explore the abundant amount of courts the world has to offer. Explore and find your perfect court today!
                </h4>
                <h4>
                    The website was created by Jonathan Kim,
                    using a React / Redux frontend, and NodeJS / Express backend.
                </h4>
                <h4>
                    Thank you for visiting my site!
                </h4>
            </div>
            <div className='about-image-container'>
                <img className='about-image' src='https://airballnbrick.s3.amazonaws.com/Portfolio-photo-option-1.jpg' />
                <div className='about-me'>
                    <span>Jonathan Kim</span>
                    <span>Kim.Jonathan426@gmail.com</span>
                </div>
            </div>
            <div className='about-tech-container'>
                <h4>React</h4>
                <h4>Redux</h4>
                <h4>NodeJS</h4>
                <h4>Express</h4>
                <h4>PostgreSQL</h4>
            </div>
            <div className='links'>
                <div className='linked-in'>
                    <a href="https://www.linkedin.com/in/kimjonathan426" target='_blank'>
                        <img className='linked-in-link' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png" />
                    </a>
                </div>
                <div className='github-repo'>
                    <a href="https://github.com/KimJonathan426/AirBall-n-Brick" target='_blank'>
                        <img className='github-link' src="https://cdn-icons-png.flaticon.com/512/25/25231.png" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default About;
