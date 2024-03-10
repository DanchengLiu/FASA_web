import React, { createContext, useContext, useState } from 'react'

export const FileContextDispatch = createContext();

const FileContext = ({children}) => {
  const [audioFile, setAudioFile] = useState("");
  const [textFile, setTextFile] = useState("");

  const selectAudioFileHandler = (file) => {
    setAudioFile(file);
  }

  const selectTextFileHandler = (file) => {
    setTextFile(file);
  }

  const resetFilesHandler = () => {
    setAudioFile("");
    setTextFile("");
  }

  return (
    <FileContextDispatch.Provider value={[ audioFile, textFile, selectAudioFileHandler, selectTextFileHandler, resetFilesHandler ]}>
        {children}
    </FileContextDispatch.Provider>
  )
}

export default FileContext;

export const useFileDispatch = () => useContext(FileContextDispatch)