// app/api/seed-novos/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Invitation } from "@/models/Invitation";

export async function GET() {
  try {
    await connectToDatabase();

    // 1. APENAS OS NOVOS CONVITES
    const novosConvites = [
      {
        slug: "pr-carlos-e-familia",
        saudacao: "Pr. Carlos e Família",
        convidados: [
          { _id: "guest-79", name: "Pr. Carlos", status: "pending" },
          { _id: "guest-80", name: "Cicera", status: "pending" },
          { _id: "guest-81", name: "Aninha", status: "pending" },
          { _id: "guest-82", name: "Elias", status: "pending" },
        ],
      },
      {
        slug: "pr-rogerio-e-paula",
        saudacao: "Pr. Rogério e Paula",
        convidados: [
          { _id: "guest-83", name: "Pr. Rogério", status: "pending" },
          { _id: "guest-84", name: "Paula", status: "pending" },
        ],
      },
      {
        slug: "reginaldo-e-mariah",
        saudacao: "Presbítero Reginaldo e Mariah",
        convidados: [
          { _id: "guest-85", name: "Reginaldo", status: "pending" },
          { _id: "guest-86", name: "Mariah", status: "pending" },
        ],
      },
      {
        slug: "toinho-e-maria-rosa",
        saudacao: "Presbítero Toinho e Maria Rosa",
        convidados: [
          { _id: "guest-87", name: "Toinho", status: "pending" },
          { _id: "guest-88", name: "Maria Rosa", status: "pending" },
        ],
      },
      {
        slug: "pedro-e-jessica",
        saudacao: "Presbítero Pedro e Jéssica",
        convidados: [
          { _id: "guest-89", name: "Pedro", status: "pending" },
          { _id: "guest-90", name: "Jéssica", status: "pending" },
        ],
      },
      {
        slug: "pr-irineu-e-esposa",
        saudacao: "Pr. Irineu e Esposa",
        convidados: [
          { _id: "guest-91", name: "Pr. Irineu", status: "pending" },
          { _id: "guest-92", name: "Esposa", status: "pending" },
        ],
      },
    ];

    let adicionados = 0;
    let jaExistentes = 0;

    // 2. LÓGICA DE INSERÇÃO SEGURA (Não apaga nada e evita duplicatas)
    for (const convite of novosConvites) {
      // Verifica se o convite já existe no banco através do slug
      const existe = await Invitation.findOne({ slug: convite.slug });

      if (!existe) {
        await Invitation.create(convite);
        adicionados++;
      } else {
        jaExistentes++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Seed parcial finalizado com sucesso! ${adicionados} novos convites inseridos. ${jaExistentes} já existiam e foram ignorados para evitar duplicatas.`,
    });
  } catch (error) {
    console.error("Erro ao rodar o seed parcial:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao injetar os novos dados." },
      { status: 500 },
    );
  }
}
