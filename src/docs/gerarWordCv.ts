// gerarWordCv.ts
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";
import type { CurriculoData } from "../components/common/FormCv"; // ajuste o caminho

export async function gerarWordCv(data: CurriculoData) {
  const children: Paragraph[] = [];

  // Nome
  children.push(
    new Paragraph({
      text: data.nome,
      heading: HeadingLevel.TITLE,
      alignment: "center",
    })
  );

  // Contatos
  children.push(
    new Paragraph({
      children: [
        new TextRun(`📍 ${data.cidade} | 📧 ${data.email} | 📱 ${data.telefone}`),
        new TextRun("\n"),
        new TextRun(`💻 ${data.github ?? ""} | 🔗 ${data.linkedin ?? ""}`),
      ],
      alignment: "center",
    })
  );

  children.push(new Paragraph("")); // espaçamento

  // Objetivo
  children.push(
    new Paragraph({ text: "🎯 Objetivo", heading: HeadingLevel.HEADING_2 })
  );
  children.push(new Paragraph(data.objetivos));

  // Formação
  children.push(new Paragraph({ text: "🎓 Formação", heading: HeadingLevel.HEADING_2 }));
  data.formacoes?.forEach((f) => children.push(new Paragraph("• " + f)));

  // Habilidades
  children.push(new Paragraph({ text: "🛠️ Habilidades Técnicas", heading: HeadingLevel.HEADING_2 }));
  data.habilidades?.forEach((h) => children.push(new Paragraph("• " + h)));

  // Projetos
  children.push(new Paragraph({ text: "📂 Projetos", heading: HeadingLevel.HEADING_2 }));
  data.projetos?.forEach((p) => children.push(new Paragraph("• " + p)));

  // Soft Skills
  children.push(new Paragraph({ text: "🌟 Soft Skills", heading: HeadingLevel.HEADING_2 }));
  data.softskills?.forEach((s) => children.push(new Paragraph("• " + s)));

  // Criar doc
  const doc = new Document({ sections: [{ children }] });

  const buffer = await Packer.toBlob(doc);
  saveAs(buffer, `Curriculo-${data.nome}.docx`);
}
