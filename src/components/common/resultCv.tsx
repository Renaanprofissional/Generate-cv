import React from "react";
import type { CurriculoData } from "./FormCv";
import { gerarWordCv } from "../../docs/gerarWordCv";
import { Button } from "../ui/button";

interface Props {
  data: CurriculoData;
}

const CurriculoTemplate: React.FC<Props> = ({ data }) => {
  // Helper para evitar repetição
  const notEmpty = (s: string) => s.trim() !== "";

  // Pré-filtrar os arrays
  const formacoes = data.formacoes?.filter(notEmpty) ?? [];
  const habilidades = data.habilidades?.filter(notEmpty) ?? [];
  const projetos = data.projetos?.filter(notEmpty) ?? [];
  const softskills = data.softskills?.filter(notEmpty) ?? [];

  return (
    <div className="space-y-4">
      {/* Nome */}
      {data.nome?.trim() && (
        <h1 className="text-[20px] text-center font-bold text-gray-900">
          {data.nome}
        </h1>
      )}

      <div className="w-full bg-gray-800 h-0.5"></div>

      {/* Contatos */}
      <p className="text-center">
        {data.cidade?.trim() && <>📍 {data.cidade} | </>}
        {data.email?.trim() && <>📧 {data.email} | </>}
        {data.telefone?.trim() && <>📱 {data.telefone}</>}
        <br />
        {data.github?.trim() && <>💻 {data.github} | </>}
        {data.linkedin?.trim() && <>🔗 {data.linkedin}</>}
      </p>

      {/* Objetivo */}
      {data.objetivos?.trim() && (
        <>
          <p className="font-semibold text-start">🎯 Objetivo:</p>
          <p className="text-gray-600 relative bottom-3">{data.objetivos}</p>
        </>
      )}

      {/* Formação */}
      {formacoes.length > 0 && (
        <div>
          <h3 className="font-semibold">🎓 Formação:</h3>
          <ul className="list-disc list-inside">
            {formacoes.map((exp, i) => (
              <li key={i}>{exp}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Habilidades Técnicas */}
      {habilidades.length > 0 && (
        <div>
          <h3 className="font-semibold">🛠️ Habilidades Técnicas</h3>
          <ul className="list-disc list-inside">
            {habilidades.map((hab, i) => (
              <li key={i}>{hab}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Projetos */}
      {projetos.length > 0 && (
        <div>
          <h3 className="font-semibold">📂 Projetos</h3>
          <ul className="list-disc list-inside">
            {projetos.map((proj, i) => (
              <li key={i}>{proj}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Soft Skills */}
      {softskills.length > 0 && (
        <div>
          <h3 className="font-semibold">🌟 Soft Skills</h3>
          <ul className="list-disc list-inside">
            {softskills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Botão baixar */}
      <div className="pt-6 flex justify-center">
        <Button onClick={() => gerarWordCv(data)}>📥 Baixar em Word</Button>
      </div>
    </div>
  );
};

export default CurriculoTemplate;
