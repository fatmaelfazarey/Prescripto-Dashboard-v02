import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger">
          Something went wrong. Please try again later.
        </div>
      );
    }

    return this.props.children;
  }
}

const PatientImage = ({ src, name }) => (
  <img
    src={src}
    width="50"
    className="rounded-circle"
    style={{ marginRight: '5px' }}
    onError={(e) => (e.target.src = assets.default_patient_image)}
    alt={name}
  />
);

const DoctorImage = ({ src, name }) => (
  <img
    src={src}
    width="50"
    className="rounded-circle"
    style={{ backgroundColor: 'var(--main-color)', marginRight: '5px' }}
    onError={(e) => (e.target.src = assets.default_patient_image)}
    alt={name}
  />
);

const AppointmentsComponents = ({ day, payment, patientId, doctorId, onValueChange }) => {
  const { AppointmentsIsLoaded, AppointmentError, appoinData } = useContext(AppContext);

  // Filter out incomplete entries first
  let filterAppoinDate = appoinData?.filter(e => e && e[0] && e[1] && e[2]) || [];

  // Filter appointments based on day
  if (day !== 'Day') {
    filterAppoinDate = filterAppoinDate.filter((e) => day === e[1]?.date);
  }

  // Filter appointments based on payment
  if (payment !== 'Payment') {
    const paymentFilter = payment === 'Payment Only' ? 'true' : 'false';
    filterAppoinDate = filterAppoinDate.filter((e) => e[1]?.Payment === paymentFilter);
  }

  if (patientId) {
    filterAppoinDate = filterAppoinDate.filter((e) => e[2]?.id === patientId);
    onValueChange?.(filterAppoinDate.length);
  } else if (doctorId) {
    filterAppoinDate = filterAppoinDate.filter((e) => e[0]?.id === doctorId);
    onValueChange?.(filterAppoinDate.length);
  }

  if (AppointmentError) {
    return <p className="text-danger">Error: {AppointmentError.message}</p>;
  }

  if (!AppointmentsIsLoaded) {
    return <div className="text-center py-4">Loading appointments...</div>;
  }

  if (!filterAppoinDate.length) {
    return (
      <div className="d-flex align-items-center justify-content-center flex-column h-100">
        <img src={assets.Detective_check_footprint} alt="No appointments found" width="300" />
        <span className="mt-3">No appointments found</span>
      </div>
    );
  }

  return (
    <div className="h-100">
      <table className="table table-hover" style={{ overflow: 'scroll' }}>
        <thead>
          <tr>
            <th scope="col" className="text-center align-middle">#</th>
            <th scope="col" className="text-left align-middle">Patient</th>
            <th scope="col" className="text-left align-middle">Department</th>
            <th scope="col" className="text-left align-middle">Age</th>
            <th scope="col" className="text-left align-middle">Date & Time</th>
            <th scope="col" className="text-left align-middle">Doctor</th>
            <th scope="col" className="text-left align-middle">Fees</th>
            <th scope="col" className="text-left align-middle">Payment</th>
          </tr>
        </thead>
        <tbody>
          {filterAppoinDate.map((e, i) => (
            <tr key={i}>
              <th scope="row" className="text-center align-middle">{i + 1}</th>
              <td className="text-left align-middle">
                <PatientImage src={e[2]?.image} name={e[2]?.name} />
                {e[2]?.name || 'N/A'}
              </td>
              <td className="text-left align-middle">{e[0]?.speciality || 'N/A'}</td>
              <td className="text-left align-middle">{e[2]?.age || 'N/A'}</td>
              <td className="text-left align-middle">
                {e[1]?.time || ''} {e[1]?.date || 'N/A'}
              </td>
              <td className="text-left align-middle">
                <DoctorImage src={e[0]?.image} name={e[0]?.name} />
                {e[0]?.name || 'N/A'}
              </td>
              <td className="text-left align-middle">{e[0]?.fees || 'N/A'}</td>
              <td className="text-left align-middle">{e[1]?.Payment || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Wrap the component with ErrorBoundary
export default (props) => (
  <ErrorBoundary>
    <AppointmentsComponents {...props} />
  </ErrorBoundary>
);