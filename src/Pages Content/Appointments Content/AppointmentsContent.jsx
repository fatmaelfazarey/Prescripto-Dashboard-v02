import React, { useState } from 'react';
import PageTitle from '../../Components/PageTitle';
import Filter from '../../Components/Filter';
import styles from './AppointmentsContent.module.css';
import AppointmentsComponents from '../../Components/AppointmentsComponents';

const AppointmentsContent = () => {
    const [dayFilter, setDayFilter] = useState('Day');
    const [PaymentFilter, setPaymentFilter] = useState('Payment');


    function handleDayFilter(day) {
        setDayFilter(day);
    }
    function handlePaymentChange(pay) {
        setPaymentFilter(pay)
    }

    return (
        <div className='d-flex flex-column p-4 gap-3 w-100 content'>
            <div className="d-flex align-items-center justify-content-between gap-2">
                <PageTitle title='Appointments' />
                <div className='d-flex gap-2'>
                    <Filter type='days' onDaysChange={handleDayFilter} />
                    <Filter type='Payment' onPaymentChange={handlePaymentChange} />
                </div>
            </div>
            <div className='h-100'>
                <AppointmentsComponents day={dayFilter} payment={PaymentFilter} />
            </div>
        </div>
    )
}

export default AppointmentsContent
