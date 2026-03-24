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
        slug: "nivaldo-e-lena",
        saudacao: "Presb. Nivaldo",
        convidados: [
          { _id: "guest-91", name: "Presb. Nivaldo", status: "pending" },
          { _id: "guest-92", name: "Lena", status: "pending" },
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
