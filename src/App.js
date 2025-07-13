import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import logo from './logo.svg';
import './App.css';
import Dashboard from './Pages/Dashboard';
import NotFound from './Pages/NotFound';
import Appointments from './Pages/Appointments';
import AddDoctor from './Pages/AddDoctor';
import DoctorsList from './Pages/DoctorsList';
import Login from './Pages/Login';
import NotAccess from './Pages/NotAccess';
import Patient from './Pages/Patient';
import Doctor from './Pages/Doctor';
import PatientsList from './Pages/PatientsList';
import AppContextProvider from './Context/AppContext';
import Private from './Components/Private';

// import { AppContext } from './Context/AppContext';
// import { useContext } from 'react';
// import i18n from 'i18next';
// import { useEffect } from 'react';
// import './i18n';

function App() {


  // const { setLanguage } = useContext(AppContext);
  // useEffect(() => {
  //   setLanguage(localStorage.getItem('language'))
  //   i18n.changeLanguage(localStorage.getItem('language'));
  //   window.document.dir = i18n.dir();
  // }, [localStorage.getItem('language')]);

  return (
    <BrowserRouter>
      <AppContextProvider>
        <Routes>
          <Route path='login' element={<Login />} />
          {/* <Route path='/' element={<Private />} /> */}
          <Route path='/' element={<Dashboard />} />
          <Route path='appointments' element={<Appointments />} />
          <Route path='add-doctor' element={<AddDoctor />} />
          <Route path='doctors-list' element={<DoctorsList />} />
          <Route path='doctor/:doctorId' element={<Doctor />} />
          <Route path='patient-list' element={<PatientsList />} />
          <Route path='patient/:patientId' element={<Patient />} />
          <Route path='not-access' element={<NotAccess />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
