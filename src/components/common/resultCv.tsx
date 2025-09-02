import React from "react";
import type { CurriculoData } from "./FormCv";

interface Props {
  data: CurriculoData;
}

const CurriculoTemplate: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-[20px] text-center font-bold text-red-600">
        {data.nome}
      </h1>

      <div className="w-full bg-gray-800 h-0.5">

      </div>

      <p className="text-center">
        📍 {data.cidade} | 📧 {data.email} | 📱 {data.telefone}
        <br />
        💻 {data.github} | 🔗 {data.linkedin}
      </p>


      <p className="font-semibold text-start">🎯 Objetivo:</p>
      <p className="text-gray-600 relative bottom-3">{data.objetivos}</p>

      <div>
        <h3 className="font-semibold">🎓 Formação:</h3>
        <ul className="list-disc list-inside">
          {data.formacoes.map((exp, i) => (
            <li key={i}>{exp}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold">🛠️ Habilidades Técnicas</h3>
        <ul className="list-disc list-inside">
          {data.habilidades.map((hab, i) => (
            <li key={i}>{hab}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold">📂 Projetos</h3>
        <ul className="list-disc list-inside">
          {data.projetos.map((hab, i) => (
            <li key={i}>{hab}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold">🌟 Soft Skills</h3>
        <ul className="list-disc list-inside">
          {data.softskills.map((hab, i) => (
            <li key={i}>{hab}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CurriculoTemplate;
