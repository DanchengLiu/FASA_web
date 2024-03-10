import React from 'react'

const Instructions = () => {
  return (
    <div className=" border border-black rounded-md shadow-xl w-[25%] flex flex-col p-4 text-justify">
        <h1 className=" text-xl font-semibold text-[#07074D]">Instructions for using FASA Web</h1>
        <ul className=" px-4">
          <li style={{listStyleType: "format"}} className=" mt-4">
            <strong>Select from Examples (Dropdown Menu):</strong>
            <ul>
              <li style={{listStyle: "circle"}}>
                Click on the dropdown menu to select from a list of predefined examples. These examples are data sets or project templates that are preconfigured for demo.
              </li>
            </ul>
          </li>

          <li style={{listStyleType: "format"}} className=" mt-4">
            <strong>Upload your files (Dropdown Menu):</strong>
            <ul>
              <li style={{listStyleType: "circle"}}>
                Use this option to upload your own files to the interface. It's likely that you can upload data files or documents that the web application will process or analyze.
              </li>
            </ul>
          </li>

          <li style={{listStyleType: "format"}} className=" mt-4">
            <strong>Process (Button):</strong>
            <ul>
              <li style={{listStyleType: "circle"}}>
                After selecting an example or uploading your files, click the 'Process' button to initiate the application's analysis or computation process.
              </li>
            </ul>
          </li>
        </ul>
    </div>
  )
}

export default Instructions;