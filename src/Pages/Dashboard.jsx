import React from 'react'
import Header from '../Shared/Header/Header'
import Aside from '../Shared/Aside/Aside';
import DashboardContent from '../Components/Dashboard Content/DashboardContent';

// import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// rafc
const Dashboard = () => {
    return (
        <div className='bg-hover-color'>
            <Header />
            <div className="d-flex">
                <Aside path='/' />
                <DashboardContent />
            </div>
            {/* <Content /> */}

        </div>
    )
}

export default Dashboard
