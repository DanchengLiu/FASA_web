import React, { useEffect, useState } from 'react'
import { useFileDispatch } from '../context/FileContext';

const SelectExampleTextFile = ({setFileHandler}) => {
  const [, textFile,, selectTextFileHandler] = useFileDispatch();
  const [selectedFile, setSelectedFile] = useState("");

  const textFileHandler = (event) => {
    selectTextFileHandler(event.target.value);
  }

  useEffect(() => {
    setSelectedFile(textFile);
  }, [textFile]);

  return (
    <div className=' flex flex-col'>
        <label htmlFor='audioFile' className="mb-5 block text-xl font-semibold text-[#07074D]">
          Select an example text file from below
        </label>
        <select className=' bg-blue-600 text-white py-1 px-2 rounded-md' value={selectedFile} onChange={textFileHandler}>
            <option style={{display: "none"}}>Select text file</option>
            <option value={""}>Select Text</option>
            <option value={"758.txt"}>758.txt</option>
            <option value={"759.txt"}>759.txt</option>
            <option value={"760.txt"}>760.txt</option>
            <option value={"761.txt"}>761.txt</option>
            <option value={"762.txt"}>762.txt</option>
        </select>
    </div>
  )
}

export default SelectExampleTextFile;