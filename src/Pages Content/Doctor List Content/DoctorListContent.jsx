import React, { useEffect, useState, useContext } from 'react'
import DoctorCard from '../../Components/Doctor Card/DoctorCard'
import PageTitle from '../../Components/PageTitle'
import './DoctorListContent.css'
import Filter from '../../Components/Filter'
import { AppContext } from '../../Context/AppContext'
import { assets } from '../../assets/assets'

const DoctorListContent = () => {
    const [speciality, setSpeciality] = useState('all');
    const { doctors } = useContext(AppContext);
    const { isLoaded } = useContext(AppContext);
    const { error } = useContext(AppContext);
    //#region try
    // console.log(doctors);
    // setDoctorsG(items);
    // setErrorG(error);
    // setIsLoadedG(isLoaded);
    // console.log(error);
    // function callDoctorsServer() {
    //     fetch("http://localhost:3001/doctors")
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 setIsLoaded(true);
    //                 // setIsLoadedG(isLoaded);
    //                 setItems(result);
    //                 // setDoctorsG(items)

    //             },
    //             (error) => {
    //                 setIsLoaded(true);
    //                 setError(error);
    //                 // setErrorG(error)
    //             }
    //         )
    // }
    // useEffect(() => {
    //     callDoctorsServer();
    // }, []);
    //#endregion

    const handleSpecialityFilter = (filter) => {
        setSpeciality(filter);
    }

    return (
        <div className='d-flex flex-column p-4 gap-3 w-100 content'>
            <div className="d-flex align-items-center justify-content-between">
                <PageTitle title='All Doctors' />
                <Filter onValueChange={handleSpecialityFilter} type='speciality' />
            </div>
            <div className='d-flex flex-wrap gap-4'>
                {
                    error ? <p>Error: {error.message}</p>
                        : !isLoaded ? <p>Loading...</p>
                            : <>
                                {doctors.map((ele, index) => (
                                    speciality === 'all' ?
                                        <DoctorCard 
                                        key={index} 
                                        img={ele.image || assets.default_patient_image} 
                                        name={ele.name} 
                                        id={ele.id} 
                                        speciality={ele.speciality} 
                                        className='flex-fill' />
                                        :
                                        ele.speciality === speciality ?
                                            <DoctorCard 
                                            key={index} 
                                            img={ele.image || assets.default_patient_image} 
                                            name={ele.name} 
                                            id={ele.id} 
                                            speciality={ele.speciality} 
                                            className='flex-fill' />
                                            : ''
                                )
                                )}
                            </>
                }
            </div>
        </div>
    )
}

export default DoctorListContent
