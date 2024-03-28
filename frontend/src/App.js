import { useState } from "react";
import ProcessFile from "./components/ProcessFile";
import Accordian from "./components/Accordian";
import FileContext, { useFileDispatch } from "./context/FileContext";
import Instructions from "./components/Instructions";
import ProjectOverview from "./components/ProjectOverview";
import Header from "./components/Header";

function App() {

  return (
    <FileContext>
      <div className="">
        <Header />

        <div className=" flex flex-col justify-between items-start mt-10 px-4 mb-10 gap-6 w-full">
          <div className="">
            <ProjectOverview />
          </div>

          <div id="demo" className=" flex flex-col gap-4 mt-10 mx-auto lg:w-[70%]">
            <Instructions />
            {/* <div className=" border border-black rounded-md p-4 bg-white shadow-xl" >
              <img src="./FASA_pipeline.png" className=""/>
            </div> */}

            <div className=" border border-black rounded-md p-4 mb-10 bg-white shadow-xl relative">
              <h1 className=" text-xl font-semibold text-[#07074D]">Project Demo</h1>

              <div className=" flex flex-col gap-4">
                <Accordian />  

                <hr />

                <ProcessFile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FileContext>
  );
}

export default App;
