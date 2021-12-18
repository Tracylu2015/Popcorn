import React from 'react'

const SortMovie = () => {
    return (
        <div>
            <form>
                <input type="radio" name="Sort by Popularity"  />
                <input type="radio" name="Sort by Year"  />
                <input type="radio" name="Sort by Reviews"  />
            </form>
        </div>
    )
}

export default SortMovie
