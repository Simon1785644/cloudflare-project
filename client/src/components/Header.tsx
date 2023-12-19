import React, { useState } from 'react'
import './Header.scss'
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Header = () => {
  const { t } = useTranslation();
  const [sliderIndex, setSiderIndex] = useState(0);
  const slideDirection = (direction:string) => {
    let newSliderIndex;
    let lastPicutre = dummyData.length - 1
    if (direction === "left") {
      sliderIndex === 0 ? newSliderIndex = lastPicutre  : newSliderIndex = sliderIndex - 1
      setSiderIndex(newSliderIndex) 
    } else {
      sliderIndex === lastPicutre  ? newSliderIndex = 0 : newSliderIndex = sliderIndex + 1
      setSiderIndex(newSliderIndex)
    }
  }
  const dummyData = [
    { src:'/images/11066456_4650509.jpg',
      artitle:'Books Autumn Sales 2023',
      desc:'2023/09/04 - 2023/11/30'
    }
  ];

  return (
    <div className='headerContainer'>
      <div className="slider">
        <div className="sliderWrapper">
          <div className="wrapperBody">
            <FontAwesomeIcon icon={faAngleLeft} className="arrow"
            onClick={()=>slideDirection('left')}/>
              <img src={dummyData[sliderIndex].src} alt="Event" className='headerImg'/>
              <span>
              <h2>{dummyData[sliderIndex].artitle}</h2>
              <p>{dummyData[sliderIndex].desc}</p>
              <Link to='/event' className='EventBTN'>
                {t('SeeMore')}
              </Link>
              </span>
            <FontAwesomeIcon icon={faAngleRight} className="arrow"
            onClick={()=>slideDirection('right')}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header