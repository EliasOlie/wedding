// app/actions/gift.actions.ts
"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { GiftReservation } from "@/models/GiftReservation";

// 1. Pega a lista de IDs de presentes já reservados
export async function getReservedGiftIds(): Promise<number[]> {
  try {
    await connectToDatabase();
    const reservations = await GiftReservation.find({}).select("giftId").lean();
    return reservations.map((r) => r.giftId);
  } catch (error) {
    console.error("Erro ao buscar reservas:", error);
    return [];
  }
}

// 2. Salva uma nova reserva
// Na função reserveGift em app/actions/gift.actions.ts:

export async function reserveGift(
  giftId: number,
  guestName: string,
  message: string = "",
) {
  try {
    await connectToDatabase();

    // Agora salvamos a mensagem junto
    await GiftReservation.create({ giftId, guestName, message });

    return { success: true };
  } catch (error) {
    console.error("Erro ao reservar presente:", error);
    return {
      success: false,
      error: "Este presente acabou de ser reservado por outra pessoa!",
    };
  }
}
