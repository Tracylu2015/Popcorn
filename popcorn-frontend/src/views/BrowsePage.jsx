import React from 'react'
import Categories from '../components/Categories'
import SortMovie from '../components/SortMovie'

const BrowsePage = () => {
    return (
        <div>
            <Categories/>
            <SortMovie />
            show different results according to different sorting selection
        </div>
    )
}

export default BrowsePage
