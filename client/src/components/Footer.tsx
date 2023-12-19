import React from 'react'
import  './Footer.scss'

const Footer = () => {
  return (
    <div className='footerContainer'>
        <p>Copyright © 2023 Author. All rights reserved.</p><br/>
        <a href="https://notbyai.fyi" style={{alignItems:'center'}}>
            <img src="images/Written-By-Human-Not-By-AI-Badge-white.svg" alt="written by human, not by AI"/>
        </a>
    </div>
  )
}

export default Footer