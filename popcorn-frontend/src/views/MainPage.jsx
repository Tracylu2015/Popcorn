import React from 'react'
import MostPopular from '../components/dashboard/MostPopular'
import Recommendation from '../components/dashboard/Recommendation'

const MainPage = () => {
    return (
        <div>
            <MostPopular />
            <br/>
            <Recommendation />
        </div>
    )
}

export default MainPage
