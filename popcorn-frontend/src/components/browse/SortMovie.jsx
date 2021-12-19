import React from 'react'


const SortMovie = ({sort,setSort}) => {

    const clickHandler = (e)=>{
        setSort(e.target.value)
    }

    return (
        <div>
            <h6>Sort Movies</h6>
            <form>
                <input type="radio" name="numOfVotes" value="numOfVotes" onChange={clickHandler} checked={sort==="numOfVotes"}/>
                <label htmlFor="numOfVotes">Sort by Most Reviewed</label>
                <input type="radio" name="year" value="year" onChange={clickHandler} checked={sort==="year"}/>
                <label htmlFor="year">Sort by Year</label>
                <input type="radio" name="score" value="score" onChange={clickHandler} checked={sort==="score"}/>
                <label htmlFor="score">Sort by Rating</label>
            </form>
        </div>
    )
}

export default SortMovie
