import { createContext, useEffect, useState } from "react";
// import { useLocalStorage } from 'usehooks-ts';
// import { useTranslation } from "react-i18next";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const url = `https://serverv02.vercel.app/`;
    const currencySymbol = '$';
    const generateToken = () => {
        return Math.random().toString(36).substr(2, 10);  // 10 random characters
    };
    // const [language, setLanguage] = useLocalStorage('language', 'en' || language);
    // const { t } = useTranslation();

    const token = generateToken();

    //#region call Doctors Server
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [doctors, setDoctors] = useState([]);
    // const [lastDocId, setLastDocId] = useState('');
    function callDoctorsServer() {
        fetch(`${url}doctors`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setDoctors(result);
                    // if (result.length > 0) {
                    //     setLastDocId(result[result.length - 1]['_id']);
                    // } else {
                    //     setLastDocId(null);
                    // }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }
    useEffect(() => {
        callDoctorsServer();
    }, []);
    useEffect(() => {
        setDoctors(doctors);
    }, [doctors]);
    //#endregion

    //#region call Patients Server
    const [PatientsIsLoaded, setPatientsIsLoaded] = useState(false);
    const [PatientError, setPatientError] = useState(null);
    const [patients, setpatients] = useState([]);
    function callPatientsServer() {
        fetch(`${url}Patients`)
            .then(res => res.json())
            .then(
                (result) => {
                    setPatientsIsLoaded(true);
                    setpatients(result);
                },
                (error) => {
                    setPatientsIsLoaded(true);
                    setPatientError(error);
                }
            )
    }
    useEffect(() => {
        callPatientsServer();
    }, []);
    useEffect(() => {
        setpatients(patients);
    }, [patients]);
    //#endregion

    //#region Appointments
    const [AppointmentsIsLoaded, setAppointmentsIsLoaded] = useState(false);
    const [AppointmentError, setAppointmentError] = useState(null);
    const [Appointments, setAppointments] = useState([]);
    const [appoinData, setAppoinData] = useState([]);
    function callAppointmentsServer() {
        fetch(`${url}appointments`)
            .then(res => res.json())
            .then(
                (result) => {
                    setAppointmentsIsLoaded(true);
                    setAppointments(result);
                },
                (error) => {
                    setAppointmentsIsLoaded(true);
                    setAppointmentError(error);
                }
            )
    }
    useEffect(() => {
        callAppointmentsServer();
    }, []);

    useEffect(() => {
        if (Appointments.length > 0) {
            const newAppoinData = Appointments.map((appo) => {
                const docData = doctors.find((e) => e._id === appo.docId);
                const patientData = patients.find((e) => e.id === appo.patientId);
                return [docData, appo, patientData];
            });
            setAppoinData(newAppoinData);
        }
    }, [Appointments, doctors, patients]);
    // useEffect(() => {
    //     console.log('Appointment Data:', appoinData);
    // }, [appoinData]);
    //#endregion


    //region Dashboard 
    const AppointmentsLength = Appointments.length;
    const patientsLength = patients.length;
    const DoctorsLength = doctors.length;



    //#endregion


    //#endregion
    const value = {
        currencySymbol,
        token,
      
        doctors,
        setDoctors, error,
        isLoaded,
        PatientError,
        PatientsIsLoaded,
        patients,
        setpatients,url,
        AppointmentsIsLoaded,
        AppointmentError,
        appoinData,
        AppointmentsLength, patientsLength, DoctorsLength


    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;
