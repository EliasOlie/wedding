/* eslint-disable @typescript-eslint/no-explicit-any */
// app/actions/admin.actions.ts
"use server";

import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import { Invitation } from "@/models/Invitation";
import { GiftReservation } from "@/models/GiftReservation";
import { gifts } from "@/lib/gifts";

// A SENHA FICA AQUI (Invisível para o frontend)
const ADMIN_PASSWORD = "elias-e-janine";

export async function loginAdmin(password: string) {
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    // Cria um cookie que o JavaScript do navegador não consegue ler (httpOnly)
    cookieStore.set("admin_session", "autorizado", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // Dura 7 dias
    });
    return { success: true };
  }
  return { success: false, error: "Senha incorreta." };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}

export async function getAdminData() {
  await connectToDatabase();

  // 1. Busca todos os convites (com as famílias e status)
  const invitations = await Invitation.find({}).sort({ updatedAt: -1 }).lean();

  // 2. Busca todas as reservas e "cruza" com a nossa lib estática de presentes
  const reservations = await GiftReservation.find({})
    .sort({ createdAt: -1 })
    .lean();

  const enrichedReservations = reservations.map((res: any) => {
    // Tenta ver se é um presente manual disfarçado na message
    let isManual = false;
    let manualTitle = "";
    let manualAmount = 0;
    let cleanMessage = res.message || "";

    try {
      if (cleanMessage.includes('"isManual":true')) {
        const payload = JSON.parse(cleanMessage);
        isManual = true;
        manualTitle = payload.title;
        manualAmount = payload.amount;
        cleanMessage = ""; // Apaga a mensagem pro dashboard não tentar exibir o JSON
      }
    } catch (e) {}

    const giftDetails = gifts.find((g) => g.id === res.giftId);

    return {
      _id: res._id.toString(),
      giftId: res.giftId,
      guestName: res.guestName,
      message: cleanMessage,
      createdAt: res.createdAt,
      giftName: isManual
        ? manualTitle
        : giftDetails?.name || "Presente Excluído do Catálogo",
      giftPrice: isManual ? manualAmount : giftDetails?.price || 0,
      isManual: isManual,
    };
  });

  return {
    invitations: JSON.parse(JSON.stringify(invitations)),
    reservations: JSON.parse(JSON.stringify(enrichedReservations)),
  };
}
