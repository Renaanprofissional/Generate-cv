import { useState } from "react";
import FormCv, { type CurriculoData } from "./components/common/FormCv";
import CurriculoTemplate from "./components/common/ResultCv";

function App() {
  const [curriculoData, setCurriculoData] = useState<CurriculoData | null>(
    null
  );
  return (
    <div className="flex flex-col mt-5 md:flex-row md:p-5">
      <div className="m-5 mt-0 w-[90%] h-[auto] bg-[#e4e9ed] rounded-lg p-5">
        <FormCv onSubmit={setCurriculoData} />
      </div>
      <div className="m-5 mt-0 w-[90%] h-[auto] bg-[#e4e9ed] rounded-lg p-5">
        {curriculoData ? (
          <CurriculoTemplate data={curriculoData} />
        ) : (
          <p className="text-gray-500 text-center">
            Preencha o formulário para ver o template.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
