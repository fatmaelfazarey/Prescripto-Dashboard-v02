import React from 'react'
import Header from '../Shared/Header/Header'
import Aside from '../Shared/Aside/Aside';
import DoctorListContent from '../Pages Content/Doctor List Content/DoctorListContent';
const DoctorsList = () => {
    return (
        <div className='bg-hover-color'>
            <Header />
            <div className="d-flex">
                <Aside path='/doctors-list' />
                <DoctorListContent />
            </div>
        </div>
    )
}

export default DoctorsList
