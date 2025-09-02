// gerarWordCv.ts
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";
import type { CurriculoData } from "../components/common/FormCv"; // ajuste o caminho

export async function gerarWordCv(data: CurriculoData) {
  const children: Paragraph[] = [];

  // Nome
  if (data.nome) {
    children.push(
      new Paragraph({
        text: data.nome,
        heading: HeadingLevel.TITLE,
        alignment: "center",
      })
    );
  }

  // Contatos (só adiciona se tiver ao menos um dos campos)
  if (data.cidade || data.email || data.telefone || data.github || data.linkedin) {
    const contatoRuns: TextRun[] = [];

    if (data.cidade) contatoRuns.push(new TextRun(`📍 ${data.cidade} `));
    if (data.email) contatoRuns.push(new TextRun(`| 📧 ${data.email} `));
    if (data.telefone) contatoRuns.push(new TextRun(`| 📱 ${data.telefone}`));
    contatoRuns.push(new TextRun("\n")); // quebra de linha
    if (data.github) contatoRuns.push(new TextRun(`💻 ${data.github} `));
    if (data.linkedin) contatoRuns.push(new TextRun(`| 🔗 ${data.linkedin}`));

    children.push(new Paragraph({ children: contatoRuns, alignment: "center" }));
    children.push(new Paragraph("")); // espaçamento
  }

  // Objetivo
  if (data.objetivos) {
    children.push(
      new Paragraph({ text: "🎯 Objetivo", heading: HeadingLevel.HEADING_2 })
    );
    children.push(new Paragraph(data.objetivos));
  }

  // Formação
  if (data.formacoes && data.formacoes.length > 0) {
    children.push(new Paragraph({ text: "🎓 Formação", heading: HeadingLevel.HEADING_2 }));
    data.formacoes.forEach((f) => children.push(new Paragraph("• " + f)));
  }

  // Habilidades
  if (data.habilidades && data.habilidades.length > 0) {
    children.push(new Paragraph({ text: "🛠️ Habilidades Técnicas", heading: HeadingLevel.HEADING_2 }));
    data.habilidades.forEach((h) => children.push(new Paragraph("• " + h)));
  }

  // Projetos
  if (data.projetos && data.projetos.length > 0) {
    children.push(new Paragraph({ text: "📂 Projetos", heading: HeadingLevel.HEADING_2 }));
    data.projetos.forEach((p) => children.push(new Paragraph("• " + p)));
  }

  // Soft Skills
  if (data.softskills && data.softskills.length > 0) {
    children.push(new Paragraph({ text: "🌟 Soft Skills", heading: HeadingLevel.HEADING_2 }));
    data.softskills.forEach((s) => children.push(new Paragraph("• " + s)));
  }

  // Criar doc
  const doc = new Document({ sections: [{ children }] });

  const buffer = await Packer.toBlob(doc);
  saveAs(buffer, `Curriculo-${data.nome || "sem-nome"}.docx`);
}
