import React, { useState, useContext } from 'react';
import PageTitle from '../../Components/PageTitle';
import { AppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets';
import './PatientsListContent.css';
import { useNavigate } from 'react-router-dom';

const PatientsListContent = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [research, setResearch] = useState('');
    const navigate = useNavigate();
    const { PatientError, PatientsIsLoaded, patients } = useContext(AppContext);

    // Filter patients based on search input
    const filteredPatients = patients.filter((p) => p.name.match(new RegExp(`^${research}`, 'gi')));

    return (
        <div className='d-flex flex-column p-4 gap-3 w-100 content'>
            {/* Header Section */}
            <div className="d-flex align-items-center justify-content-between flex-wrap">
                <PageTitle title='All Patients' />
                <input
                    type="text"
                    placeholder='Search for a patient...'
                    onChange={(e) => setResearch(e.target.value)}
                    className='p-1'
                    style={{
                        border: '1px solid var(--border)',
                        outline: 'none',
                        color: 'var(--input-placholder)',
                        caretColor: "var(--main-color)",
                        borderRadius: '8px',
                        boxShadow: isFocused ? "0 4px 8px rgba(0, 0, 0, 0.1)" : '',
                        transition: "var(--transition)"
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>

            {/* Patients Table Section */}
            <div
                className='patientTableHandleScrollBar'
                style={{ borderRadius: '8px', overflow: "scroll", flex: '1', height: '100%' }}
            >
                {PatientError ? (
                    <p>Error: {PatientError.message}</p>
                ) : !PatientsIsLoaded ? (
                    <p>Loading...</p>
                ) : filteredPatients.length ? (
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col" className='text-center align-middle'>#</th>
                                <th scope="col" className='text-center align-middle'>Name</th>
                                <th scope="col" className='text-center align-middle'>Age</th>
                                <th scope="col" className='text-center align-middle'>Phone</th>
                                <th scope="col" className='text-center align-middle'>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map((p, i) => (
                                <tr key={i} onClick={() => navigate(`/patient/${p.id}`)}>
                                    <th scope="row" className='text-center align-middle'>{i + 1}</th>
                                    <td className='d-flex align-items-center gap-2'>
                                        <img
                                            src={p.image || assets.default_patient_image}
                                            alt={p.name}
                                            onError={(e) => (e.target.src = assets.default_patient_image)}
                                            width='50'
                                            style={{ borderRadius: "50%" }}
                                        />
                                        <p>{p.name}</p>
                                    </td>
                                    <td className='text-center align-middle'>{p.age}</td>
                                    <td className='text-center align-middle'>{p.phone}</td>
                                    <td className='text-center align-middle'>{p.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className='d-flex align-items-center justify-content-center flex-column h-100'>
                        <img src={assets.Detective_check_footprint} alt='No patients found' width='300' />
                        <span>Empty...</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientsListContent;