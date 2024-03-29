import React from 'react'

const SongCard = (props : {song:String}) => {
    const {song} = props
    return (
        <div>
            <p>{song}</p>
        </div>
    )
}

export default SongCard