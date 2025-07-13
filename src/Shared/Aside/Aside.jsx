import React, { useContext, useEffect } from 'react'
import './Aside.css'
import { NavBar } from '../../assets/assets';
import { assets } from '../../assets/assets';
import { AppContext } from '../../Context/AppContext';

// import i18n from "i18next";

const Aside = (props) => {
    // const { setLanguage } = useContext(AppContext);
    // const { language } = useContext(AppContext);
    // const { t } = useContext(AppContext);

    // const handleChangeLanguage = (language) => {
    //     console.log(language);
    //     i18n.changeLanguage(language);
    //     window.document.dir = i18n.dir();
    //     // .then(() => {
    //     //     console.log("Language changed to:", language);
    //     // })
    //     // .catch((err) => {
    //     //     console.error("Error changing language:", err);
    //     // });
    //     setLanguage(language); // Update context if needed
    // };

    return (
        <div className='bg-white-color d-flex flex-column justify-content-between pb-2' style={{ height: 'calc( 100vh - 75px)', width: "fit-content" }}>
            <ul className='w-100'>
                {/* <li style={{ width: '100%', height: '56px' }} key='start'></li> */}
                {
                    NavBar.map((link, index) => (
                        props.path === link.path ?
                            <li key={link.path} style={{ paddingLeft: '1rem', paddingRight: '2.5rem' }} className='d-flex align-items-center justify-content-lg-start justify-content-center gap-2 pt-3 pb-3 w-100  activePage'>
                                <a href={link.path} style={{ color: 'var(--aside-text)' }} className='d-flex align-items-center gap-2'><img src={link.icon} alt='' width='23' height='23' /><span className='d-none d-lg-block'>{link.text}</span></a>
                            </li>
                            :
                            <li key={link.path} style={{ paddingLeft: '1rem', paddingRight: '2.5rem' }} className='d-flex align-items-center justify-content-lg-start justify-content-center gap-2 pt-3 pb-3 w-100 hoverPage'>
                                <a href={link.path} style={{ color: 'var(--aside-text)' }} className='d-flex align-items-center gap-2'><img src={link.icon} alt='' width='23' height='23' /><span className='d-none d-lg-block'>{link.text}</span></a>
                            </li>
                    )
                    )}
                <li style={{ width: '100%', height: '56px' }} ></li>
            </ul>
            {/* <ul>
                <li className='d-flex justify-content-center  gap-2 pt-2 pb-2 w-100 px-4 StingLi' onClick={() => { language === 'ar' ? handleChangeLanguage('en') : handleChangeLanguage('ar') }}>
                    <img src={assets.language_icon} alt='change Kanguage' width='23' height='23' className=' d-block d-lg-none ' />
                 
                    <span className='sting d-none d-lg-block'>{t('العربيه')}</span>
                </li>
                <li className='d-flex justify-content-center  gap-2 pt-2 pb-2 w-100 px-4 StingLi '>
                    <img src={assets.mode_icom} alt='change mode' width='23' height='23' className=' d-block d-lg-none ' />
                    <span className='sting d-none d-lg-block' >{t('Dark Mode')}</span>
                </li>
            </ul> */}
        </div>
    )
}

export default Aside
