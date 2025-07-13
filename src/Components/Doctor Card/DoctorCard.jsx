import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorCard.css'
import { assets } from '../../assets/assets';
const DoctorCard = (props) => {
    let navigate = useNavigate();

    const handleClick = (doctorId) => {
        navigate(`/doctor/${doctorId}`);
        // navigate(`/doctor/${doctorId}`); 
    };

    const [isImageLoaded, setImageLoaded] = useState(false);
    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div
            id={props.id}
            onClick={() => handleClick(props.id)}
            className='w-100 custom-hover'
            style={{
                backgroundColor: "var(--bg-white)",
                maxWidth: "300px",
                minWidth: "200px",
                borderRadius: "12px",
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
        >

            {!isImageLoaded && (
                <div style={{ width: '100%', height: '240px', position: 'relative' }}>
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: "var(--opacity-bg)",
                            position: 'absolute',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <span>loading...</span>
                    </div>
                </div>
            )}

            <img
                src={props.img}
                alt={props.name}
                style={{
                    width: "100%",
                    visibility: isImageLoaded ? 'visible' : 'hidden',
                    transition: 'visibility 0.3s ease',
                    backgroundColor: "var(--opacity-bg)"
                }}
                onLoad={handleImageLoad}
                onError={(e) => (e.target.src = assets.default_patient_image)}
            />

            <div className='p-3'>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "500", margin: "0px" }}>
                    {props.name}
                </h2>
                <span style={{ fontSize: ".75rem", fontWeight: "400" }}>
                    {props.speciality}
                </span>
            </div>
        </div>
    );
};

export default DoctorCard;
