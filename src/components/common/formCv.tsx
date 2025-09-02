import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

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

interface Props {
  onSubmit: (data: CurriculoData) => void;
}

const FormCv: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<CurriculoData>({
    nome: "",
    cidade: "",
    email: "",
    telefone: "",
    github: "",
    objetivos: "",
    habilidades: [""],
    projetos: [""],
    softskills: [""],
    formacoes: [""],
  });

  const handleChange = (field: string, value: string, index?: number) => {
    if (field === "projetos" && index !== undefined) {
      const exp = [...form.projetos];
      exp[index] = value;
      setForm({ ...form, projetos: exp });
    } else if (field === "habilidades" && index !== undefined) {
      const hab = [...form.habilidades];
      hab[index] = value;
      setForm({ ...form, habilidades: hab });
    } else if (field === "softskills" && index !== undefined) {
      const hab = [...form.softskills];
      hab[index] = value;
      setForm({ ...form, softskills: hab });
    } else if (field === "formacoes" && index !== undefined) {
      const hab = [...form.formacoes];
      hab[index] = value;
      setForm({ ...form, formacoes: hab });
    } else {
      setForm({ ...form, [field]: value });
    }
  };

  const addField = (
    field: "projetos" | "habilidades" | "softskills" | "formacoes"
  ) => {
    setForm({
      ...form,
      [field]: [...form[field], ""],
    });
  };

  const isFormValid = () => {
  // Verifica campos obrigatórios de texto
  if (!form.nome.trim() || !form.email.trim() || !form.telefone.trim() || !form.cidade.trim() || !form.objetivos.trim()) {
    return false;
  }

  // Verifica arrays obrigatórios
  const checkArray = (arr: string[]) => arr.every(item => item.trim() !== "");
  if (!checkArray(form.formacoes) || !checkArray(form.habilidades) || !checkArray(form.projetos) || !checkArray(form.softskills)) {
    return false;
  }

  return true;
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert(
        "Por favor, preencha todos os campos obrigatórios antes de gerar o currículo."
      );
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="font-bold w-full text-[20px]">Informações do Currículo</h1>
      <h3 className="font-semibold text-gray-700 mt-5">Dados pessoais</h3>
      {/* Primeira camada */}
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
      {/* Segunda camada */}
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
      {/* Terceira camada */}
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

      {/* Quarta camada */}
      <div className="mt-5">
        <Textarea
          className="border p-2 w-full max-w-full rounded box-border max-h-[250px]"
          placeholder="Objetivos Profissional..."
          value={form.objetivos}
          maxLength={450}
          onChange={(e) => handleChange("objetivos", e.target.value)}
        />
      </div>

      {/* Quinta camada */}
      <div className="mt-5">
        <h3 className="font-semibold mb-2">Formações:</h3>
        {form.formacoes.map((hab, i) => (
          <Input
            value={hab}
            key={i}
            className="mb-3"
            placeholder={`Formações: ${i + 1}`}
            onChange={(e) => handleChange("formacoes", e.target.value, i)}
          />
        ))}
        <p className="relative bottom-2 left-2 text-gray-500 text-[11px] font-semibold">
          Exemplo: Graduação/Técnico (se tiver), Curso de Desenvolvimento
        </p>
        <Button
          className="w-[180px]"
          type="button"
          variant="secondary"
          onClick={() => addField("formacoes")}
        >
          + Adicionar objetivos
        </Button>
      </div>

      {/* sexta camada */}
      <div className="mt-5">
        <h3 className="font-semibold mb-2">Habilidades:</h3>
        {form.habilidades.map((hab, i) => (
          <Input
            value={hab}
            key={i}
            className="mb-3"
            placeholder={`Habilidade: ${i + 1}`}
            onChange={(e) => handleChange("habilidades", e.target.value, i)}
          />
        ))}
        <p className="relative bottom-2 left-2 text-gray-500 text-[11px] font-semibold">
          Exemplo: JavaScript, React, Node.js, Python, SQL
        </p>
        <Button
          className="w-[180px]"
          type="button"
          variant="secondary"
          onClick={() => addField("habilidades")}
        >
          + Adicionar objetivos
        </Button>
      </div>

      {/* decima camada */}
      <div className="mt-5">
        <h3 className="font-semibold mb-2">Projetos:</h3>
        {form.projetos.map((pro, i) => (
          <Input
            value={pro}
            key={i}
            className="mb-3"
            placeholder={`Projeto: ${i + 1}`}
            onChange={(e) => handleChange("projetos", e.target.value, i)}
          />
        ))}
        <p className="relative bottom-2 left-2 text-gray-500 text-[11px] font-semibold">
          Exemplo: Portfolio Pessoal, Gerador de QR Code, Clone do Spotify
          (Frontend)
        </p>
        <Button
          className="w-[180px]"
          type="button"
          variant="secondary"
          onClick={() => addField("projetos")}
        >
          + Adicionar objetivos
        </Button>
      </div>

      {/* decima primeira camada */}
      <div className="mt-5">
        <h3 className="font-semibold mb-2">Soft Skills:</h3>
        {form.softskills.map((hab, i) => (
          <Input
            value={hab}
            key={i}
            className="mb-3"
            placeholder={`Softskilss: ${i + 1}`}
            onChange={(e) => handleChange("softskills", e.target.value, i)}
          />
        ))}
        <p className="relative bottom-2 left-2 text-gray-500 text-[11px] font-semibold">
          Exemplo: JavaScript, React, Node.js, Python, SQL
        </p>
        <Button
          className="w-[180px] mb-5"
          type="button"
          variant="secondary"
          onClick={() => addField("softskills")}
        >
          + Adicionar objetivos
        </Button>
      </div>

      <div className="flex justify-center mt-5">
        <Button type="submit" className="w-[250px]" disabled={!isFormValid()}>
          Gerar Currículo
        </Button>
      </div>
    </form>
  );
};

export default FormCv;
