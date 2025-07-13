import React, { useContext } from 'react'
import { AppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets';

const TopStatistic = () => {
    const { AppointmentsLength, patientsLength, DoctorsLength } = useContext(AppContext);


    return (
        <div className={`d-flex gap-3 flex-xxl-column flex-row`} style={{ height: "fit-content" }}>
            <div className={`d-flex flex-row align-items-center justify-content-center p-4 gap-1 w-100`}
                style={{ backgroundColor: "var(--bg-white)", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "12px", }}>
                <img src={assets.doctor_icon} width='90' />
                <div className={`d-flex flex-column align-items-center `}>
                    <span className='fs-3 fw-medium'>{DoctorsLength || 0}</span>
                    <span className='fs-6 fw-light'>Doctors</span>
                </div>
            </div>
            <div className={`d-flex flex-row align-items-center justify-content-center p-4 gap-1 w-100`}
                style={{ backgroundColor: "var(--bg-white)", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "12px", }}>
                <img src={assets.doctor_icon} width='90' />
                <div className={`d-flex flex-column align-items-center `}>
                    <span className='fs-3 fw-medium'>{patientsLength || 0}</span>
                    <span className='fs-6 fw-light'>Patients</span>
                </div>
            </div>
            <div className={`d-flex flex-row align-items-center justify-content-center p-4 gap-1 w-100`}
                style={{ backgroundColor: "var(--bg-white)", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "12px", }}>
                <img src={assets.doctor_icon} width='90' />
                <div className={`d-flex flex-column align-items-center `}>
                    <span className='fs-3 fw-medium'>{AppointmentsLength || 0}</span>
                    <span className='fs-6 fw-light'>Appointments</span>
                </div>
            </div>


        </div>
    )
}

export default TopStatistic
