import React from 'react'
import { Navigate } from 'react-router-dom';

const Private = (pages) => {
    const isLogin = localStorage.getItem('login');
    return isLogin ? pages : <Navigate to='/login' replace />
}

export default Private
