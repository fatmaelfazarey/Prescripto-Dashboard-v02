// import React, { useContext } from 'react';
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { AppContext } from '../../Context/AppContext';

// const SpecialityStatistic = () => {
//     const { doctors } = useContext(AppContext);


//     const specialityCounts = doctors.reduce((acc, doctor) => {
//         if (doctor.speciality) {
//             acc[doctor.speciality] = (acc[doctor.speciality] || 0) + 1;
//         } else {
//             console.warn("Doctor missing speciality field:", doctor);
//         }
//         return acc;
//     }, {});


//     const specialityArray = Object.entries(specialityCounts).map(([speciality, count]) => ({
//         speciality,
//         count
//     }));


//     const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

//     return (
//         <div
//             className={`d-flex flex-row align-items-center justify-content-center p-4 w-100`}
//             style={{
//                 backgroundColor: "var(--bg-white)",
//                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                 borderRadius: "12px",
//                 height:"fit-content"
//             }}
//         >
//             {/* Pie Chart */}
//             <div style={{ width: '100%', height: 400 }}>
//                 <ResponsiveContainer>
//                     <PieChart>
//                         <Pie
//                             data={specialityArray}
//                             cx="50%"
//                             cy="50%"
//                             labelLine={false}
//                             outerRadius={150}
//                             fill="#8884d8"
//                             dataKey="count"
//                             nameKey="speciality"
//                             label={({ speciality, percent }) => `${speciality}: ${(percent * 100).toFixed(2)}%`}
//                         >
//                             {specialityArray.map((entry, index) => (
//                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                             ))}
//                         </Pie>
//                         <Tooltip />
//                     </PieChart>
//                 </ResponsiveContainer>
//             </div>

//         </div>
//     );
// };

// export default SpecialityStatistic;

import React, { useContext } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AppContext } from '../../Context/AppContext';

const SpecialityStatistic = () => {
    const { doctors, isLoaded } = useContext(AppContext);

    // Handle loading state - changed from if(isLoaded) to if(!isLoaded)
    if (!isLoaded) {
        return (
            <div
                className={`d-flex flex-row align-items-center justify-content-center p-4 w-100`}
                style={{
                    backgroundColor: "var(--bg-white)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "12px",
                    height: "fit-content"
                }}
            >
                <div style={{ width: '100%', height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    // Handle case when doctors data isn't available yet
    if (!doctors) {
        return (
            <div
                className={`d-flex flex-row align-items-center justify-content-center p-4 w-100`}
                style={{
                    backgroundColor: "var(--bg-white)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "12px",
                    height: "fit-content"
                }}
            >
                <div style={{ width: '100%', height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Data is not available yet</p>
                </div>
            </div>
        );
    }

    // Handle empty doctors array
    if (doctors.length === 0) {
        return (
            <div
                className={`d-flex flex-row align-items-center justify-content-center p-4 w-100`}
                style={{
                    backgroundColor: "var(--bg-white)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "12px",
                    height: "fit-content"
                }}
            >
                <div style={{ width: '100%', height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p>No doctor data available</p>
                </div>
            </div>
        );
    }

    // Process data
    const specialityCounts = doctors.reduce((acc, doctor) => {
        if (doctor.speciality) {
            acc[doctor.speciality] = (acc[doctor.speciality] || 0) + 1;
        } else {
            console.warn("Doctor missing speciality field:", doctor);
        }
        return acc;
    }, {});

    const specialityArray = Object.entries(specialityCounts).map(([speciality, count]) => ({
        speciality,
        count
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

    return (
        <div
            className={`d-flex flex-row align-items-center justify-content-center p-4 w-100`}
            style={{
                backgroundColor: "var(--bg-white)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                height: "fit-content"
            }}
        >
            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={specialityArray}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="count"
                            nameKey="speciality"
                            label={({ speciality, percent }) => `${speciality}: ${(percent * 100).toFixed(2)}%`}
                        >
                            {specialityArray.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        {/* <Legend /> */}
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SpecialityStatistic;