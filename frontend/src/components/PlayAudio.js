import React from 'react'

const PlayAudio = ({file}) => {
    console.log(`${process.env.REACT_APP_STATIC_FILE_SERVE_URL + file}`);
  return (
    <div>
        {file &&
            <audio src={`${process.env.REACT_APP_STATIC_FILE_SERVE_URL + file}`} controls />
        }
    </div>
  )
}

export default PlayAudio;