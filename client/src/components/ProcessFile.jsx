import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import { useFileDispatch } from '../context/FileContext';
import { api } from '../api/apis';

const ProcessFile = () => {
  const [fileSelectionError, setFileSelectionError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [audioFile, textFile] = useFileDispatch();

  const processFileHandler = () => {
    if(!audioFile) {
      setFileSelectionError(true);
    } else {
      setFileSelectionError(false);
      setLoading(true);

      const formData = new FormData();

      formData.append("audio", audioFile);
      const textContent = typeof(textFile) === 'string' ? textFile : textFile.file;
      formData.append("text", textContent);

    //   const apiUrl = `${process.env.REACT_APP_SERVER_URL}` +  ":" + `${process.env.REACT_APP_SERVER_PORT}` + `${typeof(audioFile) === 'string' ? "/processExample" : "/process"}`;
      // fetch(apiUrl, {
      //     method: 'POST',
      //     body: formData
      // }).then((response) => {
      api.post(typeof(audioFile) === 'string' ? "/processExample" : "/process", formData, {responseType: 'blob'}).then(response => {
        console.log(response)
        console.log(response.headers)
        // Create a blob URL from the response data
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = url;
        const fileName = typeof(audioFile) === 'string' ? audioFile.split('.')[0] : audioFile.name.split('.')[0];
        // console.log(fileName);
        // console.log(audioFile.split('.'));
        link.setAttribute('download', `${fileName}.zip`); // Set the filename for the downloaded file

        // Append the link to the document body and trigger a click event
        document.body.appendChild(link);
        link.click();

        // Clean up by removing the link from the document body and revoking the URL
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        setLoading(false);

      })
    .catch((error) => {
        console.error('Error:', error);
        alert(error);
        setLoading(false);
    });
    }
  }

  useEffect(() => {
    if(audioFile) {
        setFileSelectionError(false);
    }
  }, [audioFile]);

  return (
    <div>

        <button className=" bg-blue-500 px-4 py-1 text-white rounded-md active:bg-blue-600" onClick={processFileHandler}>Process</button>
        {loading && <span className=" ml-4 text-green-600">{"Processing file " + `${typeof(audioFile) === 'string' ? audioFile : audioFile.name}`  + " " + `${typeof(textFile) === 'string' ? textFile : textFile.name}` + "..."}</span>}
        {loading && <Loading></Loading>}

        {fileSelectionError &&
            <div>
              <p className=" text-red-700">Please select a file to process!</p>
            </div>
        }
    </div>
  )
}

export default ProcessFile;