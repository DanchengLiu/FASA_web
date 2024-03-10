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

        <div className=" flex flex-grow justify-between items-start mt-10 px-4">
          <ProjectOverview />

          <div className=" border border-black rounded-md w-[40%] p-4 mb-10 bg-white shadow-xl relative">
            <div className=" flex flex-col gap-4">
                <Accordian />  

                <hr />

                <ProcessFile />
            </div>
          </div>

          <Instructions />
        </div>
      </div>
    </FileContext>
  );
}

export default App;
