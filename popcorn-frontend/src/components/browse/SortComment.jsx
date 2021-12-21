import React from 'react'


const SortComment = ({sort,setSort}) => {

    const clickHandler = (e)=>{
        setSort(e.target.value)
    }

    return (
        <div>
            <form style={{marginTop:"15px"}}>
                <input className="radio radio-primary radio-sm" type="radio" name="totalLikes" value="totalLikes" onChange={clickHandler} checked={sort==="totalLikes"}/>&nbsp;
                <label htmlFor="totalLikes">Sort by Most Likes</label> &nbsp;&nbsp;
                <input className="radio radio-primary radio-sm" type="radio" name="CreatedDate" value="CreatedDate" onChange={clickHandler} checked={sort==="CreatedDate"}/>&nbsp;
                <label htmlFor="CreatedDate">Sort by Recent Created</label>&nbsp;&nbsp;
            </form>
        </div>
    )
}

export default SortComment