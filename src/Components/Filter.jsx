import React, { useState } from 'react'

const Filter = (props) => {
    const handleSpecialityChange = (e) => {
        props.onValueChange(e.target.value);
    }
    const handleDayChange = (e) => {
        props.onDaysChange(e.target.value);
    }
    const handlePaymentChange = (e) => {
        props.onPaymentChange(e.target.value);
    }
    const daysOfWeek = ['Day', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const StateOfPayment = ['Payment', 'Payment Only', 'Not Payment'];
    const speciality = ['All', 'General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist']

    return (
        <div>
            {
                props.type == 'speciality' ?
                    < select name="speciality" id="drop" onChange={handleSpecialityChange} style={{ fontSize: '1rem', color: 'white', backgroundColor: "var(--main-color)", borderRadius: '12px', border: 'none', outline: 'none' }} className='p-2'>
                        {
                            speciality.map((e, i) => (
                                <option value={e} key={i} style={{ backgroundColor: "var(--hover-color)", color: "var(--aside-text)" }}>{e}</option>
                            ))
                        }
                    </select>
                    : props.type === 'days' ?
                        <select name='days' id='days' onChange={handleDayChange} style={{ fontSize: '1rem', color: 'white', backgroundColor: "var(--main-color)", borderRadius: '12px', border: 'none', outline: 'none' }} className='p-2'>
                            {
                                daysOfWeek.map((e, i) => (
                                    <option value={e} key={i} style={{ backgroundColor: "var(--hover-color)", color: "var(--aside-text)" }}>{e}</option>
                                ))
                            }
                        </select>
                        : props.type === 'Payment' ?
                            <select name='Payment' id='Payment' onChange={handlePaymentChange} style={{ fontSize: '1rem', color: 'white', backgroundColor: "var(--main-color)", borderRadius: '12px', border: 'none', outline: 'none' }} className='p-2'>
                                {
                                    StateOfPayment.map((e, i) => (
                                        <option value={e} key={i} style={{ backgroundColor: "var(--hover-color)", color: "var(--aside-text)" }}>{e}</option>
                                    ))
                                }
                            </select> : ''
            }

        </div >
    )
}

export default Filter
