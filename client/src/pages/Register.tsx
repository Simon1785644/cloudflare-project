import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Pages.module.scss';
import TopNav from 'src/components/TopNav';
import { errorHandler } from 'src/components/errHandler';

export const ErrMesI18N = (message:string | number) => {
  const { t } = useTranslation();
  let i18NErr:string = "";

  switch (message) {
      case "This username already used.":
      case "This e-mail address already used.":
        i18NErr = t('Error.RegAlreadyUsed');
        break;
      default:          
        break;
  }

  return i18NErr;
}

/**
 * Handle register process.
 * 
 * Include:
 * User input pw value check: useState + useEffect + onChange
 * 
 * @event changeEvent - Monitoring that user input password
 * @event FormEvent - Handle form submit
 */
const Register = () => {
  // Solution for "React Hook useEffect has a missing dependency: 't'"
  const {t} = useTranslation();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: undefined,
    email: undefined,
    password: undefined
  });
  // Check input password is wrong or already used.
  const [checkPassword, setPassword] = useState({
    checkpassword: undefined
  });
  useEffect(() => {
    if (checkPassword.checkpassword !== registerData.password) {
      setError(t('Error.PWNoMatch'));
    } else {
      setError("")}
  },[checkPassword, registerData, t]);
  const handleCheckPassword = (e:{target:HTMLInputElement}) => {
    setPassword(prev=>({...prev,[e.target.id]: e.target.value}))
  }
  // register process
  const handleChange = (e:{target:HTMLInputElement}) => {
    // e.target.id -> useState.property
    // e.target.value -> useState.property.value
    setRegisterData(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }
  // BTW, React has some interface like 
  // ChangeEvent for onChange, FormEvent for onSubmit etc.
  const handleSubmit = async(e:React.FormEvent) => {
    e.preventDefault(); // prevent event default behavior

    try {
      const { data: response } = await axios.post("/auth/signup", registerData);
      navigate("/login", response);
    } catch (error:unknown) { 
      const { message: errorMessage } = errorHandler(error);
      switch (errorMessage) {
        case "This username already used.":
        case "This e-mail address already used.":
          setError(t('Error.RegAlreadyUsed'));
          break;
        default:          
          break;
      }
    }
  }

  return (
    <div className='registerContainer'>
      <TopNav type={"auth"}/>
      <div className={styles.registerHeader}>
            <div className={styles.registerWrapper}>
                <h3  className={styles.title}>{t('RegisterTitle')}</h3>
                <div className={styles.form}>
                  <input type="text" id="username" placeholder={t('PH.Username')}
                    onChange={handleChange} 
                    style = {error === t('Error.RegAlreadyUsed') ? 
                    {border:"2px solid red"}:{border:"1px solid grey"}}/>
                  <input type="text" id="email" placeholder={t('PH.Email')}
                    onChange={handleChange} 
                    style = {error === t('Error.RegAlreadyUsed') ? 
                    {border:"2px solid red"}:{border:"1px solid grey"}}/>
                  <input type="password" id="password" placeholder={t('PH.PW')}
                    onChange={handleChange} 
                    style = {error === t('Error.PWNoMatch') ? 
                    {border:"2px solid red"}:{border:"1px solid grey"}}/>
                  <input type="password" id="checkpassword" placeholder={t('PH.PWConfirm')}
                    onChange={handleCheckPassword} 
                    style = {error === t('Error.PWNoMatch') ? 
                    {border:"2px solid red"}:{border:"1px solid grey"}}/>
                  <button className={styles.submit} onClick={handleSubmit}>
                      {t('RegisterBTN')}
                  </button>
                  <span>{t('AlreadyHaveAccTip')}</span>
                  <Link to="/login" className={styles.Link}>
                      <span>{t('LogIn')}</span>
                  </Link>
                  {error && <span style={{color:"red"}}>{error}</span>}
                </div>
            </div>
      </div>
    </div>
  )
}

export default Register