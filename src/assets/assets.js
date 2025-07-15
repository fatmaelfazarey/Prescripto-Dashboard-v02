import add_icon from './add_icon.svg'
import admin_logo from './admin_logo.svg'
import appointment_icon from './appointment_icon.svg'
import cancel_icon from './cancel_icon.svg'
import doctor_icon from './doctor_icon.svg'
import home_icon from './home_icon.svg'
import people_icon from './people_icon.svg'
import upload_area from './upload_area.svg'
import list_icon from './list_icon.svg'
import tick_icon from './tick_icon.svg'
import appointments_icon from './appointments_icon.svg'
import earning_icon from './earning_icon.svg'
import patients_icon from './patients_icon.svg'
import view from './view.png';
import eye from './eye.png';
import logo from './logo.svg';
import language_icon from './language.png';
import mode_icom from './light.png';
import medical_team from './medical-team.png';
import default_patient_image from './upload_area.png';
import Detective_check_footprint from './Detective-check-footprint 1.png'

export const assets = {
    add_icon,
    admin_logo,
    appointment_icon,
    cancel_icon,
    doctor_icon,
    upload_area,
    home_icon,
    patients_icon,
    people_icon,
    list_icon,
    tick_icon,
    appointments_icon,
    earning_icon,
    view,
    eye,
    logo,
    language_icon,
    mode_icom,
    medical_team,
    default_patient_image,
    Detective_check_footprint
}
export const NavBar = [

    {
        icon: assets.home_icon,
        path: "/dashboard",
        text: "Dashboard"
    },
    {
        icon: assets.appointment_icon,
        path: "/appointments",
        text: "Appointments"
    },
    {
        icon: assets.add_icon,
        path: "/add-doctor",
        text: "Add Doctor"
    },
    {
        icon: assets.medical_team,
        path: "/doctors-list",
        text: "Doctors List"
    },
    {
        icon: assets.people_icon,
        path: "/patient-list",
        text: "Patient List"
    }
];