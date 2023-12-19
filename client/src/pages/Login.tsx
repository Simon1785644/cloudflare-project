import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Pages.module.scss';
import TopNav from 'src/components/TopNav';
import { LoginContext, ActionType } from 'src/components/contexts/LoginContext';
import axios from 'axios';
import { errorHandler } from 'src/components/errHandler';

const Login = () => {
    const { t } = useTranslation();
    // Get response.data from Register
    const reqData = useLocation();
    let errMes:string = reqData.state?.errMessage;
    const{loading, error, dispatch} = useContext(LoginContext);
    const [loginData, setLoginData] = useState({
        // Let user can use either username or email to log in
        account:undefined, password: undefined 
    })
    const handleChange = (e:{target:HTMLInputElement}) => {
        setLoginData(prev=>({...prev,[e.target.id]: e.target.value}))
    };
    const navigate = useNavigate();
    const handleClick = async(e:React.FormEvent)=>{
        e.preventDefault();
        dispatch({type:ActionType.START_LOGIN});
        try{
            const response = await axios.post("/auth/signin", loginData)
            dispatch({
                type:ActionType.LOGIN_SUCCESS,
                payload:response.data
            })
            console.log(response);
            navigate("/");
        } catch (error:unknown) {
            const { message: errorMessage } = errorHandler(error);
            dispatch({
                type:ActionType.LOGIN_FAILURE, 
                payload:errorMessage
            });
        }
    }

    return (
        <div className='loginContainer'>
        <TopNav type={"auth"}/>
        <div className={styles.loginHeader}>
            <div className={styles.loginWrapper}>
                <h3  className={styles.title}>{t('LoginTitle')}</h3>
                <div className={styles.form}>
                    <input type="text" id="account" placeholder={t('PH.ACC')}
                     onChange={handleChange}/>
                    <input type="password" id="password" placeholder={t('PH.PW')}
                     onChange={handleChange}/>
                    <button className={styles.submit} onClick={handleClick}>
                        {t('LoginBTN')}
                    </button>
                    <span>{t('ForgotPWTip')}</span>
                    <Link to="/register" className={styles.Link}>
                        <span>{t('RegisterTip')}</span>
                    </Link>
                    {(error || errMes) && <span style={{color:"red"}}>{error || errMes}</span>}
                </div>
            </div>
        </div>
        </div>
    )
}

export default Login