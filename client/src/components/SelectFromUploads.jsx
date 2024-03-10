import React from 'react'
import { useFileDispatch } from '../context/FileContext';
import AudioFileUpload from './AudioFileUpload';
import TextFileUpload from './TextFileUpload';

const SelectFromUploads = () => {
  const [audioFile, textFile] = useFileDispatch();

  return (
    <div className=' p-4 flex flex-col gap-4'>
        <AudioFileUpload />
{/* 
        <hr />

        <label>
            <p className=" font-bold">Input Transcription(if you do not have a text file for transcription):</p>
            <div className=" border rounded-md overflow-hidden">
                <textarea className=" w-full focus:outline-none" rows={4} />
            </div>
        </label> */}

        <hr />

        <TextFileUpload />
    </div>
  )
}

export default SelectFromUploads;