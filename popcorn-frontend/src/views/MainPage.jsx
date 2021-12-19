import React from 'react'
import MostPopular from '../components/dashboard/MostPopular'
import Rateit from '../components/Rateit'
import Recommendation from '../components/dashboard/Recommendation'

const MainPage = () => {
    return (
        <div>
            <MostPopular />

            <Recommendation />
        </div>
    )
}

export default MainPage
