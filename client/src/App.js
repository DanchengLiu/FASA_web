import { useState } from "react";
import ProcessFile from "./components/ProcessFile";
import Accordian from "./components/Accordian";
import FileContext, { useFileDispatch } from "./context/FileContext";

function App() {

  return (
    <FileContext>
      <div className=" p-4 pb-10">
        <div className=" flex items-center gap-10">
          <img src="./University_at_Buffalo_logo.svg.png" className=" w-1/3 h-auto" />
          <p className=" text-8xl text-blue-600">FASA Web</p>
        </div>

        <div className=" border border-black rounded-md mt-10 p-4 w-1/3 mx-auto bg-white shadow-xl relative">

          <div className=" flex flex-col gap-4">
              <Accordian />  

              <hr />

              <ProcessFile />
          </div>

        </div>
      </div>
    </FileContext>
  );
}

export default App;
