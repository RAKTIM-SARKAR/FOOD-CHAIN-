import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt=''/>
                <p>Join us at FOOD CHAIN for a mouthwatering adventure in every bite. Need assistance? Contact Us or connect with us on Social Media for more updates and offers.</p>
                <div className="footer-social-icons">
                    <a href='https://www.instagram.com/foodchain775' target='_blank' rel='noopener noreferrer'>
                        <img src={assets.instagram_icon} alt='Instagram' />
                    </a>
                    <a href='https://youtube.com/@foodchain-k9e?si=d1Cf1dls7Ryn2yNT' target='_blank' rel='noopener noreferrer'>
                        <img src={assets.youtube_icon} alt='YouTube' />
                    </a>
                    <a href='https://wa.me/918472871206' target='_blank' rel='noopener noreferrer'>
                        <img src={assets.whatsapp_icon} alt='WhatsApp' />
                    </a>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Food Chain</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Explore Menu</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 8472871206</li>
                    <li>foodchain@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className="footer-copyright">Copyright 2024 ©FoodChain - All Rights Reserved.</p>
    </div>
  )
}

export default Footer
