// app/api/seed/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Invitation } from "@/models/Invitation";

export async function GET() {
  try {
    await connectToDatabase();

    // 1. Defina seus convites aqui.
    // Pode colocar as 70 pessoas (agrupadas por família) seguindo este padrão.
    const convitesIniciais = [
      {
        slug: "jacio-e-vitoria",
        saudacao: "Senhor Jácio e Senhora Vitória",
        convidados: [
          { _id: "guest-1", name: "Jácio", status: "pending" },
          { _id: "guest-2", name: "Vitória", status: "pending" },
        ],
      },
      {
        slug: "jotacia",
        saudacao: "Senhorita Jotácia",
        convidados: [{ _id: "guest-3", name: "Jotácia", status: "pending" }],
      },
      {
        slug: "maicon-e-virginia",
        saudacao: "Senhor Maicon e Virgínia",
        convidados: [
          { _id: "guest-4", name: "Maicon", status: "pending" },
          { _id: "guest-5", name: "Virgínia", status: "pending" },
        ],
      },
      {
        slug: "tia-jocelma-e-familia",
        saudacao: "Tia Jocelma e Família",
        convidados: [
          { _id: "guest-6", name: "Tia Jocelma", status: "pending" },
          { _id: "guest-7", name: "Maria Eloisa", status: "pending" },
          { _id: "guest-8", name: "Erika", status: "pending" },
          { _id: "guest-9", name: "Matheus", status: "pending" },
        ],
      },
      {
        slug: "derci-e-jessica",
        saudacao: "Senhora Derci e Jéssica",
        convidados: [
          { _id: "guest-10", name: "Derci", status: "pending" },
          { _id: "guest-11", name: "Jéssica", status: "pending" },
        ],
      },
      {
        slug: "vo-creuza-e-familia",
        saudacao: "Vó Creuza, Dedeu e Raquel",
        convidados: [
          { _id: "guest-12", name: "Vó Creuza", status: "pending" },
          { _id: "guest-13", name: "Dedeu", status: "pending" },
          { _id: "guest-14", name: "Raquel", status: "pending" },
        ],
      },
      {
        slug: "mateus-e-familia",
        saudacao: "Senhor Marcos e Família",
        convidados: [
          { _id: "guest-15", name: "Mateus", status: "pending" },
          { _id: "guest-16", name: "Claudinele", status: "pending" },
          { _id: "guest-17", name: "Marcos", status: "pending" },
          { _id: "guest-18", name: "Lucas", status: "pending" },
        ],
      },
      {
        slug: "ana-livia",
        saudacao: "Senhorita Ana Livia",
        convidados: [{ _id: "guest-19", name: "Ana Livia", status: "pending" }],
      },
      {
        slug: "bianca",
        saudacao: "Senhorita Bianca",
        convidados: [{ _id: "guest-20", name: "Bianca", status: "pending" }],
      },
      {
        slug: "leilane-e-adson",
        saudacao: "Adson e Família",
        convidados: [
          { _id: "guest-21", name: "Leilane", status: "pending" },
          { _id: "guest-22", name: "Adson", status: "pending" },
        ],
      },
      {
        slug: "lailson-e-paloma",
        saudacao: "Lailson e Família",
        convidados: [
          { _id: "guest-23", name: "Lailson", status: "pending" },
          { _id: "guest-24", name: "Paloma", status: "pending" },
        ],
      },
      {
        slug: "isabel-e-arthur",
        saudacao: "Arthur e Família",
        convidados: [
          { _id: "guest-25", name: "Isabel", status: "pending" },
          { _id: "guest-26", name: "Arthur", status: "pending" },
        ],
      },
      {
        slug: "viviane-e-delci",
        saudacao: "Viviane e Delci",
        convidados: [
          { _id: "guest-27", name: "Viviane", status: "pending" },
          { _id: "guest-28", name: "Delci", status: "pending" },
        ],
      },
      {
        slug: "vanessa-e-railan",
        saudacao: "Railan e Família",
        convidados: [
          { _id: "guest-29", name: "Vanessa", status: "pending" },
          { _id: "guest-30", name: "Railan", status: "pending" },
        ],
      },
      {
        slug: "pastor-julimar-e-familia",
        saudacao: "Pastor Julimar e Família",
        convidados: [
          { _id: "guest-31", name: "Pastor Julimar", status: "pending" },
          { _id: "guest-32", name: "Andréa", status: "pending" },
          { _id: "guest-33", name: "Karen", status: "pending" },
        ],
      },
      {
        slug: "percia-e-democles",
        saudacao: "Democles e Percia",
        convidados: [
          { _id: "guest-34", name: "Percia", status: "pending" },
          { _id: "guest-35", name: "Democles", status: "pending" },
        ],
      },
      {
        slug: "vo-maria-e-esposo",
        saudacao: "Vó Maria e Esposo",
        convidados: [
          { _id: "guest-36", name: "Vó Maria", status: "pending" },
          { _id: "guest-37", name: "Marido", status: "pending" },
        ],
      },
      {
        slug: "dayanne-e-arthur",
        saudacao: "Senhor Arthur e Família",
        convidados: [
          { _id: "guest-38", name: "Dayanne", status: "pending" },
          { _id: "guest-39", name: "Arthur", status: "pending" },
        ],
      },
      {
        slug: "dzerry",
        saudacao: "Senhorita Dzerry",
        convidados: [{ _id: "guest-40", name: "Dzerry", status: "pending" }],
      },
      {
        slug: "janyelli-e-matteus",
        saudacao: "Matteus e Família",
        convidados: [
          { _id: "guest-41", name: "Janyelli", status: "pending" },
          { _id: "guest-42", name: "Matteus", status: "pending" },
        ],
      },
      {
        slug: "janycelli",
        saudacao: "Senhorita Janycelli",
        convidados: [{ _id: "guest-43", name: "Janycelli", status: "pending" }],
      },
      {
        slug: "alana",
        saudacao: "Senhorita Alana",
        convidados: [{ _id: "guest-44", name: "Alana", status: "pending" }],
      },
      {
        slug: "maykon-e-angela",
        saudacao: "Maykon e Angela",
        convidados: [
          { _id: "guest-45", name: "Maykon", status: "pending" },
          { _id: "guest-46", name: "Angela", status: "pending" },
        ],
      },
      {
        slug: "bida-e-ronice",
        saudacao: "Bida e Ronice",
        convidados: [
          { _id: "guest-47", name: "Bida", status: "pending" },
          { _id: "guest-48", name: "Ronice", status: "pending" },
        ],
      },
      {
        slug: "moab-e-dayane",
        saudacao: "Moab e Dayane",
        convidados: [
          { _id: "guest-49", name: "Moab", status: "pending" },
          { _id: "guest-50", name: "Dayane", status: "pending" },
        ],
      },
      {
        slug: "gilson-e-familia",
        saudacao: "Senhor Gilson e Família",
        convidados: [
          { _id: "guest-51", name: "Gilson", status: "pending" },
          { _id: "guest-52", name: "Nadja", status: "pending" },
          { _id: "guest-53", name: "Emily", status: "pending" },
        ],
      },
      {
        slug: "gilda-e-familia",
        saudacao: "Senhora Gilda e Família",
        convidados: [
          { _id: "guest-54", name: "Gilda", status: "pending" },
          { _id: "guest-55", name: "Vinícios", status: "pending" },
          { _id: "guest-56", name: "Ivana", status: "pending" },
        ],
      },
      {
        slug: "gisele",
        saudacao: "Senhorita Gisele",
        convidados: [{ _id: "guest-57", name: "Gisele", status: "pending" }],
      },
      {
        slug: "makson-e-hildete",
        saudacao: "Makson e Hildete",
        convidados: [
          { _id: "guest-58", name: "Makson", status: "pending" },
          { _id: "guest-59", name: "Hildete", status: "pending" },
        ],
      },
      {
        slug: "jose-roberto-e-familia",
        saudacao: "Senhor José Roberto e Família",
        convidados: [
          { _id: "guest-60", name: "José Roberto", status: "pending" },
          { _id: "guest-61", name: "Maria Aparecida", status: "pending" },
          { _id: "guest-62", name: "Arthur", status: "pending" },
          { _id: "guest-63", name: "Gabriela", status: "pending" },
        ],
      },
      {
        slug: "julia",
        saudacao: "Senhora Julia",
        convidados: [{ _id: "guest-64", name: "Julia", status: "pending" }],
      },
      {
        slug: "manasses-e-nalva",
        saudacao: "Manassés e Nalva",
        convidados: [
          { _id: "guest-65", name: "Manassés", status: "pending" },
          { _id: "guest-66", name: "Nalva", status: "pending" },
        ],
      },
      {
        slug: "nandinho",
        saudacao: "Senhor Nandinho",
        convidados: [{ _id: "guest-67", name: "Nandinho", status: "pending" }],
      },
      {
        slug: "rodrigo",
        saudacao: "Senhor Rodrigo",
        convidados: [{ _id: "guest-68", name: "Rodrigo", status: "pending" }],
      },
      {
        slug: "ewerton",
        saudacao: "Senhor Ewerton",
        convidados: [{ _id: "guest-69", name: "Ewerton", status: "pending" }],
      },
      {
        slug: "barbara",
        saudacao: "Senhorita Bárbara",
        convidados: [{ _id: "guest-70", name: "Bárbara", status: "pending" }],
      },
      {
        slug: "juliane",
        saudacao: "Senhorita Juliane",
        convidados: [{ _id: "guest-71", name: "Juliane", status: "pending" }],
      },
      {
        slug: "junior-e-camila",
        saudacao: "Júnior e Camila",
        convidados: [
          { _id: "guest-72", name: "Júnior", status: "pending" },
          { _id: "guest-73", name: "Camila", status: "pending" },
        ],
      },
      {
        slug: "ana-lavinia",
        saudacao: "Senhorita Ana Lavínia",
        convidados: [
          { _id: "guest-74", name: "Ana Lavínia", status: "pending" },
        ],
      },
      {
        slug: "luana-dantas",
        saudacao: "Senhorita Luana Dantas",
        convidados: [
          { _id: "guest-75", name: "Luana Dantas", status: "pending" },
        ],
      },
      {
        slug: "elias-e-familia",
        saudacao: "Senhor Elias e Família",
        convidados: [
          { _id: "guest-76", name: "Elias Oliveira", status: "confirmed" },
          { _id: "guest-77", name: "Janine Oliveira", status: "confirmed" },
        ],
      },
      {
        slug: "convidado-mais-importante",
        saudacao: "Ao SENHOR Deus de Toda Glória",
        convidados: [
          {
            _id: "guest-alpha-omega",
            name: "Deus Pai, Filho e Espírito Santo",
            status: "confirmed",
          },
        ],
      },
    ];

    // 2. CUIDADO: Isso apaga todos os convites anteriores do banco para evitar duplicatas nos testes.
    await Invitation.deleteMany({});

    // 3. Injeta todos os dados de uma vez só no MongoDB
    await Invitation.insertMany(convitesIniciais);

    return NextResponse.json({
      success: true,
      message:
        "Banco de dados populado com sucesso com os convidados iniciais!",
    });
  } catch (error) {
    console.error("Erro ao rodar o seed:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao injetar os dados." },
      { status: 500 },
    );
  }
}
