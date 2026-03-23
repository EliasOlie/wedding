// models/GiftReservation.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IGiftReservation extends Document {
  giftId: number;
  guestName: string;
  message?: string; // <--- NOVA PROPRIEDADE
  createdAt: Date;
}

const GiftReservationSchema = new Schema<IGiftReservation>(
  {
    giftId: { type: Number, required: true, unique: true }, // unique impede que duas pessoas comprem o mesmo presente
    guestName: { type: String, required: true },
    message: { type: String, required: false }, // <--- NOVA PROPRIEDADE
  },
  { timestamps: true },
);

export const GiftReservation =
  mongoose.models.GiftReservation ||
  mongoose.model<IGiftReservation>("GiftReservation", GiftReservationSchema);
