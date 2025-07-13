import React, { useContext } from 'react'
import { assets } from '../../assets/assets';
import './Header.css';
// import { AppContext } from '../../Context/AppContext';

const Header = () => {
    // const { t } = useContext(AppContext);
    return (
        <div className='border-bottom w-100 bg-white-color p-3 d-flex justify-content-between align-items-end'>
            <div className='d-flex align-items-end'>
                <img src={assets.logo} alt='logo' width='200' />
                <span className='px-2' style={{ fontSize: '.75rem', fontWeight: '400', border: '1px solid var(--text-color)', borderRadius: '30px', height: 'fit-content', color: 'var( --text-color)', paddingTop: '1px', paddingBottom: '1px' }}>Admin</span>
            </div>
            <a href='/login'>
                <button className='btn pt-2 pb-2 px-4' style={{ backgroundColor: "var(--main-color)", color: "white", borderRadius: "30px" }}>Logout</button>
            </a>
        </div>
    )
}

export default Header
