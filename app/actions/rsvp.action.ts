// actions/rsvp.actions.ts
"use server"; // Esta diretiva é o que transforma o arquivo em Server Actions

import { connectToDatabase } from "@/lib/mongodb";
import { Invitation, IGuest } from "@/models/Invitation";
import { revalidatePath } from "next/cache";

// 1. Ação para buscar os dados do convite pela URL
export async function getInvitationBySlug(slug: string) {
  try {
    await connectToDatabase();

    // Usamos .lean() para retornar um objeto JavaScript puro, sem os métodos pesados do Mongoose.
    // Isso é essencial para passar dados do Servidor para o Cliente (Client Components) no Next.js.
    const invitation = await Invitation.findOne({ slug }).lean();

    if (!invitation) return null;

    // Convertendo o ObjectId do Mongoose para string para evitar erros de serialização no React
    return {
      ...invitation,
      _id: invitation._id.toString(),
    };
  } catch (error) {
    console.error("Erro ao buscar convite:", error);
    throw new Error("Não foi possível carregar o convite.");
  }
}

// 2. Ação para salvar a resposta (RSVP)
export async function submitRSVP(slug: string, updatedGuests: IGuest[]) {
  try {
    await connectToDatabase();

    // Atualiza o array de convidados inteiro para aquele documento
    const result = await Invitation.findOneAndUpdate(
      { slug },
      { $set: { convidados: updatedGuests } },
      { new: true }, // Retorna o documento atualizado
    );

    if (!result) {
      throw new Error("Convite não encontrado ao tentar salvar.");
    }

    // O Pulo do Gato: Limpa o cache dessa página específica.
    // Se o usuário recarregar a página, ele verá a resposta salva imediatamente.
    revalidatePath(`/convite/${slug}`);

    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar RSVP:", error);
    return {
      success: false,
      error: "Falha ao registrar presença. Tente novamente.",
    };
  }
}
