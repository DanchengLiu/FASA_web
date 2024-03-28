import React from 'react'

const RenderTextFile = ({file}) => {
    console.log(process.env.REACT_APP_STATIC_FILE_SERVE_URL + file);
    const url = `${process.env.REACT_APP_STATIC_FILE_SERVE_URL}` + `${typeof(file) === 'string' ? file : file.name}`;
    const fileName = typeof(file) === 'string' ? file : file.name;

  return (
    <div>
        <a href={url} target='_blank' className=' text-blue-600 underline'>{fileName}</a>
    </div>
  )
}

export default RenderTextFile;