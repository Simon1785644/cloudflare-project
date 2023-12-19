import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './TopNav.scss';
import Locales from './subcomponents/dropdown/Locales';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } 
from '@fortawesome/free-solid-svg-icons';
import { LoginContext, ActionType } from './contexts/LoginContext';
import InputSection from './InputSection';

interface rule {
  type?:string;
};

const TopNav = ({type}:rule) => {
  const { t } = useTranslation();
  const { user, dispatch } = useContext(LoginContext);
  // Make sure data clean when user log out
  const handleLogOut = (e:React.FormEvent) => {
    localStorage.removeItem('cartItems');
    dispatch({ type: ActionType.LOGIN_OUT })
  }

  return (
    <div className='topNavContainer'>
      <div className={`topNav ${type}`}>
        <div className='topNavLeft'>
          <Link to='/'>
            <span className='logo'>
              <img src='/images/EmeraldGardenBanner.png' alt='logo'/>
              Emerald Garden
            </span>
          </Link>
          <div className='topSearchBar'>
              <InputSection/>            
          </div>
        </div>
        <div className='topNavRight'>
          <Locales />
          {type==="auth" ? <></> :
            <>
              {user ? 
                <>
                  <span className='username'>{user.split(" ", 1)}</span>
                  <button className="navButton" onClick={handleLogOut}>{t('LogOut')}</button>
                </>
                : <>
                  <Link to="/login">
                    <button className="navButton">{t('LogIn')}</button>
                  </Link>  
                  <Link to="/register">
                    <button className="navButton">{t('Register')}</button>
                  </Link>
                </>
               }
            </>
          }
          <button className='checkOutBTN'>
            <FontAwesomeIcon icon={faCartShopping} />{t('CheckOut')}
          </button>
        </div>
      </div>
      <div className='topTab'>
        <button  className='topTabItem'>{t('HotProducts')}</button>
        <button  className='topTabItem2'>{t('OnSaleProducts')}</button>
      </div>
    </div>

  )
}

export default TopNav