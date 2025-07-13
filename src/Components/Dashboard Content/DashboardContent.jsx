import React from 'react'
import TopStatistic from './TopStatistic'
import SpecialityStatistic from './SpecialityStatistic'
import DoctorsAtatistic from './DoctorsAtatistic'


const DashboardContent = () => {
    return (
        <div className='w-100' style={{ overflow: "scroll", }}>

            <div className='d-flex flex-column p-4 gap-3 w-100 content' style={{ overflow: "scroll", minWidth: "800px" }}>
                <div className={`w-100 d-flex gap-3 flex-xxl-row flex-column `} >
                    <TopStatistic />
                    <SpecialityStatistic />
                </div>
                <DoctorsAtatistic />
            </div>



        </div>




    )
}

export default DashboardContent
