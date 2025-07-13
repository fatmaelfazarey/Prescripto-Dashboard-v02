import React from 'react'
import Header from '../Shared/Header/Header'
import Aside from '../Shared/Aside/Aside';
import PatientsListContent from '../Pages Content/Patients List Content/PatientsListContent';

const PatientsList = () => {
  return (
    <div className='bg-hover-color'>
      <Header />
      <div className="d-flex">
        <Aside path='/patient-list' />
        <PatientsListContent />
      </div>
    </div>
  )
}

export default PatientsList
