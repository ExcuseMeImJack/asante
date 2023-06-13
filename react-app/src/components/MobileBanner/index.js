import React from 'react';
import asanteIcon from '../../assets/asante-icon.png';
import './MobileBanner.css'

export default function MobileBanner() {
  return (
    <div className='mobile-banner-container'>
    {/* <div className='mobile-banner-container' style={{backgroundImage: `url(${asanteIcon})`, backgroundSize: "70%", backgroundRepeat: "no-repeat"}}> */}
        <div className='mobile-banner'>Asante was developed to be used as a desktop application</div>
        <img className='mobile-img' src={asanteIcon} alt="asante-icon" />
    </div>
  )
}
