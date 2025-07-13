import React from 'react'
import Header from '../Shared/Header/Header'
import Aside from '../Shared/Aside/Aside';
import AppointmentsContent from '../Pages Content/Appointments Content/AppointmentsContent';
const Appointments = () => {
    return (
        <div className='bg-hover-color'>
            <Header />
            <div className="d-flex">
                <Aside path='/appointments' />
                <AppointmentsContent />
            </div>
        </div>
    )
}

export default Appointments
