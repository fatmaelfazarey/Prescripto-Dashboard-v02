import React from 'react'
import Header from '../Shared/Header/Header'
import Aside from '../Shared/Aside/Aside';
import AddDoctorContent from '../Pages Content/Add Doctor Content/AddDoctorContent';
const AddDoctor = () => {
    return (
        <div className='bg-hover-color'>
            <Header />
            {/* <Content /> */}
            <div className="d-flex">
                <Aside path='/add-doctor' />
                <AddDoctorContent />
            </div>

        </div>
    )
}

export default AddDoctor
