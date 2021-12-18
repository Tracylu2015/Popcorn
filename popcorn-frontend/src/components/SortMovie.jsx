import React from 'react'


const SortMovie = ({sort,setSort}) => {

    const clickHandler = (e)=>{
        setSort(e.target.value)
    }

    return (
        <div>
            <h3>Sort Movies</h3>
            <form>
                <input type="radio" name="numOfVotes" value="numOfVotes" onChange={clickHandler} checked={sort==="numOfVotes"}/>
                <label for="numOfVotes">Sort by Most Reviewed</label>
                <input type="radio" name="year" value="year" onChange={clickHandler} checked={sort==="year"}/>
                <label for="year">Sort by Year</label>
                <input type="radio" name="score" value="score" onChange={clickHandler} checked={sort==="score"}/>
                <label for="score">Sort by Rating</label>
            </form>
        </div>
    )
}

export default SortMovie
