import React, { useState } from 'react'
import SelectExampleAudioFile from './SelectExampleAudioFile';
import PlayAudio from './PlayAudio';
import SelectExampleTextFile from './SelectExampleTextFile';
import RenderTextFile from './RenderTextFile';
import { useFileDispatch } from '../context/FileContext';

const SelectFromExamples = () => {
  const [audioFile, textFile] = useFileDispatch();

  return (
    <div className=' p-4 flex flex-col gap-4'>
        <div className=" flex flex-col gap-4">
            <SelectExampleAudioFile />

            <PlayAudio file={audioFile} />

            <SelectExampleTextFile />

            <RenderTextFile file={textFile} />
        </div>
    </div>
  )
}

export default SelectFromExamples;