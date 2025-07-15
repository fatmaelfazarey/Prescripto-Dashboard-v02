import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import './DoctorContent.css';
import { assets } from '../../assets/assets';
import PageTitle from '../../Components/PageTitle';
import AppointmentsComponents from '../../Components/AppointmentsComponents';

const DoctorContent = () => {
    const { doctorId, patientId } = useParams();
    const { currencySymbol, doctors, patients } = useContext(AppContext);
    const [profileData, setProfileData] = useState(null);
    const [isImageLoaded, setImageLoaded] = useState(false);
    const [appointmentLength, setAppointmentLength] = useState(0);

    // const handleAppointmentLength = (value) => {
    //     setAppointmentLength(value);
    // }
    const handleAppointmentLength = React.useCallback((length) => {
        setAppointmentLength(length);
    }, []);
    useEffect(() => {
        const getProfileData = () => {
            if (doctorId && doctors?.length > 0) {
                const doctor = doctors.find(doc => doc.id === doctorId);
                setProfileData(doctor);
            } else if (patientId && patients?.length > 0) {
                const patient = patients.find(patient => patient.id === patientId);
                setProfileData(patient);
            }
        };

        getProfileData();
    }, [doctorId, doctors, patientId, patients]);

    if (!profileData) {
        return <div>Loading...</div>;
    }

    const renderDoctorDetails = () => (
        <p style={styles.detail}>
            {profileData.degree} - {profileData.speciality}
            <span style={styles.experienceBadge}>
                {profileData.experience}
            </span>
        </p>
    );

    const renderPatientDetails = () => (
        <>
            <p style={styles.detail}>{profileData.email}</p>
            <p style={styles.detail}>{profileData.phone}</p>
            <p>{profileData.Gender}</p>
            <p>{profileData.age} Years</p>
            <p>{profileData.Birthday}</p>
        </>
    );

    return (
        <div className='container'>
            <div className='d-flex gap-4 p-4 flex-lg-row flex-column Dcontent'>
                <div className='col-8 col-lg-4'>
                    {!isImageLoaded && (
                        <div style={styles.imagePlaceholder}>
                            <div style={styles.loadingOverlay}>
                                <span>Loading...</span>
                            </div>
                        </div>
                    )}
                    <img
                        src={profileData.image || assets.default_patient_image}
                        alt={profileData.name || ''}
                        style={{
                            ...styles.image,
                            visibility: isImageLoaded ? 'visible' : 'hidden',
                        }}
                        onLoad={() => setImageLoaded(true)}
                        onError={(e) => (e.target.src = assets.default_patient_image)}
                    />
                </div>
                <div className='p-3 p-lg-4 col-12 col-lg-8 info' style={styles.infoContainer}>
                    <h2 style={styles.name}>{profileData.name}</h2>
                    {doctorId ? renderDoctorDetails() : renderPatientDetails()}
                    <span style={styles.sectionTitle}><u>About</u></span>
                    <p style={styles.about}>
                        {profileData.about || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque a soluta excepturi similique fuga recusandae delectus facere quisquam obcaecati tempore sapiente, debitis deleniti est, molestiae perspiciatis sint! Quis, soluta asperiores.'}
                    </p>
                    {doctorId && (
                        <p style={styles.detail}>
                            Appointment fee: <span style={styles.fee}>{profileData.fees || 'fees'}{currencySymbol}</span>
                        </p>
                    )}
                    <span style={styles.sectionTitle}><u>Address</u></span>
                    {profileData.address && (
                        <>
                            <p style={styles.address}>{profileData.address.line1}</p>
                            <p style={styles.address}>{profileData.address.line2}</p>
                            <p style={styles.address}>{profileData.address.line3}</p>
                        </>
                    )}
                </div>
            </div>
            <div>
                <div className="d-flex p-4 justify-content-between">
                    <PageTitle title='History' />
                    <p>{appointmentLength} appointments</p>

                </div>
                <div>
                    <AppointmentsComponents day='Day' payment='Payment' doctorId={doctorId} patientId={patientId} onValueChange={handleAppointmentLength} />
                </div>
            </div>


        </div>

    );
};

const styles = {
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        minHeight: '300px',
        position: 'relative',
    },
    loadingOverlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--main-color)',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '30px',
    },
    image: {
        width: '100%',
        transition: 'visibility 0.3s ease',
        backgroundColor: 'var(--main-color)',
        borderRadius: '30px',
    },
    infoContainer: {
        border: '1px solid var(--text-color)',
        borderRadius: '30px',
        backgroundColor: 'var(--bg-white)',
    },
    name: {
        fontWeight: '500',
        fontSize: '2.25rem',
    },
    detail: {
        fontWeight: '400',
        fontSize: '1.25rem',
        color: 'var(--text-color)',
        marginBottom: '.5rem !important',
    },
    experienceBadge: {
        fontSize: '.75rem',
        fontWeight: '400',
        border: '1px solid var(--text-color)',
        borderRadius: '30px',
        height: 'fit-content',
        color: 'var(--text-color)',
        padding: '.25rem .5rem',
        marginLeft: '.5rem',
    },
    sectionTitle: {
        fontSize: '1rem',
    },
    about: {
        fontSize: '1rem',
        fontWeight: '400',
        color: 'var(--text-color)',
        lineHeight: '26px',
    },
    fee: {
        fontWeight: '500',
        fontSize: '1.25rem',
    },
    address: {
        fontSize: '1rem',
        fontWeight: '400',
        color: 'var(--text-color)',
        lineHeight: '26px',
    },
};

export default DoctorContent;