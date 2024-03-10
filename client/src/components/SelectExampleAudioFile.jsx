import React, { useEffect, useState } from 'react'
import { useFileDispatch } from '../context/FileContext';

const SelectExampleAudioFile = () => {
  const [audioFile,,selectAudioFileHandler] = useFileDispatch();
  const [selectedAudio, setSelectedAudio] = useState("");

  const audioFileHandler = (event) => {
    selectAudioFileHandler(event.target.value);
  }

  useEffect(() => {
    setSelectedAudio(audioFile);
  }, [audioFile]);

  return (
    <div className=' flex flex-col'>
        <label htmlFor='audioFile' className="mb-5 block text-xl font-semibold text-[#07074D]">
          Select an example audio file from below
        </label>
        <select className=' bg-blue-600 text-white py-1 px-2 rounded-md' value={selectedAudio} onChange={audioFileHandler}>
            <option style={{display: "none"}}>Select Audio</option>
            <option value={""}>Select Audio</option>
            <option value={"758.mp3"}>758.mp3</option>
            <option value={"759.mp3"}>759.mp3</option>
            <option value={"760.mp3"}>760.mp3</option>
            <option value={"761.mp3"}>761.mp3</option>
            <option value={"762.mp3"}>762.mp3</option>
        </select>
    </div>
  )
}

export default SelectExampleAudioFile;