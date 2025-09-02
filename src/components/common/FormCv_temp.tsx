import { useState, type JSX } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

// Tipagem do currículo
export interface CurriculoData {
  nome: string;
  cidade: string;
  email: string;
  telefone: string;
  linkedin?: string;
  github?: string;
  objetivos: string;
  formacoes: string[];
  habilidades: string[];
  projetos: string[];
  softskills: string[];
}

// Props do componente
interface Props {
  onSubmit: (data: CurriculoData) => void;
}

const Formcv: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<CurriculoData>({
    nome: "",
    cidade: "",
    email: "",
    telefone: "",
    linkedin: "",
    github: "",
    objetivos: "",
    formacoes: [],
    habilidades: [],
    projetos: [],
    softskills: [],
  });

  // Atualiza campos de texto ou arrays
  const handleChange = (
    field: keyof CurriculoData,
    value: string,
    index?: number
  ): void => {
    if (index !== undefined && Array.isArray(form[field])) {
      const updatedArray: string[] = [...(form[field] as string[])];
      updatedArray[index] = value;
      setForm({ ...form, [field]: updatedArray });
    } else {
      setForm({ ...form, [field]: value });
    }
  };

  // Adiciona novo campo em arrays
  const addField = (
    field: "projetos" | "habilidades" | "softskills" | "formacoes"
  ): void => {
    const updatedArray: string[] = [...(form[field] || []), ""];
    setForm({ ...form, [field]: updatedArray });
  };

  // Validação do formulário
  const isFormValid = (): boolean => {
    return (
      form.nome.trim() !== "" &&
      form.email.trim() !== "" &&
      form.telefone.trim() !== "" &&
      form.cidade.trim() !== "" &&
      form.objetivos.trim() !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!isFormValid()) {
      alert(
        "Por favor, preencha todos os campos obrigatórios antes de gerar o currículo."
      );
      return;
    }
    onSubmit(form);
  };

  // Renderiza campos de array
  const renderArrayField = (
    field: "formacoes" | "habilidades" | "projetos" | "softskills",
    placeholderPrefix: string,
    example: string
  ): JSX.Element => (
    <div className="mt-5">
      <h3 className="font-semibold mb-2">{placeholderPrefix}:</h3>
      {form[field].map((item: string, i: number) => (
        <Input
          key={i}
          value={item}
          className="mb-3"
          placeholder={`${placeholderPrefix}: ${i + 1}`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(field, e.target.value, i)
          }
        />
      ))}
      <p className="relative bottom-2 left-2 text-gray-500 text-[11px] font-semibold">
        {example}
      </p>
      <Button
        className="w-[180px]"
        type="button"
        variant="secondary"
        onClick={() => addField(field)}
      >
        + Adicionar {placeholderPrefix.toLowerCase()}
      </Button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="font-bold w-full text-[20px]">Informações do Currículo</h1>
      <h3 className="font-semibold text-gray-700 mt-5">Dados pessoais</h3>

      <div className="flex gap-3 mt-5">
        <Input
          placeholder="Nome Completo"
          value={form.nome}
          onChange={(e) => handleChange("nome", e.target.value)}
        />
        <Input
          placeholder="Email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>

      <div className="flex gap-3 mt-5">
        <Input
          placeholder="Telefone"
          value={form.telefone}
          onChange={(e) => handleChange("telefone", e.target.value)}
        />
        <Input
          placeholder="Cidade"
          value={form.cidade}
          onChange={(e) => handleChange("cidade", e.target.value)}
        />
      </div>

      <div className="flex gap-3 mt-5">
        <Input
          placeholder="Linkedin (opcional)"
          value={form.linkedin}
          onChange={(e) => handleChange("linkedin", e.target.value)}
        />
        <Input
          placeholder="GitHub (opcional)"
          value={form.github}
          onChange={(e) => handleChange("github", e.target.value)}
        />
      </div>

      <div className="mt-5">
        <Textarea
          className="border p-2 w-full max-w-full rounded box-border max-h-[250px]"
          placeholder="Objetivos Profissional..."
          value={form.objetivos}
          maxLength={450}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleChange("objetivos", e.target.value)
          }
        />
      </div>

      {renderArrayField(
        "formacoes",
        "Formações",
        "Exemplo: Graduação/Técnico, Curso de Desenvolvimento"
      )}
      {renderArrayField(
        "habilidades",
        "Habilidades",
        "Exemplo: JavaScript, React, Node.js, Python, SQL"
      )}
      {renderArrayField(
        "projetos",
        "Projetos",
        "Exemplo: Portfolio Pessoal, Gerador de QR Code"
      )}
      {renderArrayField(
        "softskills",
        "Soft Skills",
        "Exemplo: Comunicação, Trabalho em equipe"
      )}

      <div className="flex justify-center mt-5">
        <Button type="submit" className="w-[250px]" disabled={!isFormValid()}>
          Gerar Currículo
        </Button>
      </div>
    </form>
  );
};

export default Formcv;
