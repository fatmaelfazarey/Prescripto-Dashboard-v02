// import React, { useContext } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { AppContext } from '../../Context/AppContext';

// const DoctorsStatistic = () => {
//     const { appoinData } = useContext(AppContext);

//     // حساب عدد الأطباء والرسوم الكلية
//     const specialityCounts = appoinData.reduce((acc, doctor) => {
//         if (doctor[0].name && doctor[0].fees) {
//             // إذا كان الدكتور موجود بالفعل، نزيد عدد المواعيد
//             if (acc[doctor[0].name]) {
//                 acc[doctor[0].name].appointmentsNumber += 1;
//             } else {
//                 // إذا كان الدكتور غير موجود، نضيفه مع بياناته
//                 acc[doctor[0].name] = {
//                     name: doctor[0].name,
//                     appointmentsNumber: 1,
//                     fees: doctor[0].fees
//                 };
//             }
//         } else {
//             console.warn("Doctor missing name or fees field:", doctor);
//         }
//         return acc;
//     }, {});

//     // تحويل النتيجة إلى مصفوفة من الكائنات
//     const specialityArray = Object.values(specialityCounts).map(doctor => ({
//         ...doctor,
//         totalFees: doctor.appointmentsNumber * doctor.fees // حساب الرسوم الكلية
//     }));

//     console.log(specialityArray);

//     return (
//         <div style={{
//             width: '100%', height: 500, backgroundColor: "var(--bg-white)",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "12px",
//         }}>
//             <h3 style={{ textAlign: 'center', marginBottom: '20px' }}></h3>
//             <ResponsiveContainer >
//                 <BarChart
//                     data={specialityArray}
//                     margin={{
//                         top: 20,
//                         right: 30,
//                         left: 20,
//                         bottom: 50, // زيادة الهامش السفلي لعرض أسماء الأطباء بشكل مائل
//                     }}
//                 >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis
//                         dataKey="name"
//                         angle={-45} // تدوير أسماء الأطباء 45 درجة لتصبح مائلة
//                         textAnchor="end" // محاذاة النص إلى النهاية
//                         interval={0} // عرض جميع الأسماء
//                         tick={{ fontSize: 5 }} // تصغير حجم الخط
//                     />
//                     <YAxis />
//                     <Tooltip />
//                     {/* <Legend
//                         layout="vertical" // وضع Legend عمودي
//                         align="right" // محاذاة Legend إلى اليمين
//                         verticalAlign="middle" // محاذاة Legend إلى المنتصف
//                     /> */}
//                     <Bar dataKey="appointmentsNumber" fill="#FF6384" name="Appointments" />
//                     <Bar dataKey="totalFees" fill="#36A2EB" name="Total Fees" />
//                 </BarChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

// export default DoctorsStatistic;

import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AppContext } from '../../Context/AppContext';

const DoctorsStatistic = () => {
    const { appoinData, AppointmentsIsLoaded } = useContext(AppContext);

    // Handle loading state
    if (!AppointmentsIsLoaded) {
        return (
            <div style={{
                width: '100%', 
                height: 500, 
                backgroundColor: "var(--bg-white)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
                borderRadius: "12px",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // Handle case when data isn't available yet
    if (!appoinData) {
        return (
            <div style={{
                width: '100%', 
                height: 500, 
                backgroundColor: "var(--bg-white)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
                borderRadius: "12px",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <p>Data is not available yet</p>
            </div>
        );
    }

    // Handle empty data array
    if (appoinData.length === 0) {
        return (
            <div style={{
                width: '100%', 
                height: 500, 
                backgroundColor: "var(--bg-white)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
                borderRadius: "12px",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <p>No appointment data available</p>
            </div>
        );
    }

    // حساب عدد الأطباء والرسوم الكلية
    const specialityCounts = appoinData.reduce((acc, doctor) => {
        if (doctor[0]?.name && doctor[0]?.fees) {
            // إذا كان الدكتور موجود بالفعل، نزيد عدد المواعيد
            if (acc[doctor[0].name]) {
                acc[doctor[0].name].appointmentsNumber += 1;
            } else {
                // إذا كان الدكتور غير موجود، نضيفه مع بياناته
                acc[doctor[0].name] = {
                    name: doctor[0].name,
                    appointmentsNumber: 1,
                    fees: doctor[0].fees
                };
            }
        } else {
            console.warn("Doctor missing name or fees field:", doctor);
        }
        return acc;
    }, {});

    // تحويل النتيجة إلى مصفوفة من الكائنات
    const specialityArray = Object.values(specialityCounts).map(doctor => ({
        ...doctor,
        totalFees: doctor.appointmentsNumber * doctor.fees // حساب الرسوم الكلية
    }));

    return (
        <div style={{
            width: '100%', 
            height: 500, 
            backgroundColor: "var(--bg-white)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
            borderRadius: "12px",
        }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}></h3>
            <ResponsiveContainer>
                <BarChart
                    data={specialityArray}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 50,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        interval={0}
                        tick={{ fontSize: 5 }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="appointmentsNumber" fill="#FF6384" name="Appointments" />
                    <Bar dataKey="totalFees" fill="#36A2EB" name="Total Fees" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DoctorsStatistic;