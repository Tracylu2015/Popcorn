import React from 'react'


const SortMovie = ({sort,setSort}) => {

    const clickHandler = (e)=>{
        setSort(e.target.value)
    }

    return (
        <div>
            <form style={{marginTop:"15px"}}>
                <input className="radio radio-primary radio-sm" type="radio" name="numOfVotes" value="numOfVotes" onChange={clickHandler} checked={sort==="numOfVotes"}/>&nbsp;
                <label htmlFor="numOfVotes">Sort by Most Reviewed</label> &nbsp;&nbsp;
                <input className="radio radio-primary radio-sm" type="radio" name="year" value="startYear" onChange={clickHandler} checked={sort==="startYear"}/>&nbsp;
                <label htmlFor="year">Sort by Year</label>&nbsp;&nbsp;
                <input className="radio radio-primary radio-sm" type="radio" name="score" value="score" onChange={clickHandler} checked={sort==="score"}/>&nbsp;
                <label htmlFor="score">Sort by Rating</label> 
            </form>
        </div>
    )
}

export default SortMovie
