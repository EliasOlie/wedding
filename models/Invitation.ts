// models/Invitation.ts
import mongoose, { Schema, Document } from "mongoose";

// O Contrato TypeScript
export type AttendanceStatus = "pending" | "confirmed" | "declined";

export interface IGuest {
  _id: string; // Usaremos uma string simples (ex: "1", "2") para facilitar no front
  name: string;
  status: AttendanceStatus;
}

export interface IInvitation extends Document {
  slug: string; // A URL, ex: "familia-almeida"
  saudacao: string; // Ex: "Senhor Roberto Almeida e Família"
  convidados: IGuest[];
  openedAt: Date;
}

// O Schema Mongoose
const GuestSchema = new Schema<IGuest>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "declined"],
    default: "pending",
  },
});

const InvitationSchema = new Schema<IInvitation>({
  slug: { type: String, required: true, unique: true },
  saudacao: { type: String, required: true },
  convidados: [GuestSchema],
  openedAt: { type: Date, default: null },
});

// Impede que o Next.js recompile e duplique o modelo
export const Invitation =
  mongoose.models.Invitation ||
  mongoose.model<IInvitation>("Invitation", InvitationSchema);
