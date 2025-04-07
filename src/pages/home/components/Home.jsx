import React from 'react'
import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa'

import './Home.css'

class Home extends React.Component {
  render () {
    return (
      <div className="home-container">
        <div className="home-card">
          <h1 className="home-title">Algorithm Visualizer</h1>
          <p className="home-subtitle">Choose what you’d like to explore.</p>

          <div className="home-buttons">
            <Link to="/pathfinding" className="home-button purple">
              🔍 Pathfinding Visualizer
            </Link>
            <Link to="/sorting" className="home-button blue">
              📊 Sorting Visualizer
            </Link>
          </div>

          <div className="home-socials">
            <a href="https://github.com/truongluan303/visual-algo" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a href="https://truongluan303.github.io/HoangTruong.github.io" target="_blank" rel="noreferrer">
              <FaGlobe />
            </a>
            <a href="https://www.linkedin.com/in/hoangphucluantruong0812" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
